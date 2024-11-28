/*import React from 'react';
import "./CourseCard.css";
import {server} from "../../main";
const CourseCard = (course) => {
  return (
    <div className="Course-Card">
<img src={`${server}/${course.image}`}  alt="" className="course=image" />
    <h3>{course.title}</h3>
    <p>Instructor-{course.creation}</p>
    <p>Duration-{course.duration}</p>
    <p>Price-{course.price}</p>
    <h3>{course.title}</h3>
<button className='common-btn'>Get started</button>
    </div>
  );
};

export default CourseCard;*/
/*import React from 'react';
import "./CourseCard.css";
import { server } from "../../main";

const CourseCard = ({ course }) => {
  return (
    <div className="Course-Card">
      <img src={`${server}/${course.image}`} alt="" className="course-image" />
      <h3>{course.title}</h3>
      <p>Instructor: {course.createdBy}</p>
      <p>Duration: {course.duration} hours</p>
      <p>Price: ${course.price}</p>
      <button className='common-btn'>Get started</button>
    </div>
  );
};

export default CourseCard;
*/
/*
import React from 'react';
import "./CourseCard.css";
import { server } from "../../main";

const CourseCard = ({ course }) => {
  // Replace any backslashes with forward slashes to ensure proper URL formatting
  const imageUrl = `${server}/${course.images[0]}`.replace(/\\/g, '/');


  return (
    <div className="Course-Card">
      <img src={imageUrl} alt={course.title} className="course-image" />
      <h3>{course.title}</h3>
      <p>Instructor: {course.createdBy}</p>
      <p>Duration: {course.duration} hours</p>
      <p>Price: ${course.price}</p>
      <button className='common-btn'>Get started</button>
    </div>
  );
};
*/
import React from 'react';
import "./courseCard.css";
import { server } from "../../main";
import { UserData } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { CourseData } from '../../context/CourseContext';
import axios from 'axios';
const CourseCard = ({ course }) => {
  const navigate=useNavigate();
  const {user,isAuth}=UserData();
  const {fetchCourses}=CourseData();
  const deleteHandler=async(id)=>{
    if(confirm("Are you sure you want to delete this course")){
      try {
        const { data } = await axios.delete(`${server}/api/course/${id}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });
        toast.success(data.message);
        fetchCourses();
      } catch (error) {
        // Ensure the error response exists before accessing its properties
        const errorMessage = error.response?.data?.message || "Something went wrong!";
        toast.error(errorMessage);
      }
    }
    
  };
  // Generate URLs for each image in the course
  const imageUrls = course.images.map(image => `${server}/${image}`).map(url => url.replace(/\\/g, '/'));

  return (
   
    <div className="course-card-container">
     
     <div className='card'>
     <div className="img-container"> 
        {imageUrls.map((imageUrl, index) => (
          <img key={index} src={imageUrl} alt={course.title} />
        ))}
        </div>
    <div className='card-content'>
      <h3>{course.title}</h3>
      <p>Instructor: {course.createdBy}</p>
      <p>Duration: {course.duration} hours</p>
      <p>Price: ${course.price}</p>
      {isAuth ? (
<>
{user && user.role !== "admin" ? (
<>
{user.subscription.includes(course._id) ? (
<button
onClick={() => navigate(`/course/study/${course._id}`)}
className="common-btn"
>
Study
</button>
) : (
<button
onClick={() => navigate(`/course/${course._id}`)}
className="common-btn"
>
Get Started
</button>
)}
</>
) : (
<button
onClick={() => navigate(`/course/study/${course._id}`)}
className="common-btn"
>
Study
</button>
)}
</>
) : (
<button onClick={() => navigate("/login")} className="common-btn">
Get Started
</button>
)}
<br />

{user && user.role === "admin" && (

<button  onClick={()=>deleteHandler(course._id)}className="common-btn" style={{ background: "red" }}>

Delete

</button>
)}
     
      </div>
    </div>
    </div>
  );
};

export default CourseCard;

