import Events from './components/publicevents';
import Events2 from './components/privateevents';
import Hero from './components/hero';
import Login from './components/login';
import Register from './components/register';
import Navbar from './components/navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={[<Navbar />, <Hero />, <Events />]} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/events" element={<Events2 />} />
        </Routes>
      </Router>
  );
}

export default App;
