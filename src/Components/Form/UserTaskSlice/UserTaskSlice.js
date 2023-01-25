import { createSlice } from "@reduxjs/toolkit";

const initialUserTask = {

  userTask: [{ id: "01", userTask: "fellow Up", userName: "Kutub Uddin", joinDate: "01-23-2023", time: "06: 30pm" }],
};
export const initialUserTaskSlice = createSlice({
  name: "userTask",
  initialState: initialUserTask,
  reducer: {
    showsTask: (state) => state,
    addTask: (state, action) => {
      state.userTask.push(action.payload);
    }
  },
});
export const { showsTask, addTask } = initialUserTaskSlice.actions;
export default initialUserTaskSlice.reducer;
