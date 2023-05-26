import React from 'react';
import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom';
import JoinRoom from './onboard/joinroom'
import { ColorContext } from './context/colorcontext'
import Onboard from './onboard/onboard'
import JoinGame from './onboard/joingame'
import ChessGame from './chess/ui/chessgame'

import MainPage from "./components/MainPage/MainPage";
import Header from "./components/Header/Header";
import Board from "./chess/assets/Board.jpg";
import SearchOp from "./components/SearchOp/SearchOp";
import Rules from "./components/Rules/Rules";

import Registration from "./Registration";
import Auth from "./auth";
import {Provider} from "react-redux";
import {store} from "./redux";
import Statistic from './components/Statistic/Statistic';
import Win from './components/Win/Win';
import Draw from './components/Draw/Draw';
import Fail from './components/Fail/Fail';


/*
 *  Frontend flow:
 *
 * 1. user first opens this app in the browser.
 * 2. a screen appears asking the user to send their friend their game URL to start the game.
 * 3. the user sends their friend their game URL
 * 4. the user clicks the 'start' button and waits for the other player to join.
 * 5. As soon as the other player joins, the game starts.
 *
 *
 * Other player flow:
 * 1. user gets the link sent by their friend
 * 2. user clicks on the link and it redirects to their game. If the 'host' has not yet
 *    clicked the 'start' button yet, the user will wait for when the host clicks the start button.
 *    If the host decides to leave before they click on the "start" button, the user will be notified
 *    that the host has ended the session.
 * 3. Once the host clicks the start button or the start button was already clicked on
 *    before, that's when the game starts.
 * Onboarding screen =====> Game start.
 *
 * Every time a user opens our site from the '/' path, a new game instance is automatically created
 * on the back-end. We should generate the uuid on the frontend, send the request with the uuid
 * as a part of the body of the request. If any player leaves, then the other player wins automatically.
 *
 */


function App() {

    const [didRedirect, setDidRedirect] = React.useState(false)

    const playerDidRedirect = React.useCallback(() => {
        setDidRedirect(true)
    }, [])

    const playerDidNotRedirect = React.useCallback(() => {
        setDidRedirect(false)
    }, [])

    const [userName, setUserName] = React.useState('')

    return (
        <ColorContext.Provider value = {{didRedirect: didRedirect, playerDidRedirect: playerDidRedirect, playerDidNotRedirect: playerDidNotRedirect}}>
            <div className='main'>
                <Provider store={store}>
                    <BrowserRouter>

                        {/*<button className='main__stat'>Статистика</button>*/}
                        {/*<form action="/rules" >*/}
                        {/*  <button className='main__rules'>Правила игры</button>*/}
                        {/*</form>*/}

                        <Routes>


                            <Route path = "/game/:gameid" element=
                                {didRedirect ?
                                    <React.Fragment>
                                        <JoinGame userName = {userName} isCreator = {true} />
                                        <ChessGame myUserName = {userName} />
                                    </React.Fragment>
                                    :
                                    <JoinRoom />}
                            />

                            <Route path='/' element = {<MainPage/>}/>
                            <Route path='/search' element={<SearchOp/>}/>
                            <Route path="/rules" element={<Rules/>}/>
                            <Route path ="/register" element={<Registration/>}/>
                            <Route path ="/login" element={<Auth/>}/>
                            <Route path ="/stat" element={<Statistic/>}/>
                            <Route path ="/fail" element={<Fail/>}/>
                            <Route path ="/draw" element={<Draw/>}/>
                            <Route path ="/win" element={<Win/>}/>
                            <Navigate to = "/" />
                        </Routes>
                    </BrowserRouter>
                </Provider>

            </div>

        </ColorContext.Provider>);
}

export default App;