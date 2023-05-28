import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Component/Pages/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SpamDetector from './Component/SpamDetector';


function App() {
  return (
    <BrowserRouter>
         <ToastContainer
          position="top-center"
          />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/spamcheck" element={<SpamDetector />}/>
            <Route path="*" element={<Home />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
