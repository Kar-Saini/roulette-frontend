import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admin from "./components/Admin";
import Landing from "./components/Landing";
import { Toaster } from "react-hot-toast";
const App = () => {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
