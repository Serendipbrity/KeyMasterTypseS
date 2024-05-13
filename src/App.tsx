import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Header from './components/Header';
import Home from './components/Home'; 
import Preset from './components/Preset'; 
import Build from './components/Build'; 
import Game from './components/Game'; 


function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Header />
      <Routes>
        <Route path="/KeyMasterTypseS" element={<Home />} />
        <Route path="/KeyMasterTypseS/preset" element={<Preset />} />
        <Route path="/KeyMasterTypseS/build" element={<Build />} />
        <Route path="/KeyMasterTypseS/game" element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
