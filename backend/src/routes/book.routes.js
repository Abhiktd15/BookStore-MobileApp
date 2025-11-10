import express from 'express';
import { createBooks, deleteBook, getAllBooks, getUserBooks } from '../controller/book.controller.js';
import { isAuthenticated } from '../middlewares/auth.middlewar.js';
import { singleUpload } from '../middlewares/multer.middleware.js';


const router = express.Router();
router.use(isAuthenticated);

router.post("/", singleUpload, createBooks);
router.get("/", getAllBooks);
router.delete("/:id", deleteBook);
router.get("/user", getUserBooks);

export default router;
