import React from 'react'
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import './Statistic.css';

import { useEffect, useState, setItems } from 'react'
import Header from '../Header/Header';
const Statistic = () => {
    const users = useSelector(state => state.cart.itemsUsers);
    const [items, setItems] = useState([]);
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/stat/?PlayerID=${users.pk}`)
            .then(res => res.json())
            .then(
                (result) => {
                    setItems(result);
                }
            )
    }, [])
    return (
        <div>
            <Header/>
            <div div className='fon1'>
                <button className='button_nazad'>
                    <div className='button_nazad1'>
                        <Link to={"/"}><div className='button_text'>НАЗАД</div></Link>
                    </div>
                </button>
                <div className='stat__title'>
                    <div className='stat_title'>Статистика</div>
                </div>

                <table className='tabl_stat'>
                    <tr>
                        <th className='stat_gr1'>Противник Результат</th>
                        {/* <th className='stat_gr2'></th>    */}
                    </tr>


                    {items.map(item => (
                        <div key={item.pk}>
                            {users.isAuthenticated ? (


                                <tr>
                                    <td className='tabl_stat11'>{item.BlackPlayerID}</td><td className='tabl_stat11'>{item.Result}</td>
                                </tr>

                            ) : ("")}
                        </div>
                    ))}
                </table>
            </div>

        </div>
    )
}

export default Statistic;