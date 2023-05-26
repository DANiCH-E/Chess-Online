import React, {useCallback, useEffect, useState} from "react";
import Cookies from 'js-cookie'
import {useSelector} from "react-redux";
import './Registration.css';

import {Link, useNavigate} from "react-router-dom";
import {checkAuthenticated} from "./checkAuthenticated";
import {Setauther, Setpk, Setusername} from "./redux/reducer1";
import axios from "axios";

export function Registration(){
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [item, setItems] = useState([]);
    const [username1, setUsername] = useState('');
    const [password1, setPassword] = useState('');
    const [email1, setEmail] = useState('');
    const [booktime, setTime] = useState([]);
    const navigate = useNavigate()

    useEffect(()=>{
        checkAuthenticated();
    },[]);

    const authLinks= useCallback(() => {
            navigate('/login');
        }, [navigate]
    )

    async function booking(){
        const request = {
            // method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
            // body: JSON.stringify({username: username1, password: password1})
        }
        const body= JSON.stringify({username: username1, password: password1})
        const res = await axios.post(`http://127.0.0.1:8000/api/register/`,body, request)
        // fetch("http://127.0.0.1:8000/api/register/", request);
        if (res.data.success){
            console.log(res.data.success)
            authLinks()

        }
    };


    return (
        <div className='back'>

            <div/>
            <div>

                <form className='container'>
                    <h1 className='reg'>Регистрация</h1>

                    {/*<CSRFToken/>*/}
                    <div>
                        <input type ="text" className="form-control1"
                               placeholder= "login"
                               onChange ={(event) => setUsername(event.target.value)}/>

                    </div>

                    <div>
                        <input type ="password" className="form-control2"
                               placeholder= "password"
                               onChange ={(event) => setPassword(event.target.value)}/>

                    </div>
                    <div>
                        <input type ="text" className="form-control3"
                               placeholder= "email"
                               onChange ={(event) => setEmail(event.target.value)}/>

                    </div>

                </form>
                <div>
                    <button className="btn btn-primary mt-10" onClick={booking} > <div className='zar'>ЗАРЕГИСТРИРОВАТЬСЯ</div></button>
                </div>



            </div>
        </div>
    );
}

export default Registration;