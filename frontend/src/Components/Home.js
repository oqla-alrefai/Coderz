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
        <h1 className="user-name">{user.name}</h1>
        <p className="user-detail">Gender: {user.gender}</p>
        <p className="user-detail">ID: {user.id}</p>
        <p className="user-detail">Email: {user.email}</p>
        <p className="user-detail">Status: {user.status}</p>
        </div>
      <div>

      <button className="button" onClick={logout}>Logout</button>
      <button className="button" onClick={delUser}>delete</button>
      
      <button className="button" onClick={() => setUpdate(true)}>Update</button>
      </div>
      {
        update && 
          <UpdateForm className="update-form" handleUpdateForm={handleUpdateForm}/>
        
      }

    </div>
  );
};

export default Home;
