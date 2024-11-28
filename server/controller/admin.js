
import TryCatch from "../middlewares/TryCatch.js";
import { Courses } from "../models/Courses.js";
import { Lecture } from "../models/Lecture.js";
import { rm } from "fs";
import { promisify } from 'util';
import { User } from "../models/User.js";
import fs from 'fs';
import { unlink } from "fs";
import path from 'path'; 

// Promisify unlink for asynchronous file removal
const unlinkAsync = promisify(fs.unlink);

// 1. Create Course with Image Upload
// 1. Create Course with Image Upload
export const createCourse = TryCatch(async (req, res) => {
    const { title, description, category, createdBy, duration, price } = req.body;

    // Ensure that at least one image file is uploaded
    const images = req.files;
    if (!images || images.length === 0) {
        return res.status(400).json({ message: "At least one image is required" });
    }

    // Extract file paths from uploaded images
    const imagePaths = images.map(image => image.path);  // Collect all image paths

    // Create course with uploaded image paths
    await Courses.create({
        title,
        description,
        category,
        createdBy,
        images: imagePaths,  // Save array of image paths to the database
        duration,
        price,
    });

    res.status(201).json({
        message: "Course Created Successfully",
    });
});


// 2. Add Lectures with Video Upload
// 2. Add Lectures with Video Upload
// 2. Add Lectures with Video Upload
export const addLectures = TryCatch(async (req, res) => {
    const course = await Courses.findById(req.params.id);

    if (!course) {
        return res.status(404).json({
            message: "No Course with this ID",
        });
    }

    const { title, description } = req.body;

    // Ensure that at least one video file is uploaded
    const files = req.files; // Get all uploaded files
    if (!files || files.length === 0) {
        return res.status(400).json({ message: "At least one video is required" });
    }

    // Extract file paths from uploaded videos
    const videoPaths = files.map(file => file.path);  // Collect all video paths

    // Create lecture with uploaded video paths
    const lecture = await Lecture.create({
        title,
        description,
        videos: videoPaths,  // Save array of video paths to the database
        course: course._id,
    });

    res.status(201).json({
        message: "Lectures Added",
        lecture,
    });
});


// 3. Delete Lecture and Remove Video File
export const deleteLecture = async (req, res) => {
    try {
        const lecture = await Lecture.findById(req.params.id);

        if (!lecture) {
            return res.status(404).json({ message: "Lecture not found" });
        }

        // Assuming video paths are stored relative to your `uploads` directory
        const videoFilePath = path.join('C:\\Users\\Renugapalraj\\OneDrive\\Desktop\\Naanmudhalvan\\server\\uploads', lecture.videos[0]);

        // Check if the file exists before attempting to delete it
        if (fs.existsSync(videoFilePath)) {
            await unlinkAsync(videoFilePath);
            console.log("Video Deleted:", videoFilePath);
        } else {
            console.log("Video file not found:", videoFilePath);
        }

        // Delete the lecture from the database
        await lecture.deleteOne();

        return res.status(200).json({ message: "Lecture Deleted" });
    } catch (error) {
        console.error("Error deleting lecture:", error);
        return res.status(500).json({ message: "Error deleting lecture" });
    }
};
// 4. Delete Course and Associated Files
export const deleteCourse = TryCatch(async (req, res) => {
    const course = await Courses.findById(req.params.id);
    
    if (!course) {
        return res.status(404).json({ message: "Course not found" });
    }

    const lectures = await Lecture.find({ course: course._id });

    // Remove all associated lecture videos
    await Promise.all(
        lectures.map(async (lecture) => {
            // Ensure the `videos` field is handled as an array
            await Promise.all(
                lecture.videos.map(async (video) => {
                    await unlinkAsync(video);  // Asynchronously remove each video file
                    console.log("Video Deleted:", video);
                })
            );
        })
    );
    await Lecture.deleteMany({ course: course._id });

    // After removing all lectures and their videos, delete the course
    await Courses.findByIdAndDelete(req.params.id);
    // Remove the course from all users' subscriptions
    await User.updateMany({}, { $pull: { subscription: req.params.id } });


    res.status(200).json({ message: "Course and associated files deleted successfully" });
});


// 5. Get Statistics for Admin
export const getAllStats = TryCatch(async (req, res) => {
    const totalCourses = (await Courses.find()).length;
    const totalLectures = (await Lecture.find()).length;
    const totalUsers = (await User.find()).length;

    const stats = {
        totalCourses,
        totalLectures,
        totalUsers,
    };

    res.json({
        stats,
    });
});
export const getAllUser =TryCatch (async (req, res) => {

    const users =await User.find({_id: {$ne: req.user._id} }).select(
    
    "-password"
    
    );
    
    res.json({ users }); 
});
export const updateRole = TryCatch (async (req, res) => { const user = await User.findById(req.params.id);

    if (user.role === "user") {
    
    user.role= "admin";
    
    await user.save();
    
    return res.status(200).json({
    
    message: "Role updated to admin", });
}
if (user.role === "admin") {
    
    user.role= "user";
    
    await user.save();
    
    return res.status(200).json({
    
    message: "Role updated", });
}
    
    });