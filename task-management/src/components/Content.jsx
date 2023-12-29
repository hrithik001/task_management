import { useEffect, useState } from "react";
import Column from "./Column";

import { useSelector } from "react-redux";
import ProjectsList from "../components/ProjectsList";

const Content = ({ setboardAreaOpen, boardAreaOpen }) => {
  const [isSideBar, setSideBar] = useState(false);
  const display = useSelector((state) => state.dashboard);
  const board = display.find((bord) => bord.isActive === true);
  const taskColoumns = board.columns;
  // console.log(taskColoumns);

  const [windowSize, setwindowSize] = useState([
    window.innerHeight,
    window.innerWidth,
  ]);

  useEffect(() => {
    const windowSizeHandel = () => {
      setwindowSize([window.innerHeight, window.innerWidth]);
    };

    window.addEventListener("resize", windowSizeHandel);
    return () => {
      window.removeEventListener("resize", windowSizeHandel);
    };
  });
  return (
    <div
      className={
        windowSize[0] >= 768 && isSideBar
          ? " bg-[#f4f7fd]  scrollbar-hide h-screen flex dark:bg-[#20212c]  overflow-x-scroll gap-6  ml-[261px]"
          : "bg-[#f4f7fd]  scrollbar-hide h-screen flex    dark:bg-[#20212c] overflow-x-scroll gap-6 "
      }
    >
      {windowSize[0] >= 768 && (
        <ProjectsList isSideBar={isSideBar} setSideBar={setSideBar} />
      )}
      {taskColoumns.map((col, index) => (
        <Column key={index} colIndex={index} />
      ))}
    </div>
  );
};
export default Content;
