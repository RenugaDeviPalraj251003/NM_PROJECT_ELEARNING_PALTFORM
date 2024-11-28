import React, { useEffect, useState } from 'react';
import './lecture.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { server } from '../../main';
import Loading from '../../components/loading/Loading';
import toast from 'react-hot-toast';

const Lecture = ({ user }) => {
    const [lectures, setLectures] = useState([]);
    const [lecture, setLecture] = useState(null); // Use null to handle empty states better
    const [loading, setLoading] = useState(true);
    const [lecLoading, setLecLoading] = useState(false);
    const [show, setShow] = useState(false);
    const params = useParams();
    const navigate=useNavigate();
    const [title,setTitle]=useState("")
    const [description,setDescription]=useState("")
    const [video,setvideo]=useState("")
const [videoPrev,setVideoPrev]=useState("")
const [btnLoading,setBtnLoading]=useState(false)
if(user && user.role!=="admin" && !user.subscription.includes(params.id))
 return navigate("/");

    // Fetch all lectures for the course
    async function fetchLectures() {
        try {
            const { data } = await axios.get(`${server}/api/lectures/${params.id}`, {
                headers: {
                    token: localStorage.getItem('token'),
                },
            });
            setLectures(data.lectures);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    // Fetch individual lecture by ID
    async function fetchLecture(id) {
        setLecLoading(true);
        try {
            const { data } = await axios.get(`${server}/api/lecture/${id}`, {
                headers: {
                    token: localStorage.getItem('token'),
                },
            });
            setLecture(data.lecture); // Set the fetched lecture
            setLecLoading(false);
        } catch (error) {
            console.log(error);
            setLecLoading(false);
        }
    }

const changeVideoHandler = (e) => {

    const file = e.target.files[0];
    
    const reader = new FileReader();
    
    reader.readAsDataURL(file);
    
    reader.onloadend = () => {
    
    setVideoPrev (reader.result);
    
    setvideo(file);
    
    };
    
    };
    const submitHandler = async (e) => {
        e.preventDefault();
        setBtnLoading(true);
      
        const myForm = new FormData();
        myForm.append("title", title);
        myForm.append("description", description);
        myForm.append("files", video);  // Make sure this key matches your backend
      
        try {
          const { data } = await axios.post(`${server}/api/course/${params.id}`, myForm, {
            headers: {
              token: localStorage.getItem("token"),
            },
          });
      
          toast.success(data.message);
          setBtnLoading(false);
          fetchLectures(); 
          setTitle("") ;
          setDescription("")
          setvideo("")
          setVideoPrev("")// Refresh the lecture list after successful submission
        } catch (error) {
          toast.error(error.response?.data?.message || 'Error adding lecture');
          setBtnLoading(false);
        }
      };
      const deleteHandler = async (id) => {
        if (confirm("Are you sure you want to delete this lecture?")) {
            try {
                const { data } = await axios.delete(`${server}/api/lecture/${id}`, {
                    headers: {
                        token: localStorage.getItem("token"),
                    },
                });
                toast.success(data.message);
                fetchLectures();  // Refresh the lecture list after deletion
            } catch (error) {
                toast.error(error.response?.data?.message || 'Error deleting lecture');
            }
        }
    };
    
     
    // Fetch lectures when the component mounts
    useEffect(() => {
        fetchLectures();
    }, []);

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <>
                    <div className="lecture-page">
                        <div className="left">
                            {lecLoading ? (
                                <Loading />
                            ) : (
                                <>
                                    {lecture && lecture.videos.length > 0 ? (
                                        <video
                                            src={`${server}/${lecture.videos[0].replace(/\\/g, '/')}`} // Replace \ with /
                                            width={'100%'}
                                            controls
                                            controlsList="nodownload noremoteplayback"
                                            disablePictureInPicture
                                            disableRemotePlayback
                                            autoPlay
                                        ></video>
                                    ) : (
                                        <h1>Please Select Lecture</h1>
                                    )}
                                </>
                            )}
                        </div>
                        <div className="right">
                            {user && user.role === 'admin' && (
                                <button className="common-btn" onClick={() => setShow(!show)}>
                                    {show ? 'Close' : 'Add Lecture +'}
                                </button>
                            )}
                            {show && (
                                <div className="lecture-form">
                                    <h2>Add 
                                        Lecture
                                    </h2>
                                    <form onSubmit={submitHandler}>
                                        <label htmlFor="title">Title</label>
                                        <input type="text"  value={title} onChange={(e)=>setTitle(e.target.value)} 
                                        name="title" required />
                                        <label htmlFor="description">Description</label>
                                        <input type="text"  value={description} onChange={(e)=>setDescription(e.target.value)} name="description" required />
                                        <input type="file" placeholder="Choose video"  onChange={changeVideoHandler} required />
                                        {videoPrev && (

<video
src={videoPrev}
alt=""
width={300}
controls
></video>

)}
                                        <button disabled={btnLoading} type="submit" className="common-btn">
                                           {btnLoading ?"Please Login...":"Add"}
                                        </button>
                                    </form>
                                </div>
                            )}
                            {lectures && lectures.length > 0 ? (
                                lectures.map((e, i) => (
                                    <div key={i}>
                                        <div
                                            onClick={() => fetchLecture(e._id)} // Fetch the lecture by ID when clicked
                                            className={`lecture-number ${lecture && lecture._id === e._id ? "active" : ""}`}
                                        >
                                            {i + 1}. {e.title}
                                        </div>
                                        {user && user.role === 'admin' && (
                                            <button className="common-btn" style={{ background: 'red' }} 
                                            onClick={()=>deleteHandler(e._id)}>
                                                Delete {e.title}
                                            </button>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <p>No Lectures Yet!</p>
                            )}
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default Lecture;
