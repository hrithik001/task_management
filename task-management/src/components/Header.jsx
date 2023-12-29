import { useState } from "react";
import logo from "../assets/logo.svg";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import DropDown from "./DropDown";
import AddEditBoardArea from "../functions/AddEditBoardArea";
import { useSelector } from "react-redux";
import AddEditTaskArea from "../functions/AddEditTaskArea";

const Header = ({ boardAreaOpen, setboardAreaOpen }) => {
  const [onDropDown, setDropDown] = useState(false);
  const [isOpenAddEditTask, setIsOpenAddEditTask] = useState(false);
  const display = useSelector((state) => state.dashboard);
  const currentActiveBoard = display.find((board) => board.isActive);
  // console.log(currentActiveBoard);

  return (
    <div className=" p-4 fixed left-0 bg-white dark:bg-[#2b2c37]  right-0 ">
      <header className=" flex justify-between dark:text-white items-center  ">
        <div className=" flex items-center space-x-2  md:space-x-4">
          <img src={logo} alt=" Logo " className=" h-6 w-6" />
          <h3 className=" md:text-4xl  hidden md:inline-block font-bold  font-sans">
            Task Dashboard
          </h3>
          <div className=" flex items-center ">
            <h3 className=" truncate max-w-[200px] md:text-2xl text-xl font-bold md:ml-20 font-sans  ">
              {currentActiveBoard.name}
            </h3>
            <div
              onClick={() => {
                setDropDown((state) => !state);
                // setboardAreaOpen((state) => !state); // addedd
              }}
              className=" w-3 ml-2 cursor-pointer"
            >
              {onDropDown ? <RiArrowDropUpLine /> : <RiArrowDropDownLine />}
            </div>
          </div>
        </div>

        <div
          className="flex space-x-4 items-center md:space-x-6 cursor-pointer"
          onClick={() => setIsOpenAddEditTask((state) => !state)}
        >
          <button className="button">+ Add New Task</button>
        </div>
      </header>
      {onDropDown && (
        <DropDown
          setDropDown={setDropDown}
          setboardAreaOpen={setboardAreaOpen}
        />
      )}
      {/* {boardAreaOpen && (
        <AddEditBoardArea setboardAreaOpen={setboardAreaOpen} />
      )} */}
      {isOpenAddEditTask && (
        <AddEditTaskArea
          type="add"
          device="mobile"
          isOpenAddEditTask={isOpenAddEditTask}
          setIsOpenAddEditTask={setIsOpenAddEditTask}
        />
      )}
    </div>
  );
};

export default Header;
