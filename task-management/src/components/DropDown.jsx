import { useDispatch, useSelector } from "react-redux";
import displayBoardSlice from "../Redux/displayBoardSlice";

import { GoProjectSymlink } from "react-icons/go";

const DropDown = ({ setDropDown, setboardAreaOpen }) => {
  const dashboard = useSelector((state) => state.dashboard);
  //   console.log(dashboard);
  const dispatch = useDispatch();
  return (
    <div
      className=" py-10 px-6 absolute  left-0 right-0 bottom-[-100vh] top-16 dropdown "
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setDropDown(false);

        // setboardAreaOpen(true);
      }}
    >
      <div className=" bg-white dark:bg-[#2b2c37] shadow-md shadow-[#364e7e1a]  w-full   py-4 rounded-xl">
        <h3 className=" dark:text-gray-300 text-gray-600 font-semibold mx-4 mb-8 ">
          ALL BOARDS ({dashboard?.length})
        </h3>

        <div className=" dropdown-borad  ">
          {dashboard.map((board, index) => (
            <div
              className={` flex items-baseline space-x-2 px-5 py-4  ${
                board.isActive &&
                " bg-[#635fc7] rounded-r-full text-white mr-8 "
              } `}
              key={index}
              onClick={() => {
                dispatch(displayBoardSlice.actions.setBoardActive({ index }));
              }}
            >
              <GoProjectSymlink />{" "}
              <p className=" text-lg font-bold  ">{board.name}</p>
            </div>
          ))}
          <div
            onClick={() => {
              setboardAreaOpen(true);
              setDropDown(false);
            }}
            className=" flex items-baseline space-x-2  text-[#635fc7] px-5 py-4  "
          >
            <GoProjectSymlink />
            <p className=" text-lg font-bold  cursor-pointer">
              Create New Board{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DropDown;
