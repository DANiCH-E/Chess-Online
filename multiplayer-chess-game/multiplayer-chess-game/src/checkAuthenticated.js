import axios from "axios";
import {Setauther} from "./redux/reducer1";


export const checkAuthenticated = () => async dispatch =>{
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type':'application/json',

        }
    };

    const res = await axios.get(`http://127.0.0.1:8000/authenticated`, config)
    console.log(res)

    // dispatch((Setauther(true)))

}