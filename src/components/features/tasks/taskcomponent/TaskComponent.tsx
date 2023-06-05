import React, { SetStateAction, FC, Dispatch, useState } from "react";
import { RootState } from "../../../../store";
import { useSelector } from "react-redux";
import { Task } from "../TasksSlice";
import "./task.css";
import TaskItem from "../taskitem/TaskItem";

type EditTaskHandler = (taskId: string) => void;

interface UserPageProps {
  modalIsOpen: boolean | null;
  setModalIsOpen: Dispatch<SetStateAction<boolean | null>>;
  addingTask: boolean | null;
  editingTask: boolean | null;
  setAddingTask: React.Dispatch<React.SetStateAction<boolean | null>>;
  setEditingTask: React.Dispatch<React.SetStateAction<boolean | null>>;
  onEditTask: EditTaskHandler;
  editedTitle: string;
  editedDescription: string;
  setEditedTitle: React.Dispatch<React.SetStateAction<string>>;
  setEditedDescription: React.Dispatch<React.SetStateAction<string>>;
}

interface User {
  id: number;
  username: string | null;
  password: string | null;
}

const TaskComponent: FC<UserPageProps> = ({
  editedTitle,
  editedDescription,
  setEditedTitle,
  setEditedDescription,
  onEditTask,
  modalIsOpen,
  setModalIsOpen,
  addingTask,
  editingTask,
  setAddingTask,
  setEditingTask,
}) => {
  const users = useSelector((state: RootState) => state.UserReducer.users);

  const [showCategoryOptions, setShowCategoryOptions] = useState<
    boolean | null
  >(null);
  const [categoryList, setCategoryList] = useState<string[]>([
    "all",
    "completed",
    "ongoing",
  ]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const setSelectedItemFromList = (index: number): void => {
    setSelectedCategory(categoryList[index]);
  };

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

  const allTasks = useSelector(
    (state: RootState) => state.TaskReducer[userId] || []
  );

  const completedTasks = useSelector(
    (state: RootState) => state.CategoryReducer.completedTasks[userId] || []
  );


  let ongoingTasks = [...allTasks];

  if (completedTasks.length > 0) {
    ongoingTasks = allTasks.filter((task) => !completedTasks.includes(task));
  }

  const handleAddingTask = () => {
    setModalIsOpen(true);
    setAddingTask(true);
    setEditingTask(false);
  };
  // const tasks = useSelector((state: RootState) => state?.TaskReducer[userId]);
  console.log(allTasks);
  console.log(completedTasks);
  console.log(ongoingTasks);

  const setCategoriesFunc = (index: number) => {
    setSelectedItemFromList(index);
    setShowCategoryOptions(false);
  };

  const tasksToRender =
    selectedCategory === "all"
      ? allTasks
      : selectedCategory === "completed"
      ? completedTasks
      : ongoingTasks;

  return (
    <div className="task-wrapper">
      <div className="task-main-container">
        <div className="task-heading">
          {selectedCategory === "all" && (
            <>
              {allTasks.length === 0 && (
                <h3 className="tasks-number">No tasks yet</h3>
              )}
              {allTasks.length === 1 && (
                <h3 className="tasks-number">{allTasks.length} task</h3>
              )}
              {allTasks.length > 1 && (
                <h3 className="tasks-number"> {selectedCategory} {" "} {allTasks.length} tasks</h3>
              )}
            </>
          )}

          {selectedCategory === "completed" && (
            <>
              {completedTasks.length === 0 && (
                <h3 className="tasks-number">
                  No {selectedCategory} tasks yet
                </h3>
              )}
              {completedTasks.length === 1 && (
                <h3 className="tasks-number">
                  {completedTasks.length} {selectedCategory} task
                </h3>
              )}
              {completedTasks.length > 1 && (
                <h3 className="tasks-number">
                  {completedTasks.length} {selectedCategory} tasks
                </h3>
              )}
            </>
          )}

          {selectedCategory === "ongoing" && (
            <>
              {ongoingTasks.length === 0 && (
                <h3 className="tasks-number">
                  No {selectedCategory} tasks yet
                </h3>
              )}

              {ongoingTasks.length === 1 && (
                <h3 className="tasks-number">
                  {ongoingTasks.length} {selectedCategory} task
                </h3>
              )}

              {ongoingTasks.length > 1 && (
                <h3 className="tasks-number">
                  {ongoingTasks.length} {selectedCategory} tasks
                </h3>
              )}
            </>
          )}
{/* 
          <div className="task-category">
            {selectedCategory === "all" ? <h3> {selectedCategory} </h3> : null}
          </div> */}

          <div className="categories-wrapper">
            <h3
              onClick={() => setShowCategoryOptions(true)}
              className="task-sort-category"
            >
              {" "}
              Sort By Category
            </h3>

            {showCategoryOptions ? (
              <span
                className="category-modal"
                // onBlur={() => setShowCategoryOptions(false)}
                onBlurCapture={() => setShowCategoryOptions(false)}
              >
                <ul>
                  {categoryList.map((item: string, index: number) => (
                    <li key={index} onClick={() => setCategoriesFunc(index)}>
                      {item}
                    </li>
                  ))}
                </ul>
              </span>
            ) : null}
          </div>
        </div>

        <div className="tasks">
          {tasksToRender.map((task) => (
            <TaskItem
              key={task.id}
              editedTitle={editedTitle}
              setEditedTitle={setEditedTitle}
              editedDescription={editedDescription}
              setEditedDescription={setEditedDescription}
              task={task}
              addingTask={addingTask}
              editingTask={editingTask}
              setAddingTask={setAddingTask}
              setEditingTask={setEditingTask}
              modalIsOpen={modalIsOpen}
              setModalIsOpen={setModalIsOpen}
              onEditTask={onEditTask}
              selectedCategory={selectedCategory}
              ongoingTasks = {ongoingTasks}
            />
          ))}
        </div>

        <div className="add-task" onClick={() => handleAddingTask()}>
          <h4>Add Task</h4>
        </div>
      </div>
    </div>
  );
};

export default TaskComponent;
