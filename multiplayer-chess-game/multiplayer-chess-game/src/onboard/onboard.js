import React, {createContext, useRef, useState, useCallback, useEffect} from 'react'
import { Navigate } from 'react-router-dom'
import uuid from 'uuid/v4'
import { ColorContext } from '../context/colorcontext'
import '../components/MainPage/placeholder.css';
import {useSelector} from "react-redux";
import typingUserName from './joinroom.js';
import { useNavigate} from "react-router-dom";
import axios from "axios";
const socket  = require('../connection/socket').socket


const Onboard = (props) => {
    const color = React.useContext(ColorContext)

    return <CreateNewGame didRedirect = {color.playerDidRedirect} setUserName = {props.setUserName}/>
}
export default Onboard

function CreateNewGame(props){
    const [didGetUserName, setDidGetUserName] = useState(false);
    const [inputText, setInputText] = useState("");
    const [gameId, setGameId] = useState("");

    
    const users = useSelector(state => state.cart.itemsUsers);
    const navigate = useNavigate()
    const authLinks= useCallback(() => {
        navigate('/search');
        }, [navigate])
            
        async function postWhitePlayer(){
            
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
            
            const body= JSON.stringify({WhitePlayerID: users.pk, Status: "wait"})
            const res = await axios.post("http://127.0.0.1:8000/games/" ,body, request)
             
            if (res.data.success){
                console.log(res.data.success)
                authLinks()
                
            }
            
        };

        
    // constructor(props) {
    //     super(props);
    //     this.textArea = React.createRef();
    // }
    const inputRef = useRef(null);
    const [items, setItems] = useState([]);


    useEffect(() => {
        fetch(`http://127.0.0.1:8000/games/`)
            .then(res => res.json())
            .then(
                (result) => {
                    setItems(result);
                }
            )
    }, [])

    return (<React.Fragment>
        {

            // this.state.didGetUserName ?
            didGetUserName ?

                <Navigate to={"/game/" + gameId}>
                    <button className="btn btn-success"
                            style={{marginLeft: String((window.innerWidth / 2) - 60) + "px", width: "120px"}}>Start Game
                    </button>
                </Navigate>
                :
                <div>
                    <div className='back_ground'>
                        <div className='ph__text'>
                            World Chess Game
                        </div>
                    </div>

                    {items.map(item => (
                        <div key={item.pk}>
                            {users.isAuthenticated ? (
                                <div>
                                    <h1 style={{textAlign: "center", marginTop: String((window.innerHeight / 3)) + "px"}}>
                                        <button className="ph_button"
                                                onClick={() => {
                                                    // When the 'Submit' button gets pressed from the username screen,
                                                    // We should send a request to the server to create a new room with
                                                    // the uuid we generate here.

                                                    // this.props.didRedirect()
                                                    // this.props.setUserName(inputText)
                                                    // setStatus("wait");
                                                    // setWhiteID(users.pk)
                                                    // alert(whiteID)
                                                    // alert(status)

                                                    postWhitePlayer()
                                                    props.didRedirect()
                                                    const userName = item.WhitePlayerID;
                                                    props.setUserName(userName)
                                                    // this.setState({
                                                    //     didGetUserName: true
                                                    // })
                                                    setDidGetUserName(true);
                                                    // this.send()

                                                    const newGameRoomId = item.pk;
                                                    setGameId(newGameRoomId);


                                                    // emit an event to the server to create a new room
                                                    socket.emit('createNewGame', newGameRoomId)

                                                }}>Новая игра
                                        </button>
                                        <div>
                                        </div>
                                    </h1>
                                </div>
                            ) : ("")}
                        </div>
                    ))}

                </div>
        }
    </React.Fragment>)
}

/**
 * Onboard is where we create the game room.
 */

// class CreateNewGame extends React.Component {
//     state = {
//         didGetUserName: false,
//         inputText: "",
//         gameId: ""
//     }
//
//     constructor(props) {
//         super(props);
//         this.textArea = React.createRef();
//     }
//
//     send = () => {
//         /**
//          * This method should create a' new room in the /' namespace
//          * with a unique identifier.
//          */
//         const newGameRoomId = uuid()
//
//         // set the state of this component with the gameId so that we can
//         // redirect the user to that URL later.
//         this.setState({
//             gameId: newGameRoomId
//         })
//
//         // emit an event to the server to create a new room
//         socket.emit('createNewGame', newGameRoomId)
//     }
//
//     // typingUserName = () => {
//     //     // grab the input text from the field from the DOM
//     //     const typedText = this.textArea.current.value
//     //
//     //     // set the state with that text
//     //     this.setState({
//     //         inputText: typedText
//     //     })
//     // }
//
//     render() {
//         // !!! TODO: edit this later once you have bought your own domain.
//
//         return (<React.Fragment>
//             {
//                 this.state.didGetUserName ?
//
//                 <Navigate to = {"/game/" + this.state.gameId}><button className="btn btn-success" style = {{marginLeft: String((window.innerWidth / 2) - 60) + "px", width: "120px"}}>Start Game</button></Navigate>
//
//             :
//                <div>
//                    <div className='back_ground'>
//                        <div className='ph__text'>
//                            World Chess Game
//                        </div>
//
//                    </div>
//                     {/*<h1 style={{textAlign: "center", marginTop: String((window.innerHeight / 3)) + "px"}}>Your Username:</h1>*/}
//
//                     {/*<input style={{marginLeft: String((window.innerWidth / 2) - 120) + "px", width: "240px", marginTop: "62px"}}*/}
//                     {/*       ref = {this.textArea}*/}
//                     {/*       onInput = {this.typingUserName}></input>*/}
//                     <h1 style={{textAlign: "center", marginTop: String((window.innerHeight / 3)) + "px"}}>
//                     <button className="ph_button"
//                         // style = {{marginLeft: String((window.innerWidth / 2) - 60) + "px", width: "120px", marginTop: "62px"}}
//                         // disabled = {!(this.state.inputText.length > 0)}
//                         onClick = {() => {
//                             // When the 'Submit' button gets pressed from the username screen,
//                             // We should send a request to the server to create a new room with
//                             // the uuid we generate here.
//                            this.props.didRedirect()
//                             this.props.setUserName(this.state.inputText)
//                             this.setState({
//                                 didGetUserName: true
//                             })
//                             //this.send()
//                             const newGameRoomId = uuid()
//
//                             // set the state of this component with the gameId so that we can
//                             // redirect the user to that URL later.
//                             this.setState({
//                                 gameId: newGameRoomId
//                             })
//
//                             // emit an event to the server to create a new room
//                             socket.emit('createNewGame', newGameRoomId)
//                         }}>Новая игра</button></h1>
//                 </div>
//             }
//             </React.Fragment>)
//     }
// }
//
// const Onboard = (props) => {
//     const color = React.useContext(ColorContext)
//
//     return <CreateNewGame didRedirect = {color.playerDidRedirect} setUserName = {props.setUserName}/>
// }
//
//
// export default Onboard
