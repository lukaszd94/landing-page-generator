import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.scss';
import Generator from './components/generator/generator';
import Navbar from './components/navbar/navbar';
import PageComponents from './components/page-components/page-components';
// import { useState } from 'react';

function App() {
  //const [count, setCount] = useState(0);

  // function onClick() {
  //   setCount(count + 1);
  // }

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div className="App-content">
          <Routes>
            <Route path="/" element={<Generator />} />
            <Route path="/generator" element={<Generator />} />
            <Route path="/page-components" element={<PageComponents />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
