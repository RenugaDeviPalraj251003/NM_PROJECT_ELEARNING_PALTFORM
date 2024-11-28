import React, { useEffect } from 'react';
import "./coursestudy.css";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { server } from "../../main";
import { CourseData } from '../../context/CourseContext';

const CourseStudy = ({ user }) => {
    const params = useParams();
    const { fetchCourse, course } = CourseData();
    const navigate = useNavigate();

    // Check user's role and subscription
    useEffect(() => {
        if (user && user.role !== "admin" && !user.subscription.includes(params.id)) {
            navigate("/");
        }
    }, [user, params.id, navigate]);

    // Fetch course details
    useEffect(() => {
        fetchCourse(params.id);
    }, [fetchCourse, params.id]);

    // Log the course and image URLs for debugging
    useEffect(() => {
        if (course && course.images) {
            course.images.forEach(image => {
                console.log(`${server}/${image.replace(/\\/g, '/')}`); // Log all image URLs
            });
        }
    }, [course]);

    return (
        <>
            {course && course.images ? (
                <div className='course-study-page'>
                    {course.images.map((image, index) => (
                        <img 
                            key={index}
                            src={`${server}/${image.replace(/\\/g, '/')}`} 
                            alt={`${course.title} image ${index + 1}`} // Adding alt for accessibility
                            width={400}  
                            onError={(e) => { e.target.src = '/path/to/placeholder-image.jpg'; }} // Fallback if image is not found
                        />
                       
                    ))}
                    <h2>{course.title}</h2>
                    <h4>{course.description}</h4>
                    <h5>By-{course.createdBy}</h5>
                    <h5>Course Duration-{course.duration}Weeks</h5>
                    <Link to={`/lectures/${course._id}`}><h2>Lectures</h2></Link>
                </div>
            ) : (
                <p>Loading course details...</p> // Display a loading message or spinner
            )}
        </>
    );
};

export default CourseStudy;

