import cloudinary from "../lib/cloudinary.js";
import Book from "../models/book.model.js";
import { getDataUri } from "../utils/helper.js";

export const createBooks = async (req, res) => {
    try {
        const {title,caption,rating} = req.body;
        const image = req.file
        if(!title || !caption || !image || !rating){
            return res.status(400).json({message:"All fields are required"});
        }
        let FileURI;
        if(image){
            FileURI = getDataUri(image)
        }
        // save image to the cloudinary
        let cloudResponse;
        if(image){
            cloudResponse = await cloudinary.uploader.upload(FileURI.content)
        }
        const imageUrl = cloudResponse?.secure_url || "";

        // Create a new book entry in the database
        const newBook = new Book({
            title,
            caption,
            image: imageUrl,
            rating,
            user: req.user._id
        });
        await newBook.save();
        res.status(201).json({message:"Book created successfully", book:newBook});
        
    } catch (error) {
        console.error("Error creating book:", error);
        res.status(500).json({message:"Server Error"});
    }
}

export const getAllBooks = async (req, res) => {
    try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 5;
        const skip = (page-1) * limit;

        const books = await Book.find().sort({createdAt:-1}).skip(skip).limit(limit).populate('user', 'username profileImage');
        const totalBooks = await Book.countDocuments();

        res.status(200).json({
            books,
            currentPage: page,
            totalBooks,
            totalPages: Math.ceil(totalBooks/limit)
        });
    } catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).json({message:"Server Error"});
    }
}

export const deleteBook = async (req, res) => {
    try {
        const {id} = req.params;
        const book = await Book.findById(id);
        if(!book){
            return res.status(404).json({message:"Book not found"});
        }
        if(book.user.toString() !== req.user._id.toString()){
            return res.status(403).json({message:"You are not authorized to delete this book"});
        }
        // delte the image from cloudinary as well
        if(book.image && book.image.includes('res.cloudinary.com')){
            try {
                const publicId = book.image.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(publicId);
            } catch (error) {
                console.error("Error deleting image from cloudinary:", error);
            }
        }
        
        await Book.findByIdAndDelete(id)
        res.status(200).json({message:"Book deleted successfully"});
    } catch (error) {
        console.error("Error deleting book:", error);
        res.status(500).json({message:"Server Error"});
    }
}