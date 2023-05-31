import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../tasks/TasksSlice";

interface CategoryState {
  tasks: Task[]; // Array of all tasks
  completedTasks: { [userId: number]: Task[] | undefined }; // Object to store completed tasks by user ID
  uncompletedTasks: Task[]; // Array of uncompleted tasks
}

const initialState: CategoryState = {
  tasks: [],
  completedTasks: {},
  uncompletedTasks: [],
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    // addTask: (state, action: PayloadAction<Task>) => {
    //   state.tasks.push(action.payload);
    // },
    markTaskAsCompleted: (
      state,
      action: PayloadAction<{ userId: number; task: Task }>
    ) => {
      const { userId, task } = action.payload;
      if (!state.completedTasks[userId]) {
        state.completedTasks[userId] = [];
      }
      state.completedTasks[userId]?.push(task);
      state.uncompletedTasks = state.uncompletedTasks.filter(
        (uncompletedTask) => uncompletedTask.id !== task.id
      );
    },

    markTaskAsUncompleted: (
      state,
      action: PayloadAction<{ userId: number; task: Task }>
    ) => {
      const { userId, task } = action.payload;
      if (state.completedTasks[userId]) {
        state.completedTasks[userId] = state.completedTasks[userId]?.filter(
          (completedTask) => completedTask.id !== task.id
        );
        state.uncompletedTasks.push(task);
      }
    },
    // markTaskAsCompleted: (
    //   state,
    //   action: PayloadAction<{ userId: number; task: Task }>
    // ) => {
    //   const { userId, task } = action.payload;
    //   if (!state.completedTasks[userId]) {
    //     state.completedTasks[userId] = [];
    //   }
    //   state.completedTasks[userId]?.push(task);

    // },
  },
});

export const { markTaskAsCompleted, markTaskAsUncompleted } = categorySlice.actions;

export const CategoryReducer = categorySlice.reducer;
