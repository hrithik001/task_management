import React, { useState } from "react";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
// import { v4 as uuidv4 } from "uuid";
// import crossIcon from "../assets/icon-cross.svg";
import displayBoardSlice from "../Redux/displayBoardSlice";

function AddEditTaskArea({
  type,
  device,
  taskIndex,
  prevColIndex = 0,
  setIsOpenAddEditTask,
}) {
  const dispatch = useDispatch();

  const [isValid, setIsValid] = useState(true);
  const [title, setTitle] = useState("");

  const today = format(new Date(), "dd-mm-yyyy");
  const [startingDate, setStartingDate] = useState();
  const [finishDate, setFinishDate] = useState();

  const board = useSelector((state) => state.dashboard).find(
    (board) => board.isActive
  );

  const columns = board.columns;
  const col = columns.find((col, index) => index === prevColIndex);
  const task = col ? col.tasks.find((task, index) => index === taskIndex) : [];
  const [status, setStatus] = useState(columns[prevColIndex].name);
  const [newColIndex, setNewColIndex] = useState(prevColIndex);

  const onChangeStatus = (e) => {
    setStatus(e.target.value);
    setNewColIndex(e.target.selectedIndex);
  };

  const validate = () => {
    setIsValid(false);
    if (!title.trim()) {
      return false;
    }

    setIsValid(true);
    return true;
  };
  if (type === "edit" && isFirstLoad) {
    setTitle(task.title);
    setStartingDate(task.startingDate);
    setFinishDate(task.finishDate);
    setStatus(task.status);
    setIsFirstLoad(false);
  }

  const onSubmit = (type) => {
    if (type === "add") {
      dispatch(
        displayBoardSlice.actions.addTask({
          title,
          startingDate,
          finishDate,
          status,
          newColIndex,
        })
      );
    } else {
      dispatch(
        displayBoardSlice.actions.editTask({
          title,

          startingDate,
          finishDate,

          status,
          taskIndex,
          prevColIndex,
          newColIndex,
        })
      );
    }
    setStartingDate("");
    setFinishDate("");
    setTitle("");
    setIsValid(true);
  };

  return (
    <div
      className={
        device === "mobile"
          ? "  py-6 px-6 pb-40  absolute overflow-y-scroll  left-0 flex  right-0 bottom-[-100vh] top-0 dropdown "
          : "  py-6 px-6 pb-40  absolute overflow-y-scroll  left-0 flex  right-0 bottom-0 top-0 dropdown "
      }
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setIsOpenAddEditTask(false);
      }}
    >
      {/* Modal Section */}

      <div
        className=" scrollbar-hide overflow-y-scroll max-h-[95vh]  my-auto  bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold
       shadow-md shadow-[#364e7e1a] max-w-md mx-auto  w-full px-8  py-8 rounded-xl"
      >
        <h3 className=" text-lg ">
          {type === "edit" ? "Edit" : "Add New"} Task
        </h3>

        {/* Task Name */}

        <div className="mt-8 flex flex-col space-y-1">
          <label className="  text-sm dark:text-white text-gray-500">
            Task Name
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="task-name-input"
            type="text"
            className=" bg-transparent  px-4 py-2 outline-none focus:border-0 rounded-md text-sm  border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-1  ring-0  "
            placeholder=" e.g Take coffee break"
          />
          {title === "" && !isValid && (
            <p className="text-red-500 text-sm mt-1">Title is required.</p>
          )}
        </div>

        {/* Description */}
        <div
          className={`mt-8 flex ${
            device !== "mobile" ? "space-x-6" : "flex-col"
          } space-y-1`}
        >
          <div className="flex flex-col space-y-1">
            <label className="text-sm dark:text-white text-gray-500">
              Starting Date
            </label>
            <input
              value={startingDate}
              onChange={(e) => setStartingDate(e.target.value)}
              id="starting-date-input"
              type="date"
              className="bg-transparent px-4 py-2 outline-none focus:border-0 rounded-md text-sm border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-1 ring-0"
              placeholder="Select starting date"
            />
            {!startingDate && !isValid && (
              <p className="text-red-500 text-sm mt-1">
                Starting Date is required.
              </p>
            )}
          </div>

          <div className="flex flex-col space-y-1">
            <label className="text-sm dark:text-white text-gray-500">
              Finish Date
            </label>
            <input
              value={finishDate}
              onChange={(e) => setFinishDate(e.target.value)}
              id="finish-date-input"
              type="date"
              className="bg-transparent px-4 py-2 outline-none focus:border-0 rounded-md text-sm border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-1 ring-0"
              placeholder="Select finish date"
            />
            {!finishDate && !isValid && (
              <p className="text-red-500 text-sm mt-1">
                Finished Date is required.
              </p>
            )}
          </div>
        </div>
        {/* current state  */}
        <div className="mt-8 flex flex-col space-y-3">
          <label className="  text-sm dark:text-white text-gray-500">
            Current Status
          </label>
          <select
            value={status}
            onChange={onChangeStatus}
            className=" select-status flex-grow px-4 py-2 rounded-md text-sm bg-transparent focus:border-0  border-[1px] border-gray-300 focus:outline-[#635fc7] outline-none"
          >
            {columns.map((column, index) => (
              <option key={index}>{column.name}</option>
            ))}
          </select>
          <button
            onClick={() => {
              const isValid = validate();
              if (isValid) {
                onSubmit(type);
              }
            }}
            className=" w-full items-center text-white bg-[#635fc7] py-2 rounded-full "
          >
            {type === "edit" ? " save edit" : "Create task"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddEditTaskArea;
