import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import TaskComponent from "../../components/features/tasks/taskcomponent/TaskComponent";
import TaskForm from "../../components/taskform/TaskForm";
import "./userpage.css";

type EditTaskHandler = (taskId: string) => void;

const UserPage = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean | null>(null);
  const [addingTask, setAddingTask] = useState<boolean | null>(null);
  const [editingTask, setEditingTask] = useState<boolean | null>(null);

  const [editedTitle, setEditedTitle] = useState<string>("");
  const [editedDescription, setEditedDescription] = useState<string>("");
  const [taskid, setTaskid] = useState<string>("");

  const users = useSelector((state: RootState) => state.UserReducer.users);

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

  const tasks = useSelector(
    (state: RootState) => state.TaskReducer[userId] || []
  );

  const handleEditTask: EditTaskHandler = (taskId) => {
    // Setting the edit mode for the task with the given taskId
    setEditingTask(true);
    // You can use your existing state management or logic here

    // Retrieve the existing title and description of the task
    const task = tasks.find((task) => task.id === taskId);
    if (task) {
      const { title, description, id } = task;

      // Set the edited title and description in the component state
      setTaskid(id);
      setEditedTitle(title);
      setEditedDescription(description);
    }
  };

  return (
    <>
      <div className={modalIsOpen ? "overlay" : ""}> </div>
      <div className="user-task-container">
        <div className="user-intro">
          {" "}
          <h2>
            {" "}
            welcome{" "}
            <span className="loggedin-username">
              {" "}
              {loggedInUsername } <br />{" "}
            </span>
          </h2>
          <h3> Manage your tasks </h3>
        </div>
        <TaskComponent
          editedTitle={editedTitle}
          setEditedTitle={setEditedTitle}
          editedDescription={editedDescription}
          setEditedDescription={setEditedDescription}
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
          addingTask={addingTask}
          editingTask={editingTask}
          setAddingTask={setAddingTask}
          setEditingTask={setEditingTask}
          onEditTask={handleEditTask}
        />
        <div className="taskform-container">
          <TaskForm
            taskid={taskid}
            editedTitle={editedTitle}
            setEditedTitle={setEditedTitle}
            editedDescription={editedDescription}
            setEditedDescription={setEditedDescription}
            onEditTask={handleEditTask}
            modalIsOpen={modalIsOpen}
            setModalIsOpen={setModalIsOpen}
            addingTask={addingTask}
            editingTask={editingTask}
            setAddingTask={setAddingTask}
            setEditingTask={setEditingTask}
          />
        </div>
      </div>
    </>
  );
};

export default UserPage;
