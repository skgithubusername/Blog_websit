import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ImCross } from "react-icons/im";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { URL } from "../url";
import { UserContext } from "../context/UserContext";

const EditPost = () => {


  const postId=useParams().id
  const {user}=useContext(UserContext)
  const navigate=useNavigate()
  const [title,setTitle]=useState("")
    const [desc,setDesc]=useState("")
    const [file,setFile]=useState(null)
    //we use this for better better organization and management of state within the component 
  const [cat, setCat] = useState(""); //by this we add single vale
  const [cats, setCats] = useState([]); // by this we can add and manage array mean no. of value


  const fetchPosts=async()=>{
    try {
      const res=await axios.get(URL+"/api/posts/"+postId)
      setTitle(res.data.title)
      setDesc(res.data.desc)
      setFile(res.data.photo)
      setCats(res.data.categories)
    } catch (error) {
      console.log(error)
      
    }
  }


  const handleUpdate= async(e)=>{

    e.preventDefault()
    const post={
      title,
      desc,
      username:user.username,
      userId:user._id,
      categories:cats
    }

    if(file){
      const data=new FormData()
      const filename=Date.now()+file.name
      data.append("img",filename)
      data.append("file",file)
      post.photo=filename
      // console.log(data)
      //img upload
      try{
        const imgUpload=await axios.post(URL+"/api/upload",data)
        // console.log(imgUpload.data)
      }
      catch(err){
        console.log(err)
      }
    }
    //post upload
    // console.log(post)
    try{
      const res=await axios.put(URL+"/api/posts/"+postId,post,{withCredentials:true})
      navigate("/posts/post/"+res.data._id)
      // console.log(res.data)

    }
    catch(err){
      console.log(err)
    }
  }


  useEffect(()=>{
    fetchPosts()
  },[postId])

  const deleteCategory=(i)=>{
    let updatedCats=[...cats]
    updatedCats.splice(i)
    setCats(updatedCats)
 }

 const addCategory=()=>{
     let updatedCats=[...cats]
     updatedCats.push(cat)
     setCat("")
     setCats(updatedCats)
 }
  
  
  
  return (
    <div>
      <Navbar />
      <div className="px-6 md:px-[200px] mt-8">
        <h1 className="font-bold md:text-2xl text-xl "> Update a Post</h1>
        <form action="" className="w-full flex flex-col space-y-4 md:space-y-8">
          <input
          onChange={(e)=>setTitle(e.target.value)}
          value={title}
            type="text"
            className="px-4 py-2 outline-none mt-4"
            placeholder="Enter post title"
            name=""
            id=""
          />
         
          <input onChange={(e)=>setFile(e.target.files[0])}  type="file" className="px-4 py-2 outline-none" />
          <div className="flex flex-col">
            <div className="flex items-center space-x-4 md:space-x-8">
              <input
                type="text"
                className="px-4 py-2 outline-none"
                placeholder="Enter post category"
                onChange={(e) => setCat(e.target.value)}
                value={cat}
              />

              <div
                onClick={addCategory}
                className="bg-black text-white px-2 py-2 font-semibold  rounded cursor-pointer"
              >
                Add
              </div>
              {/* categories */}
              <div className="flex px-4 mt-3">
              {cats?.map((c,i)=>(
                <div key={i} className='flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md'>
                <p>{c}</p>
                <p onClick={()=>deleteCategory(i)} className='text-white bg-black rounded-full cursor-pointer p-1 text-sm'><ImCross/></p>
            </div>
            ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col px-4 mt-3">
            <textarea
             onChange={(e)=>setDesc(e.target.value)}
             value={desc}
              name=""
              id=""
              cols="30"
              rows="15"
              className="px-4 py-2 "
              placeholder=" Enter post description"
            ></textarea>
            <button onClick={handleUpdate} className=" bg-black w-full md:w-[20%] mt-6 mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg">
             Update
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default EditPost;





