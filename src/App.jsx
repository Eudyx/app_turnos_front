import './App.css'
import './styles/styles.css'
import io from 'socket.io-client';
import { Routes, Route } from 'react-router-dom';
import SelectSection from './components/SelectSection';
import ShiftTable from './components/ShiftTable';
import Register from './components/Register';
import Login from './components/Login';
import CreateShift from './components/CreateShift';
import Clients from './components/Clients';
import Admin from './components/Admin';
import TicketListController from './components/TicketListController';
import LayOut from './layout/LayOut';
import RequireAuth from './components/RequireAuth';

const socket = io("http://localhost:3000/");

function App() {

  const inputText = Object.freeze({
    userName: 'Usuario',
    pwd: 'Contraseña'
  });

  return (
    <main>
      <Routes>
        <Route path='/' element={<LayOut />} >
          <Route path='/' element={<SelectSection />} />
          <Route path='clients' element={<Clients />} />
          <Route path='admin' element={<Admin />} />
          <Route path='create-shift' element={<CreateShift socket={socket} />} />
          <Route path='shiftTable' element={<ShiftTable socket={socket} />} />
          <Route path='register' element={<Register inputText={inputText} />} />
          <Route path='login' element={<Login inputText={inputText} />} />

          <Route element={<RequireAuth />}>
            <Route path='ticket-list-controller' element={<TicketListController socket={socket} />} />
          </Route>
        </Route>
      </Routes>
    </main>
  )
}

export default App
