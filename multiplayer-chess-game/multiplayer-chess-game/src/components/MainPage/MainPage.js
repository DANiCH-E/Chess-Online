import React, { useEffect, useState } from 'react'
import Header from '../Header/Header';
import Onboard from '../../onboard/onboard'
import './mainpage.css';
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
// import './table.css';
function MainPage() {
    const users = useSelector(state => state.cart.itemsUsers);
    const [items, setItems] = useState([]);
    const [userName, setUserName] = React.useState('')



    useEffect(() => {
        fetch(`http://127.0.0.1:8000/games/`)
            .then(res => res.json())
            .then(
                (result) => {
                    setItems(result);
                }
            )
    }, [])

    async function putBlackPlayer(idBlack) {
        const request = {
            // method: 'POST',
            method: 'HEAD',
            mode: 'no-cors',
            crossdomain: true,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Headers' : '*',
                'Accept': 'application/json',
                'Content-Type': 'application/json',

            },

        }
        const body= JSON.stringify({BlackPlayerID: users.pk, Status: "play"})
        const res = await axios.put(`http://127.0.0.1:8000/games/${idBlack}/` ,body, request)

        if (res.data.success){
            console.log(res.data.success)
            // authLinks()



        }
    }

    return (

        <div className='main'>
            <div>
                <Header/>
                <Onboard setUserName = {setUserName}/>
                <form action="/stat" >
                    <button className='main__stat'>Статистика</button>
                </form>

                <form action="/rules" >
                    <button className='main__rules'>Правила игры</button>
                </form>

            </div>



            {users.isAuthenticated ? (


                <table className='tabl_igr11'>
                    <thead>
                    <tr>
                        <th>Игра    Игрок</th>
                        {/* <th>Игрок</th> */}
                    </tr>
                    </thead>


                    {items.map(item => (
                        <div key={item.pk}>
                            {item.Status === "wait" && users.isAuthenticated ? (
                                <tbody>
                                <tr>
                                    <td><div>{item.Name}</div></td>
                                    <td><div>{item.WhitePlayerID}</div></td>
                                </tr>
                                </tbody>
                                // <form action={"/game/" + item.pk}>
                                //     <button onClick={() => {
                                //   putBlackPlayer(item.pk)

                                //   }}>Присоединиться</button></form>

                            ) : ("")}
                        </div>
                    ))}

                </table>
            ): ("")}

            {users.isAuthenticated ? (
                <table className='proverka'>
                    <tr>
                        <th className='proverka1'></th>

                    </tr>

                    {items.map(item => (
                        <div key={item.pk}>
                            {item.Status === "wait" && users.isAuthenticated ? (
                                <tr>
                                    <td className='proverka2'>

                                        <form action={"/game/" + item.pk}>
                                            <button className='connect' onClick={() => {
                                                putBlackPlayer(item.pk)

                                            }}>Присоединиться</button></form>
                                    </td>
                                </tr>
                            ) : ("")}
                        </div>
                    ))}


                </table>
            ): ("")}

            {/* {items.map(item => (
        <div key={item.pk}>
          {item.Status === "wait" && users.isAuthenticated ? (


            <form action={"/game/" + item.pk}>
                <button className='connect' onClick={() => {
              putBlackPlayer(item.pk)

              }}>Присоединиться</button></form>

          ) : ("")}
        </div>
      ))}       */}


        </div>

    )
}

export default MainPage;