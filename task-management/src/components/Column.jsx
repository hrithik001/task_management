import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Task from "./Task";
import AddEditTaskArea from "../functions/AddEditTaskArea";

const Column = ({ colIndex }) => {
  const colors = [
    "bg-blue-200",
    "bg-purple-200",
    "bg-pink-200",
    "bg-green-200",
  ];
  const bgColor = ["blue"];
  const dispatch = useDispatch();
  const [isOpenAddEditTask, setIsOpenAddEditTask] = useState(false);

  const display = useSelector((state) => state.dashboard);
  const board = display.find((board) => board.isActive === true);
  const col = board.columns.find((col, index) => index === colIndex);

  return (
    <div className="scrollbar-hide   mx-5 pt-[90px] min-w-[280px] ">
      <p className=" font-semibold flex  items-center  gap-2 tracking-widest md:tracking-[.2em] text-[#828fa3]">
        <div className={`rounded-full w-4 h-4 ${colors[colIndex]} `} />
        {col.name} ({col.tasks.length})
      </p>

      {col.tasks.map((task, index) => (
        <Task
          key={index}
          taskIndex={index}
          colIndex={colIndex}
          color={colors[colIndex]}
        />
      ))}

      <div
        className="flex space-x-4 items-center md:space-x-6 cursor-pointer w-[280px]"
        onClick={() => setIsOpenAddEditTask((state) => !state)}
      >
        <button
          className={`${colors[colIndex]} py-2 px-4 rounded-full text-black text-lg font-semibold  w-[279px]`}
        >
          + Add New Task
        </button>
      </div>
      {isOpenAddEditTask && (
        <AddEditTaskArea
          type="add"
          device="mobile"
          isOpenAddEditTask={isOpenAddEditTask}
          prevColIndex={colIndex}
          setIsOpenAddEditTask={setIsOpenAddEditTask}
        />
      )}
    </div>
  );
};
export default Column;
