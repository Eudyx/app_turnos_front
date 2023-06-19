import './App.css'
import io from 'socket.io-client';
import ShiftForm from './components/shiftForm';
import { Routes, Route } from 'react-router-dom';
import SelectSection from './components/SelectSection';
import ShiftTable from './components/ShiftTable';

const socket = io("http://localhost:3000/");

function App() {
  return (
    <main>
      <Routes>
        <Route path='/' element={<SelectSection />} />
        <Route path='shiftForm' element={<ShiftForm socket={socket} />} />
        <Route path='shiftTable' element={<ShiftTable socket={socket} />} />
      </Routes>
    </main>
  )
}

export default App
