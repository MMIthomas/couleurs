import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Discover from './pages/Discover/Discover';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/discover" element={<Discover />} />
    </Routes>
  );
}

export default App;
