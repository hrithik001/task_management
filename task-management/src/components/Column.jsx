import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Task from "./Task";

const Column = ({ colIndex }) => {
  const colors = [
    "bg-blue-700",
    "bg-purple-500",
    "bg-blue-400",
    "bg-green-500",
  ];
  const dispatch = useDispatch();

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
        <Task key={index} taskIndex={index} colIndex={colIndex} />
      ))}
    </div>
  );
};
export default Column;
