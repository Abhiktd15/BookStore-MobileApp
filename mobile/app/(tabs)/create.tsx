import { View, Text, KeyboardAvoidingView, Platform, ScrollView, TextInput, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import styles from '@/assets/styles/create.styles'
import { Ionicons } from '@expo/vector-icons'
import COLORS from '@/constants/colors'
import * as ImagePicker from 'expo-image-picker'
import { useRouter } from 'expo-router'
import { useAuthStore } from '@/store/authStore'
import { baseUrl } from '@/constants/constants'

const Create = () => {
    const [title, setTitle] = useState("");
    const [caption, setCaption] = useState("");
    const [rating, setRating] = useState(3);
    const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const { token } = useAuthStore();

    const pickImage = async () => {
        try {
        // request permission if needed
        if (Platform.OS !== "web") {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (status !== "granted") {
                Alert.alert("Permission Denied", "We need camera roll permissions to upload an image");
                return;
            }
        }

        // launch image library
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: "images",
            allowsEditing: true,
            quality: 0.7,
            aspect: [4, 3],
        });

        if (!result.canceled) {
            setImage(result.assets[0]);
        }
        } catch (error) {
            console.error("Error picking image:", error);
            Alert.alert("Error", "There was a problem selecting the image.");
        }
    };

    const handleSubmit = async () => {
        if (!title || !caption || !image) {
            Alert.alert("Missing Fields", "Please fill out all fields and select an image.");
            return;
        }

        setLoading(true);

        const formData = new FormData();
        formData.append('title', title);
        formData.append('caption', caption);
        formData.append('rating', rating.toString());

        // The backend expects a field named 'image'
        // We create a blob-like object for FormData
        formData.append('image', {
            uri: image.uri,
            name: image.fileName || `photo_${Date.now()}.jpg`, // a default filename
            type: image.mimeType || 'image/jpeg', // a default mimetype
        } as any);

        try {
            // console.log("Submitting form data:", formData);
            const response = await fetch(`${baseUrl}/books/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Something went wrong");
            }

            Alert.alert("Success", "Book recommendation created successfully!");
            setTitle("");
            setCaption("");
            setRating(3);
            setImage(null);
            router.push("/");
        } catch (error: any) {
            console.error("Error creating book:", error);
            Alert.alert("Error", error.message || "There was a problem creating your post.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <KeyboardAvoidingView  
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{flex: 1}}
        >
            <ScrollView contentContainerStyle={styles.container} style={styles.scrollViewStyle}>
                <View style={styles.card}>
                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.title}>Add Book Recommendation</Text>
                        <Text style={styles.subtitle}>Share your favorite read with the others!</Text>
                    </View>
                </View>

                {/* Form */}
                <View style={styles.form}>
                    {/* Book Title */}
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Book Title</Text>
                        <View style={styles.inputContainer}>
                            <Ionicons name="book-outline" size={20} color={COLORS.textSecondary} style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Enter book title"
                                placeholderTextColor={COLORS.placeholderText}
                                value={title}
                                onChangeText={setTitle}
                            />
                        </View>
                    </View>
                    {/* Rating */}
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Rating</Text>
                        <View style={styles.ratingContainer}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Ionicons
                                    key={star}
                                    name={star <= rating ? "star" : "star-outline"}
                                    size={30}
                                    color={star <= rating ? COLORS.textPrimary : COLORS.textSecondary}
                                    onPress={() => setRating(star)}
                                />
                            ))}
                        </View>
                    </View>
                    {/* Image  */}
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Book Cover Image</Text>
                        <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                            {image ? (
                                <Image source={{ uri: image.uri }} style={styles.previewImage} />
                            ) : (
                                <View style={styles.placeholderContainer}>
                                    <Ionicons name="image-outline" size={50} color={COLORS.textSecondary} />
                                    <Text style={styles.placeholderText}>Tap to select image</Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    </View>
                    {/* CAPTION */}
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Caption</Text>
                        <TextInput
                            style={styles.textArea}
                            placeholder="Write your review or thoughts about this book..."
                            placeholderTextColor={COLORS.placeholderText}
                            value={caption}
                            onChangeText={setCaption}
                            multiline
                        />
                    </View>

                    <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
                        {loading ? (
                            <ActivityIndicator color={COLORS.white} />
                        ) : (
                            <>
                                <Ionicons
                                    name="cloud-upload-outline"
                                    size={20}
                                    color={COLORS.white}
                                    style={styles.buttonIcon}
                                />
                                <Text style={styles.buttonText}>Share</Text>
                            </>
                        )}
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default Create