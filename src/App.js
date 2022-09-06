import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomeScreen from "./HomeScreen";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<HomeScreen />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
