import { Routes, Route } from "react-router-dom";
import Header from "./components/commons/header";
import Home from "./page/Home";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
