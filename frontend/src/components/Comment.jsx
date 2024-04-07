import axios from "axios";
// import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { URL } from "../url";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Comment = ({ c ,post}) => {

  const {user}=useContext(UserContext)

  const deleteComment=async(id)=>{
    try {

      await axios.delete(URL+"/api/comments/"+id,{withCredentials:true})
      window.location.reload(true)
      
    } catch (error) {
      console.log(error)
      
    }
  }
  return (
    <div className="px-2 py-2 bg-gray-200 rounded-lg mt-2">
      <div className="flex items-center justify-between">
        <h3 className=" text-gray-600 p-4">@{c.author}</h3>
        <div className="flex justify-center items-center space-x-4">
          <p>{new Date(c.updatedAt).toString().slice(0, 15)}</p>
          <p>{new Date(c.updatedAt).toString().slice(16, 24)}</p>
          {user?._id===c?.userId ?
        <div classNameff="flex items-center p-4  ">
        <div className="flex items-center justify-center space-x-2">
          <p onClick={(id)=>deleteComment(c._id)} className="cursor-pointer">
            <MdDelete />
          </p>
        </div>
      </div>:""
        }
          
        </div>
      </div>
      <p className="px-4 mt-2">{c.comment}</p>
    </div>
  );
};

export default Comment;
