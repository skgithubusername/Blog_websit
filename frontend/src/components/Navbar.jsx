import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import { useContext, useState } from "react";
import Mean from "./Mean";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  
  const[promt,setPromt]=useState("")
  const [menu, setMenu] = useState(false);
  const navigate=useNavigate()
  const path=useLocation().pathname
  // console.log(promt)

  const showMenu = () => {
    setMenu(!menu);
  };

  const {user}=useContext(UserContext)
  // console.log(user)
  
  return (
    <div className=" flex items-center justify-between px-6 md:px-[200px] py-4 bg-slate-200">
      <h1 className="text-lg md:text-xl font-extrabold">
        <Link to={"/"}>Blog Market</Link>
      </h1>
      {path==='/' && 
      <div className="flex justify-center items-center space-x-2">
      <p onClick={()=>navigate(promt?"?search="+promt:navigate("/"))} className="cursor-pointer">
        <BsSearch />
      </p>
      <input
      onChange={(e)=>setPromt(e.target.value)}
        type="text"
        className="outline-none px-3 bg-slate-200"
        placeholder="Search a post"
      />
    </div>

      }
      <div className="hidden md:flex flex items-center justify-center space-x-2 md:space-x-4 ">
        {user ? (
          <h3 className="bg-gray-500 rounded p-2 w-[100px] text-center">
            <Link to={"/write"}>Write</Link>
          </h3>
        ) : (
          <h3 className="bg-gray-500 rounded p-2 w-[100px] text-center">
            <Link to={"/login"}>Login</Link>
          </h3>
        )}
        {user ? <div onClick={showMenu} className="text-lg cursor-pointer">
        <p className="cursor-pointer relative">
          <FaBars />
        </p>
        {menu && <Mean />}
      </div>:
          <h3 className="bg-gray-500 rounded p-2 w-[100px] text-center">
            <Link to={"/register"}>Register </Link>
          </h3>
        }
      </div>
      <div onClick={showMenu} className=" md:hidden text-lg cursor-pointer">
        <p className="cursor-pointer relative">
          <FaBars />
        </p>
        {menu && <Mean />}
      </div>
    </div>
  );
};

export default Navbar;
