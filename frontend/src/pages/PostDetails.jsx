import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Comment from "../components/Comment";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { IF, URL } from "../url";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { UserContext } from "../context/UserContext";
import Loader from "../components/Loader";

const PostDetails = () => {
  const postId = useParams().id;
  const [post, setPosts] = useState({});
  const { user } = useContext(UserContext);
  const [comments,setComments]=useState([]);
  const [comment,setComment]=useState();
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const fetchPosts = async () => {
    setLoader(true);
    try {
      const res = await axios.get(URL + "/api/posts/" + postId);

      setPosts(res.data);
      setLoader(false);
    } catch (err) {
      console.log(err);
      setLoader(false);
    }
  };

  const handeldeletepost = async () => {
    try {
      const res = await axios.delete(URL + "/api/posts/" + postId);
      console.log(res.data);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  

  useEffect(() => {
    fetchPosts();
  }, [postId]);



 const fetchPostsComments=async()=>{

  try {
    const res = await axios.get(URL+"/api/comments/post/"+postId)
    setComments(res.data)
    
  } catch (error) {
    console.log(error)
  }
 }

 useEffect(() => {
  fetchPostsComments();
}, [postId]);



const postComment=async(e)=>{

  e.preventDefault()
  try {
    
    const res=await axios.post(URL+"/api/comments/create/",{comment:comment,author:user.username,postId:postId,userId:user._id},{withCredentials:true})
  
    // fetchPostsComments()
    // setComment("")
    window.location.reload(true)


  } catch (error) {
    console.log(error)
    
  }
}


  return (
    <div>
      <Navbar />
      {loader ? (
        <div className="h-[80vh] flex justify-center items-center w-full">
          <Loader />
        </div>
      ) : (
        <div className="px-8 md:px-[200px] mt-8">
          <div className="flex justify-betwwen items-center">
            <h1 className="text-2xl font-bold text-black md:text-3xl">
              {post.title}
            </h1>
            <div className="flex items-center m-8 p-4  ">
              {user?._id === post?.userId && (
                <div className="flex items-center justify-center space-x-2">
                  <p className="cursor-pointer"  onClick={()=>navigate('/edit/'+postId)}>
                    <BiEdit />
                  </p>
                  <p className="cursor-pointer" onClick={handeldeletepost}>
                    <MdDelete />
                  </p>
                </div>
              )}
              
            </div>
          </div>
          <div className="flex items-center justify-between mt-2 md:mt-4">
            <p>{post.username}</p>
            <div className="flex space-x-2">
              <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
              <p>{new Date(post.updatedAt).toString().slice(16, 24)}</p>
              
            </div>
          </div>
          <img
            src={IF + post.photo}
            alt="error"
            className="w-full mx-auto mt-8 "
          />
          <p className="mx-auto mt-8">{post.desc}</p>
          <div className="flex item-center mt-8 space-x-4 font-semibold">
            <p>Categories:</p>
            <div className="flex justify-center items-center space-x-2">
              {post.categories?.map((c, i) => (
                <div key={i} className="bg-gray-300 rounded-lg px-3 py-1">
                  {c}{" "}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col mt-4">
            <h3 className="mt-6 mb-4 semibold">Comments</h3>
            {/* comment */}
            {comments?.map((c)=>(
              <Comment  key={c._id} c={c} post={post}/>
            ))}
          </div>

          {/* write a comment */}
          <div className=" w-full flex flex-col mt-4 md:flex-row">
            <input
            onChange={(e)=>setComment(e.target.value)}
              placeholder="write a comment"
              type="text"
              className="md:w-[90%] outline-none px-4 mt-4 md:mt-0"
            />
            <button onClick={postComment} className="bg-black text-white px-4 py-2 md:w-[20%] mt-4 md:mt-0 rounded">
              Add Comment
            </button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default PostDetails;
