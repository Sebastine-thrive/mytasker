// tasksSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { markTaskAsCompleted } from "../categories/CategoriesSlice";
import { Dispatch } from "@reduxjs/toolkit";

export interface Task {
  id: string;
  title: string;
  description: string;
}

interface TaskState {
  [userId: number]: Task[];
}

const initialState: TaskState = {};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<{ userId: number; task: Task }>) => {
      const { userId, task } = action.payload;
      if (!state[userId]) {
        state[userId] = [];
      }
      state[userId].push(task);
    },

    editTask: (
      state,
      action: PayloadAction<{
        userId: number;
        taskId: string;
        updatedTaskTitle: string;
        updatedTaskDescription: string;
      }>
    ) => {
      const { userId, taskId, updatedTaskTitle, updatedTaskDescription } =
        action.payload;

      const userTasks = state[userId];

      if (userTasks) {
        const task = userTasks.find((task) => task.id === taskId);
        if (task) {
          task.title = updatedTaskTitle;
          task.description = updatedTaskDescription;
        }
      }
    },

    deleteTask: (
      state,
      action: PayloadAction<{ userId: number; taskId: string }>
    ) => {
      const { userId, taskId } = action.payload;
      const userTasks = state[userId];
      if (userTasks) {
        const taskIndex = userTasks.findIndex((task) => task.id === taskId);
        if (taskIndex !== -1) {
          userTasks.splice(taskIndex, 1);
        }
      }
    },
  },
});

export const { addTask, editTask, deleteTask } = tasksSlice.actions;
export const TaskReducer = tasksSlice.reducer;

export const dispatchMarkTaskAsCompleted = (userId: number, task: Task) => {
  return markTaskAsCompleted({ userId, task });
};
