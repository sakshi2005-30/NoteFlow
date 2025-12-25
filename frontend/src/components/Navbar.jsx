import { useState ,useEffect} from "react"
import { Link, useNavigate } from "react-router-dom"
const Navbar = ({user,handleLogout}) => {
  const [search,setSearch]=useState("");
  const navigate=useNavigate()
  useEffect(()=>{
    if(!user){
      return;
    }
    const delay=setTimeout(()=>{
      navigate(search.trim()?`/?search=${encodeURIComponent(search)}`:"/");
    },500)
  },[search,user,navigate])
  return (
    <div className="w-full bg-gray-900 p-4 mb-10">
      <div className="mx-10 flex justify-between items-center">
        <Link to="/" className="font-medium text-xl">
          NoteFlow
        </Link>
        {user && (
          <>
          <div>
            <input type="text"
            value={search}
            placeholder="Search Notes..."
            onChange={(e)=>setSearch(e.target.value)}
            className="bg-gray-700 outline-none px-4 py-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 "/>
          </div>
            <div>
              <span>{user.username} </span>
              <button
                className="ml-6 py-2 px-4 bg-white rounded-lg text-black font-medium cursor-pointer hover:bg-gray-200 border"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar