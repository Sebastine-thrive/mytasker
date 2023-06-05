import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  ChangeEvent,
  FormEvent,
  SetStateAction,
  Dispatch,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { RootState } from "../../store";
import { Task } from "../features/tasks/TasksSlice";
import { addTask, editTask } from "../features/tasks/TasksSlice";
import { toast, ToastContainer } from "react-toastify";
import { MdCancel } from "react-icons/md";

import "./taskform.css";

type EditTaskHandler = (taskId: string) => void;

// type EditTaskData = {
//   userId: number;
//   taskId: string;
//   title: string;
//   description: string;
// };

interface UserPageProps {
  modalIsOpen: boolean | null;
  setModalIsOpen: Dispatch<SetStateAction<boolean | null>>;
  taskid: string;
  addingTask: boolean | null;
  editingTask: boolean | null;
  setAddingTask: Dispatch<SetStateAction<boolean | null>>;
  setEditingTask: Dispatch<SetStateAction<boolean | null>>;
  onEditTask: EditTaskHandler;
  editedTitle: string;
  editedDescription: string;
  setEditedTitle: React.Dispatch<React.SetStateAction<string>>;
  setEditedDescription: React.Dispatch<React.SetStateAction<string>>;
}

const TaskForm: React.FC<UserPageProps> = ({
  taskid,
  onEditTask,
  modalIsOpen,
  setModalIsOpen,
  addingTask,
  editingTask,
  setAddingTask,
  setEditingTask,
  editedTitle,
  editedDescription,
  setEditedTitle,
  setEditedDescription,
}) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskCreationError, setTaskCreationError] = useState<boolean | null>(
    null
  );

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const users = useSelector((state: RootState) => state.UserReducer.users);
  // console.log(users);

  const loggedInUsername: string | null = useSelector(
    (state: RootState) => state.CurrentUserReducer?.username
  );

  const user = users.find((user) => user.username === loggedInUsername);
  let userId: number;
  if (user) {
    userId = user.id as number;
    // console.log("User ID:", userId);
  } else {
    console.log("User not found");
  }

  const dispatch = useDispatch();

  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.classList.add("focused");
    }
  };

  const handleBlur = () => {
    if (inputRef.current) {
      inputRef.current.classList.remove("focused");
    }
  };

  const handleTaskTitleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setTaskTitle(event.target.value);
    },
    []
  );

  const handleTaskTitleEditing = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setEditedTitle(event.target.value);
    },
    []
  );

  const handleTaskDescChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setTaskDescription(event.target.value);
    },
    []
  );

  const handleTaskDescEditing = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setEditedDescription(event.target.value);
    },
    []
  );

  const addTaskNotify = () => {
    toast("Task added successfully!");
  };

  const editTaskNotify = () => {
    toast("Task successfully edited!");
  };

  // Add Task dispatch function
  const handleAddTask = (event: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    // if Task title is empty or just whitespaces..show error message and return

    if (/^\s*$/.test(taskTitle)) {
      setTaskCreationError(true);
      return;
    }

    // if Task description is empty or just whitespaces..show error message and return
    if (/^\s*$/.test(taskDescription)) {
      setTaskCreationError(true);
      return;
    }

    const newTask = {
      id: uuidv4(),
      title: taskTitle,
      description: taskDescription,
    };

    dispatch(addTask({ userId, task: newTask }));
    setTaskCreationError(false);
    setTaskTitle("");
    setTaskDescription("");
    addTaskNotify();
  };

  //  Task editing dispatch function
  const handleEditTaskForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEditedTitle(editedTitle);
    setEditedDescription(editedDescription);

    dispatch(
      editTask({
        userId,
        taskId: taskid,
        updatedTaskTitle: editedTitle,
        updatedTaskDescription: editedDescription,
      })
    );

    // i want to delay this modal closing by 2seconds
    setModalIsOpen(false);
    //
    setAddingTask(null);
    setEditingTask(null);
    // editTaskNotify();
  };

  // Close add task modal
  const handleCloseModal = () => {
    setModalIsOpen(false);
    setAddingTask(null);
    setEditingTask(null);
    setTaskCreationError(null);
  };

  return (
    <div className={modalIsOpen ? "show" : "hidden"}>
      {(addingTask || editingTask) && (
        <div className="taskform-wrapper">
          <div className="taskform-wrapper-heading">
            <h3> {editingTask ? "Edit your task" : "Add new task"} </h3>
            <MdCancel
              size={28}
              className="modal-close-button"
              onClick={handleCloseModal}
            />
          </div>

          <form onSubmit={editingTask ? handleEditTaskForm : handleAddTask}>
            <input
              placeholder="Task title"
              name="taskTitle"
              value={editingTask ? editedTitle : taskTitle}
              type="text"
              className="name"
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={
                editingTask ? handleTaskTitleEditing : handleTaskTitleChange
              }
              ref={inputRef}
            />

            <input
              placeholder="Task description"
              type="text"
              name="taskDescription"
              value={editingTask ? editedDescription : taskDescription}
              className="password"
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={
                editingTask ? handleTaskDescEditing : handleTaskDescChange
              }
            />

            <button>{editingTask ? "Save Task" : "Add Task"}</button>
          </form>

          {taskCreationError && (
            <p className="task-error">
              Empty task title or description is not allowed!
            </p>
          )}
        </div>
      )}

      <ToastContainer position="top-center" autoClose={1000} />
    </div>
  );
};

export default TaskForm;
