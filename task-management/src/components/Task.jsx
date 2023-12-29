import { useState } from "react";
import { useSelector } from "react-redux";

const Task = ({ taskIndex, colIndex, color }) => {
  const display = useSelector((state) => state.dashboard);
  const board = display.find((board) => board.isActive === true);
  const columns = board.columns;
  const col = columns.find((col, i) => i === colIndex);
  const task = col.tasks.find((task, i) => i === taskIndex);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  return (
    <>
      <div className=" w-[280px] first:my-5 rounded-lg  bg-white  dark:bg-[#2b2c37] shadow-[#364e7e1a] py-6 px-3 shadow-lg hover:text-[#635fc7] dark:text-white dark:hover:text-[#635fc7] cursor-pointer gap-5 my-2">
        {" "}
        <p className=" font-bold tracking-wide ">{task.title} </p>
        <div className={`flex justify-between mt-2 px-4`}>
          <p>Start Date</p>
          <p>End Date</p>
        </div>
        <div className={`flex justify-between mt-2 `}>
          <p
            className={`${color} py-0 px-4 rounded-full text-black text-lg font-semibold`}
          >
            {task.startingDate}
          </p>
          <p
            className={`${color} py-0 px-4 rounded-full text-black text-lg font-semibold`}
          >
            {task.finishDate}
          </p>
        </div>
      </div>
    </>
  );
};
export default Task;
