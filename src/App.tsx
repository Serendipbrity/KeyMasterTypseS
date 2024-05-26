import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import NavBar from './components/NavBar';
import Home from './components/Home'; 
import PlayPresetGame from './components/PlayPresetGame'; 
import Build from './components/Build'; 
import PlayBuiltGame from './components/PlayBuiltGame'; 


function App() {
  useEffect(() => {
    // Function to remove the unwanted localStorage item
    const removeUnwantedLocalStorageItem = () => {
      localStorage.removeItem('debug');
    };

    // Call the function on component mount
    removeUnwantedLocalStorageItem();
  }, []);
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/KeyMasterTypseS" element={<Home />} />
        <Route path="/KeyMasterTypseS/play-preset-game" element={<PlayPresetGame />} />
        <Route path="/KeyMasterTypseS/build" element={<Build />} />
        <Route path="/KeyMasterTypseS/play-built-game" element={<PlayBuiltGame />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
