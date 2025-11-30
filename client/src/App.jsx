import { BrowserRouter } from "react-router";
import "./App.scss";
import Content from "./components/Content/Content";
import Header from "./components/Header/Header";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="app-container">
          <Header />
          <Content />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
