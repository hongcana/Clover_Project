import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import LandingPage from './components/views/LandingPage/LandingPage';
import ChartPage from './components/views/ChartPage/ChartPage';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path='/' element={<LandingPage />} />
          <Route exact path='/chart' element={<ChartPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
