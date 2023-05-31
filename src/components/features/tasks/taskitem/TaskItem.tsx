import React, { SetStateAction, Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { RootState } from "../../../../store";
import { addTask, editTask, deleteTask } from "../TasksSlice";
import { MdCancel } from "react-icons/md";
import { FaPen, FaCheckCircle } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { BsFillPencilFill } from "react-icons/bs";
import Tippy from "@tippyjs/react";

import "./taskitem.css";
import { dispatchMarkTaskAsCompleted } from "../TasksSlice";
import {
  markTaskAsCompleted,
  markTaskAsUncompleted,
} from "../../categories/CategoriesSlice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import { markTaskAsCompleted } from "../../c";

type EditTaskHandler = (taskId: string) => void;

interface EditProps {
  userId: number;
  updatedTask: Task;
}

interface Task {
  id: string;
  title: string;
  description: string;
}

interface TaskItemProps {
  task: Task;
  modalIsOpen: boolean | null;
  setModalIsOpen: Dispatch<SetStateAction<boolean | null>>;
  addingTask: boolean | null;
  editingTask: boolean | null;
  editedTitle: string;
  editedDescription: string;
  setEditedTitle: React.Dispatch<React.SetStateAction<string>>;
  setEditedDescription: React.Dispatch<React.SetStateAction<string>>;
  setAddingTask: React.Dispatch<React.SetStateAction<boolean | null>>;
  setEditingTask: React.Dispatch<React.SetStateAction<boolean | null>>;
  onEditTask: EditTaskHandler;
  selectedCategory: string | null;
}

const TaskItem: React.FC<TaskItemProps> = ({
  editedTitle,
  editedDescription,
  setEditedTitle,
  setEditedDescription,
  task,
  modalIsOpen,
  setModalIsOpen,
  addingTask,
  editingTask,
  setAddingTask,
  setEditingTask,
  onEditTask,
  selectedCategory,
}) => {
  const users = useSelector((state: RootState) => state.UserReducer.users);

  const loggedInUsername: string | null = useSelector(
    (state: RootState) => state.CurrentUserReducer?.username
  );

  const user = users.find((user) => user.username === loggedInUsername);
  let userId: number;
  if (user) {
    userId = user?.id as number;
  } else {
    console.log("User not found");
  }

  const dispatch = useDispatch();

  const tasks = useSelector(
    (state: RootState) => state.TaskReducer[userId] || []
  );

  const handleDeleteTask = (userId: number, taskId: string) => {
    dispatch(deleteTask({ userId, taskId }));
  };

  const handleCompleteTask = (userId: number, task: Task) => {
    dispatch(markTaskAsCompleted({ userId, task }));
  };

  const handleUncompleteTask = (userId: number, task: Task) => {
    dispatch(markTaskAsUncompleted({ userId, task }));
  };
  const handleEditingFunctions = (taskId: string) => {
    onEditTask(taskId);
    setEditingTask(true);
    setModalIsOpen(true);
    setAddingTask(null);
  };

  return (
    <div className="taskitem-wrapper">
      <div className="taskform-content">
        <h4 className="task-item-title">
          <span className="completed-signal"> </span>
          {task.title}{" "}
        </h4>
        <p> {task.description}</p>
      </div>

      {selectedCategory === "all" && (
        <div className="icons">
          <div className="delete-button">
            <MdCancel
              size={28}
              className="icon delete-icon"
              onClick={() => handleDeleteTask(userId, task.id)}
            />
            {/* <span className="delete-hover-text"> Delete task</span> */}
          </div>

          <div className="icon edit-icon">
            {/* <FaPen */}
            <BsFillPencilFill
              size={26}
              onClick={() => handleEditingFunctions(task.id)}
              className="icon edit-icon"
            />
          </div>

          <TooltipComponent content="mark task complete" position="TopCenter">
            <div>
              <FaCheckCircle
                size={28}
                // onClick={() => dispatchMarkTaskAsCompleted(userId, task.id)}
                onClick={() => handleCompleteTask(userId, task)}
                className=" icon markcomplete-icon"
              />
            </div>
          </TooltipComponent>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
