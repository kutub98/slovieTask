import React, { useState } from "react";
import { FaEdit, FaEllipsisH, FaUserAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import EditForm from "../EditForm/EditForm";
import "../Form.css";

const UserList = () => {
  const [openEditForm, setOpenEditForm] = useState(false);
  // const userTaks = useSelector((state)=>  console.log(state.userTaskReducer.userTask))

 
  //get all usertTask form  store by mapping. 
  const userTasks = useSelector((state)=>  state.userTaskReducer.userTask)

  const userList = (
   <div  className="userList">
    {userTasks && userTasks.map(task => {
      const  {id, userTake, joinDate, time, userName } = task
      console.log(task);
      return <div className="userList">
      <div className="information">
        <FaUserAlt className=" w-8 h-8 mr-5" />
        <div>
          <h1>{userName}</h1>
          <h1>{joinDate}</h1>
        </div>
      </div>
      <div className="editPersonalInfo">
        <div className="tooltip" data-tip="Edit User">
        <FaEdit onClick={() => setOpenEditForm(!openEditForm)} className="w-5 h-5 ml-3 border" />
        </div>

        <FaEllipsisH className="w-5 h-5 ml-3 border" />
      </div>
    </div>
})}
   </div>
  );

  return (
    <div className=" w-full ">
      {openEditForm ? (
        <EditForm setOpenEditForm={setOpenEditForm}></EditForm>
      ) : (
       
          <div className="userList">{userList}</div>
        
      )}
    </div>
  );
};

export default UserList;
