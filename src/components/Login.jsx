import { useEffect, useState } from 'react'
import Input from '../subcomponents/Input'
import axios from '../api/axios';
import useUser from '../hooks/useUser';
import { useNavigate } from 'react-router-dom';
import { useLogged } from '../hooks/useLogged';

const Login = ({ inputText }) => {

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const { auth, setAuth } = useUser();
    const navigate = useNavigate();
    const userLogged = useLogged();

    const handleLogin = async () => {
        try {
            const result = await axios.post('/login', {
                user,
                password: pwd
            });

            console.log(result);
            let data = {
                areaName: result.data.user.areaName,
                connected: true,
                user: result.data.user.user,
                id: result.data.user._id
            }

            setAuth(data); // setting the user data to the context
            window.localStorage.setItem('user', JSON.stringify(data)); //setting the user data to the local storage

            // cleans the inputs states
            setUser('');
            setPwd('');
            
            navigate('/ticket-list-controller') // redirectin
        }
        catch(err) {
            if(!err?.response) {
                setErrMsg('Sin respuesta del servidor');
            } else if(err.response.status === 400) {
                setErrMsg('Usuario y Contraseña requeridos');
            } else if(err.response.status === 204) {
                setErrMsg('El usuario no existe');
            } else if(err.response.status === 401) {
                setErrMsg('Usuario o contraseña incorrecta');
            } else {
                setErrMsg('Fallo del servidor');
            }
        }
    }

    useEffect(() => {
        userLogged();
    }, [])

  return (
    <div className='form_container'>
        <form onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
        }}>
        { errMsg?.length ? <h4>{errMsg}</h4> : null }
            <Input
                pHolder='Usuario'
                text='Usuario'
                type='text'
                id='username'
                content={user}
                setContent={setUser}
            />

            <Input
                pHolder='Contraseña'
                text='Contraseña'
                type='password'
                id='password'
                content={pwd}
                setContent={setPwd}
            />

            <button>
                Login
            </button>
        </form>
    </div>
  )
}

export default Login
