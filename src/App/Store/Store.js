import { configureStore } from "@reduxjs/toolkit";
import  userTaskReducer  from "../../Components/Form/UserTaskSlice/UserTaskSlice";



const storeUserTask = configureStore({
    reducer: {
        userTaskReducer : userTaskReducer,
    }
  
})
export default storeUserTask;