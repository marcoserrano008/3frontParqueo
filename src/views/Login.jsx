import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider';
import axiosClient from '../axios-client';
import { Button } from "../../components/ui/button"
export default function Login() {

    const emailRef = useRef();
    const passwordRef = useRef();
    const { setUser, setToken } = useStateContext()
    const [errors, setErrors] = useState(null);

    const onSubmit = (e) => {
        e.preventDefault()
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
        setErrors(null)
        axiosClient.post('/login', payload)
            .then(({ data }) => {
                setUser(data.user)
                setToken(data.token)
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    if(response.data.errors){
                        setErrors(response.data.errors);
                    }else{
                        setErrors({
                            email: [response.data.message]
                        })
                    }                    
                }
            })
    }
    return (
        <div className='login-signup-form animated fadeInDown'>
            <div className='form'>
                <form onSubmit={onSubmit}>
                    <div className='text-center text-2xl font-bold text-slate-700 mb-5'>
                    Iniciar Sesión
                    </div>
                        
                    
                    {errors && <div className="alert">
                {Object.keys(errors).map(key => (
                    <p key={key}>{errors[key][0]}</p>
                ))}
                </div>}
                    <input ref={emailRef} type='email' placeholder='Email' />
                    <input ref={passwordRef} type='password' placeholder='Password' />
                    <div className='flex justify-center content-center'>
                    <Button className=' w-[220px] h-[50px] text-xl'>Login</Button>
                    </div>
                   
                    <p className='message'>
                        ¿No estas registrado? <Link to="/signup">Registrate</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}
