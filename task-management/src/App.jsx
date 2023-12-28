import { useState } from "react";
import Content from "./components/Content";
import Header from "./components/Header";
const App = () => {
  const [boardAreaOpen, setboardAreaOpen] = useState(true);
  return (
    <>
      <Header
        boardAreaOpen={boardAreaOpen}
        setboardAreaOpen={setboardAreaOpen}
      />
      <Content />
    </>
  );
};
export default App;
