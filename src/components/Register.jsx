import { useEffect, useRef, useState } from 'react'
import Input from '../subcomponents/Input'
import axios from '../api/axios';

const USER_REGEX = /^[A-z][A-z0-9-_\.]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = ({ inputText }) => {
    
    const submitRef = useRef();

    const [user, setUser] = useState('');
    const [validUser, setValidUser] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);

    const [area, setArea] = useState('');
    const [areas, setAreas] = useState([]);

    const handleRegister = async () => {
        try {
            const result = await axios.post('/users', {
                user: user,
                password: pwd,
                areaName: area
            });
            
            console.log(result.data);
            setUser('');
            setPwd('');
            setArea('');
        } catch (err) {
            console.error(err);
        }
    }

    const getAreas = async () => {
        const result = await axios.get('/areas');
        setAreas(result.data);
    }

    useEffect(() => {
        getAreas();
    }, [])
    

    useEffect(() => {
        setValidUser(USER_REGEX.test(user));
        setValidPwd(PWD_REGEX.test(pwd));
    }, [user, pwd]);

    useEffect(() => {
        if(!validUser || !validPwd || area === 'Seleccione un área') {
            submitRef.current.disabled = true;
        } else {
            submitRef.current.disabled = false;
        }
    }, [user, pwd, area]);

  return (
    <div className='form_container'>
        <form onSubmit={(e) => {
            e.preventDefault();
            handleRegister();
        }}>
            <Input
                pHolder='Usuario'
                text={inputText.userName}
                type='text'
                id='username'
                valid={validUser}
                content={user}
                setContent={setUser}
                icons={true}
            />
            <Input
                pHolder='Contraseña'
                text={inputText.pwd}
                type='password'
                id='password'
                valid={validPwd}
                content={pwd}
                setContent={setPwd}
                icons={true}
            />
            <div>
                <label htmlFor='area'>Area</label>
                <select id='area' value={area} onChange={(e) => setArea(e.target.value)} >
                    <option>Seleccione un área</option>
                    { areas?.length && areas.map(area => <option key={area._id} value={area.area_name}>{area.area_name}</option>)}
                </select>
            </div>
                <button ref={submitRef} className='btn-disabled'>
                    Registrar
                </button>
        </form>
    </div>
  )
}

export default Register
