import React, { useEffect, useState } from "react";
import { FaPlusSquare, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import "./Form.css";
import UserList from "./UserList/UserList";
import { addTask } from "./UserTaskSlice/UserTaskSlice";

const Form = () => {
  const [openForm, setOpenForm] = useState(false);
  const [datePicker, setDatePicker] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()

  useEffect(() => {
    setLoading(true);
    fetch("datepicker.json")
      .then((data) => data.json())
      .then((res) => setDatePicker(res.datePicker))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const userTasksLength = useSelector((state)=>  state.userTaskReducer.userTask.length)
  console.log(userTasksLength);
  // console.log(datePicker);

  const saveUser = (e) => {
    e.preventDefault();
  
    const form = e.target;
    const userTask= form.taskDescription.value;
    const joinDate= form.date.value;
    const time= form.time.value;
    const userName= form.assigningUser.value;
    console.log(userTask, joinDate, time, userName);

    const tasks = {id: userTasksLength+ 1, userTask, joinDate, time, userName }
    dispatch(addTask(tasks))


    form.reset()


  };

  const handleCancel = () => {
    setOpenForm(false);
}

  const form = (
    <form action="" onSubmit={saveUser} className="">
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

          <select name="time" id="" required>
            {loading ? (
              <div>Loading...</div>
            ) : (
              datePicker &&
              Array.isArray(datePicker) &&
              datePicker.map((time, i) => (
                <option name="time" value={time} key={i}>
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
      <div className="flex justify-end buttonBox mt-3 mb-2">
        <button className=" ml-2 bg-red-500" type="cancel" onClick={handleCancel}>
          Cancel
        </button>
        <button className="ml-4 bg-green-500 text-white" type="submit">
          Save
        </button>
      </div>
    </form>
  );

  return (
    <div className="formBox">
      <div className="topSection bg-slate-50 border">
        <h1 className="task">Task 0</h1>
        <h1 onClick={() => setOpenForm(!openForm)} className="plus">
          {openForm ? (
            <div className="tooltip" data-tip="Cancel">
              <FaTimes className=" h-6 w-6 bg-white mr-4" />
            </div>
          ) : (
            <div className="tooltip" data-tip="Add a Task">
              <FaPlusSquare className=" h-6 w-6 bg-white mr-4" />
            </div>
          )}
        </h1>
      </div>

      <div className="formDiv">
        {openForm ? (
          <>
            <div className="formDiv">{form}</div>{" "}
          </>
        ) : (
          <UserList></UserList>
        )}

        {/* userList  */}
      </div>
    </div>
  );
};

export default Form;
