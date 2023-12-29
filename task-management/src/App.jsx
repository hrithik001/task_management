import { useState } from "react";
import Content from "./components/Content";
import Header from "./components/Header";
import { useDispatch, useSelector } from "react-redux";
import displayBoardSlice from "./Redux/displayBoardSlice";
const App = () => {
  const dispatch = useDispatch();
  const display = useSelector((state) => state.dashboard);
  const activeBoard = display.find((board) => board.isActive);
  if (!activeBoard && display.length > 0) {
    dispatch(displayBoardSlice.actions.setBoardActive({ index: 0 }));
  }

  const [boardAreaOpen, setboardAreaOpen] = useState(true);
  return (
    <>
      <Header
        boardAreaOpen={boardAreaOpen}
        setboardAreaOpen={setboardAreaOpen}
      />

      <Content
        boardAreaOpen={boardAreaOpen}
        setboardAreaOpen={setboardAreaOpen}
      />
    </>
  );
};
export default App;
