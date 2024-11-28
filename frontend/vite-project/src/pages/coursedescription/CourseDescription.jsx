import React, { useEffect,useState } from 'react';
import "./coursedescription.css";
import { useNavigate, useParams } from 'react-router-dom';
import { CourseData } from '../../context/CourseContext';
import { server } from '../../main';
import axios from 'axios';
import toast from 'react-hot-toast';
import { UserData } from '../../context/UserContext';
import Loading from '../../components/loading/Loading';



const CourseDescription = ({ user }) => {
    const params = useParams();
    const navigate = useNavigate();
    const [loading,setLoading]=useState(false);
    const { fetchCourse, course,fetchCourses,fetchMyCourse } = CourseData();
    const {fetchUser}=UserData();

    useEffect(() => {
        fetchCourse(params.id);
    }, [params.id]);

    // Log server URL and course data for debugging
    console.log('Server URL:', server);
    console.log('Course Data:', course);
    const checkoutHandler=async()=>{
        const token = localStorage.getItem("token");
       

        setLoading(true);
        
        const {
        
        
        data: { order }, } = await axios.post(`${server}/api/course/checkout/${params.id}`,{},{
            headers:{
token,
            },
        }
        );
const options={
    "key": "rzp_test_ABPDLI1AM4YEaL", // Enter the Key ID generated from the Dashboard
    "amount": order.id, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "E Learning", //your business name
    "description": "Learn with us",
   
    "order_id": order.id, 
    handler:async function(response){
        const{ razorpay_order_id,razorpay_payment_id,razorpay_signature}= response;
        try {

            const { data } = await axios.post( `${server}/api/verification/${params.id}`,
            
            {
            
            razorpay_order_id,
            
            razorpay_payment_id,
            
            razorpay_signature,
        },
        {
            headers:{
                token,
            }
           
        }
            
            );
            
            await fetchUser();
            await fetchCourses();
            await fetchMyCourse();
            toast.success(data.message);
            setLoading(false);
            navigate(`/payment-success/${razorpay_payment_id}`);
             
            } catch (error) { toast.error(error.response.data.message);
                setLoading (false);
            
            }
    },
    theme:{
        "color": "#8a4baf",

    },
        //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
};
const razorpay=new window.Razorpay(options);
razorpay.open();
    };

    return (

       <>
       {
        loading ?
         (<Loading />) :
         (<>
        {course && (
            <div className="course-description">
                <div className="course-header">
                    <div className="course-images">
                        {/* Map through the images array to display all images */}
                        {course.images && course.images.length > 0 ? (
                            course.images.map((image, index) => (
                                <img 
                                    key={index} 
                                    src={`${server}/${image}`} 
                                    alt={`${course.title} image ${index + 1}`} 
                                    className="course-image" 
                                />
                            ))
                        ) : (
                            <img src="path/to/default/image.jpg" alt="Default" className="course-image" />
                        )}
                    </div>
                    <div className="course-info">
                        <h2>{course.title}</h2>
                        <p>Instructor: {course.createdBy}</p>
                        <p>Duration: {course.duration}weeks</p>
                    </div>
                   
                </div>
                <p> {course.description}</p>
                <p>Let's get started with the course at ₹ {course.price}</p>
                    {user && user.subscription.includes(course._id) ? (
                        <button onClick={() => navigate(`/course/study/${course._id}`)} className="common-btn">Study</button>
                    ) : (
                        <button onClick={checkoutHandler} className="common-btn">Buy Now</button>
                    )}
            </div>
        )}
    </>)
}
       </>
    );
};

export default CourseDescription;
