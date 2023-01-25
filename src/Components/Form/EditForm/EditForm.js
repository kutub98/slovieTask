import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import "../Form.css";
import Swal from 'sweetalert2/dist/sweetalert2.js'


const EditForm = ({setOpenEditForm}) => {
  const [datePicker, setDatePicker] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("datepicker.json")
      .then((data) => data.json())
      .then((res) => setDatePicker(res.datePicker))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  // console.log(datePicker);

  // update user 
  const udateUser = (e) => {
    e.preventDefault();
    console.log("hello");
  };

  // update cancel 
  const handleCancel = () => {
    setOpenEditForm(false);
  };

  
  // delete user 
  const handleToDelete = ()=>{
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }
  return (
    <form action="" onSubmit={udateUser} className="">
      {/* task description  */}
      <div className="taskDescription">
        <label htmlFor="" className="block">
          Task Description
        </label>
        <input required type="text" id="" name="taskDescription" placeholder="Task Description" />
      </div>

      {/* date and time  */}
      <div className="flex justify-between dateAndTime">
        {/* date input  */}
        <div className="date">
          <label htmlFor="" className="block">
            Date
          </label>
          <input required type="date" id="" name="date" />
        </div>

        {/* time input  */}
        <div className="time">
          <label htmlFor="" className="block">
            Time
          </label>

          <select name="" id=""  required>
            {loading ? (
              <div>Loading...</div>
            ) : (
              datePicker &&
              Array.isArray(datePicker) &&
              datePicker.map((time, i) => (
              
                <option defaultValue={"select your time"} value={time} key={i}>
                  {time}
                </option>
              ))
            )}
          </select>
        </div>
      </div>

      {/* assigning User  */}
      <div className="assigningUser">
        <label htmlFor="" className="block">
          Assign User
        </label>
        <input required type="text" id="" name="assigningUser" placeholder="Task Description" />
      </div>

      {/* save & cancel button  */}
      <div className="flex items-center justify-between">
        <div className="tooltip" data-tip="Delete" onClick={handleToDelete}>
          <FaTrashAlt className="w-6 h-6 text-red-600 text-lg" />
        </div>

      

        <div className="flex justify-end buttonBox mt-3 mb-2">
          <button className=" ml-2 bg-red-500" type="cancel" onClick={handleCancel}>
            Cancel
          </button>
          <button className="ml-4 bg-green-500 text-white" type="submit">
            Update
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditForm;
