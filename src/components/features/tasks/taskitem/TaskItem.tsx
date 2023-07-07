import React, { useState, SetStateAction, Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { deleteTask } from "../TasksSlice";
import { MdCancel } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { BsFillPencilFill } from "react-icons/bs";

import "./taskitem.css";
import {
  markTaskAsCompleted,
  markTaskAsUncompleted,
} from "../../categories/CategoriesSlice";

import { Tooltip } from "react-tooltip";
import "react-toastify/dist/ReactToastify.css";

type EditTaskHandler = (taskId: string) => void;

interface Task {
  id: string;
  title: string;
  description: string;
}

interface TaskItemProps {
  task: Task;
  setModalIsOpen: Dispatch<SetStateAction<boolean | null>>;
  editedTitle: string;
  editedDescription: string;
  setEditedTitle: React.Dispatch<React.SetStateAction<string>>;
  setEditedDescription: React.Dispatch<React.SetStateAction<string>>;
  setAddingTask: React.Dispatch<React.SetStateAction<boolean | null>>;
  setEditingTask: React.Dispatch<React.SetStateAction<boolean | null>>;
  onEditTask: EditTaskHandler;
  selectedCategory: string | null;
  ongoingTasks: Task[];
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  setModalIsOpen,
  setAddingTask,
  setEditingTask,
  onEditTask,
  selectedCategory,
}) => {
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const [deleteTaskModalIsOpen, setDeleteTaskModalIsOpen] =
    useState<boolean>(false);

  const [MarkTaskCompleteModalIsOpen, setMarkTaskCompleteModalIsOpen] =
    useState<boolean>(false);

  const [markTaskUncompletedModalIsOpen, setMarkTaskUncompletedModalIsOpen] =
    useState<boolean>(false);

  const dispatch = useDispatch();

  const handleDeleteTaskModal = (taskId: string) => {
    setSelectedTaskId(taskId);
    setDeleteTaskModalIsOpen(true);
  };

  const handleCompleteTaskModal = (userId: number, taskId: string) => {
    setSelectedTaskId(taskId);
    setMarkTaskCompleteModalIsOpen(true);
  };

  const handleUncompletedTaskModal = (userId: number, taskId: string) => {
    setSelectedTaskId(taskId);
    setMarkTaskUncompletedModalIsOpen(true);
  };

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

  const completedTasks = useSelector(
    (state: RootState) => state.CategoryReducer.completedTasks[userId] || []
  );

  const handleDeleteTask = (userId: number, taskId: string) => {
    dispatch(deleteTask({ userId, taskId }));
    setDeleteTaskModalIsOpen(false);
  };

  const handleCompleteTask = (userId: number, task: Task) => {
    dispatch(markTaskAsCompleted({ userId, task }));
    setMarkTaskCompleteModalIsOpen(false);
  };

  const handleUncompleteTask = (userId: number, task: Task) => {
    dispatch(markTaskAsUncompleted({ userId, task }));
    setMarkTaskUncompletedModalIsOpen(false);
    setMarkTaskCompleteModalIsOpen(false);
  };

  const handleEditingFunctions = (taskId: string) => {
    onEditTask(taskId);
    setEditingTask(true);
    setModalIsOpen(true);
    setAddingTask(null);
  };

  const isTaskCompleted = completedTasks.some((t) => task.id === t.id);

  console.log(isTaskCompleted); // Output: true or false

  return (
    <div className="taskitem-wrapper">
      <div className="taskform-content">
        <h4 className="task-item-title">
          <span className={`signal  ${isTaskCompleted ? "green" : "blue"} `}>
            {" "}
          </span>
          {task.title}{" "}
        </h4>
        <p className="task-item-description"> {task.description}</p>
      </div>

      {selectedCategory === "all" && (
        <div className="icons">
          {!isTaskCompleted ? (
            <a data-tooltip-id="tooltip" data-tooltip-content="Delete task ">
              <div className="delete-button">
                <MdCancel
                  size={28}
                  className="icon delete-icon"
                  onClick={() => handleDeleteTaskModal(task.id)}
                />

                {deleteTaskModalIsOpen ? (
                  <div
                    className={`task-modal delete-modal ${
                      selectedTaskId === task.id ? "show" : "hidden"
                    }`}
                  >
                    <h5> Delete this Task?</h5>
                    <div className="task-options">
                      {" "}
                      <p
                        className="option"
                        onClick={() => setDeleteTaskModalIsOpen(false)}
                      >
                        No
                      </p>{" "}
                      <p
                        className="option"
                        onClick={() => handleDeleteTask(userId, task.id)}
                      >
                        {" "}
                        Yes{" "}
                      </p>
                    </div>{" "}
                  </div>
                ) : null}
              </div>
            </a>
          ) : null}

          <Tooltip id="tooltip" />

          {!isTaskCompleted ? (
            <a data-tooltip-id="tooltip" data-tooltip-content="Edit task ">
              <div className="icon edit-icon">
                <BsFillPencilFill
                  size={26}
                  onClick={() => handleEditingFunctions(task.id)}
                  className="icon edit-icon"
                />
              </div>
            </a>
          ) : null}
          <Tooltip id="tooltip" />

          {isTaskCompleted ? (
            <a
              data-tooltip-id="tooltip"
              data-tooltip-content="Mark task uncompleted"
            >
              <div className="complete-button">
                <FaCheckCircle
                  size={28}
                  onClick={() => handleUncompletedTaskModal(userId, task.id)}
                  className=" icon markuncomplete-icon"
                />

                {markTaskUncompletedModalIsOpen ? (
                  <div
                    className={`task-modal mark-uncomplete-modal ${
                      selectedTaskId === task.id ? "show" : "hidden"
                    }`}
                  >
                    <h5> Reverse this completed task as uncompleted ?</h5>
                    <div className="task-options">
                      {" "}
                      <p
                        className="option"
                        onClick={() => setMarkTaskUncompletedModalIsOpen(false)}
                      >
                        No
                      </p>{" "}
                      <p
                        className="option"
                        onClick={() => handleUncompleteTask(userId, task)}
                      >
                        {" "}
                        Yes{" "}
                      </p>
                    </div>{" "}
                  </div>
                ) : null}
              </div>
            </a>
          ) : null}
          <Tooltip id="tooltip" />

          {!isTaskCompleted ? (
            <a
              data-tooltip-id="tooltip"
              data-tooltip-content="Mark task complete"
            >
              <div className="complete-button">
                <FaCheckCircle
                  size={28}
                  onClick={() => handleCompleteTaskModal(userId, task.id)}
                  className=" icon markcomplete-icon"
                />

                {MarkTaskCompleteModalIsOpen ? (
                  <div
                    className={`task-modal mark-complete-modal ${
                      selectedTaskId === task.id ? "show" : "hidden"
                    }`}
                  >
                    <h5> Mark this task as complete ? </h5>
                    <div className="task-options">
                      {" "}
                      <p
                        className="option"
                        onClick={() => setMarkTaskCompleteModalIsOpen(false)}
                      >
                        No
                      </p>{" "}
                      <p
                        className="option"
                        onClick={() => handleCompleteTask(userId, task)}
                      >
                        {" "}
                        Yes{" "}
                      </p>
                    </div>{" "}
                  </div>
                ) : null}
              </div>
            </a>
          ) : null}
          <Tooltip id="tooltip" />
        </div>
      )}
    </div>
  );
};

export default TaskItem;
