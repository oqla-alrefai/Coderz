import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../Redux/userSlice";
import UpdateForm from "./Form";
import { useDispatch } from "react-redux";
import "./home.css"

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logout = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate("/signin");
  };
  
  const delUser = () =>{
    const id = JSON.parse(localStorage.getItem("userData")).id
    dispatch(deleteUser({id})).then(() => {
      setTimeout(()=>{
        navigate("/");
      }, 3000
      )
    })
    .catch(err => {
      console.log(err);
    })}

  const [update,setUpdate] = useState(false) 
const handleUpdateForm = (bool) => {
 setUpdate(bool);
 setTimeout(() => {
   window.location.reload()
 }, 4000
  )
}
const user = JSON.parse(localStorage.getItem("userData"))

  return (
    <div className="home">
      <div>
          <h1>{user.name}</h1>
          <p>{user.gender}</p>
          <p>{user.id}</p>
          <p>{user.email}</p>
          <p>{user.status}</p>
        </div>
      <div>

      <button onClick={logout}>Logout</button>
      <button onClick={delUser}>delete</button>
      
      <button class="updateButton" onClick={() => setUpdate(true)}>Update</button>
      </div>
      {
        update && 
          <UpdateForm class="update-form" handleUpdateForm={handleUpdateForm}/>
        
      }

    </div>
  );
};

export default Home;
