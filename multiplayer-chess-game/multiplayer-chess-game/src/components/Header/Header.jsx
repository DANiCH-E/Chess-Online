import React from 'react'
import './header.css';
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";



const Header = () => {
    const users = useSelector(state => state.cart.itemsUsers);
    return (
        <div className='header'>
            <div className='logo'>
                <div className='logotip'></div>

                <Link to={"/"} className='glavnaya'>Главная</Link>

                <Link to={"/rules"} className='pravila'>Правила игры</Link>

                {users.isAuthenticated ? (
                    users.username,
                        <Link to={"/stat"} className='stat'>Статистика</Link>
                ) : " "}


            </div>
            {users.isAuthenticated ? (
                <div className='logotip11'></div>
            ) :     <Link to={"/register"} className='header__reg'>Регистрация</Link>}

            <button className='header__auth'><Link to={"/login"}>Войти</Link></button>
            {/* <Link to={"/register"} className='header__reg'>Регистрация</Link> */}
        </div>
    )
}

export default Header