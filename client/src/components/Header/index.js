import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { AuthContext } from '../../index';
import ProtNavLink from '../ProtNavLink';
import { Affix } from 'antd';


const AdminLinks = () =>{
    return (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <ProtNavLink to="/admin">Профиль</ProtNavLink>
            </li>
            <li className="nav-item">
                <ProtNavLink to="/admin/docs">Документы</ProtNavLink>
            </li>
            <li className="nav-item">
                <ProtNavLink to="/admin/users">Пользователи</ProtNavLink>
            </li>
            <li className="nav-item">
                <ProtNavLink to="/">Выйти</ProtNavLink>
            </li>
        </ul>
    )
}

const UserLinks = () => {
    return (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <ProtNavLink to="/profile">Профиль</ProtNavLink>
            </li>
            {/* <li className="nav-item">
                <ProtNavLink to="/docs">Документы</ProtNavLink>
            </li> */}
            <li className="nav-item">
                <ProtNavLink to="/">Выйти</ProtNavLink>
            </li>
        </ul>
    )
}

const UnLogUser = () => {
    return (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <NavLink exact className="nav-link" to="/">Главная страница</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/login">Войти</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/register">Регистрация</NavLink>
            </li>
        </ul>
    )
}

const Header = () => {
    const auth = useContext(AuthContext);
    return (
        <Affix>
        <div className="wrapper bg-light ">
            <div className="container">
                <nav className="navbar navbar-light navbar-expand-lg">
                    <Link to="/" className="navbar-brand">Brand</Link>

                    {
                        auth ? <AdminLinks /> : <UnLogUser />
                    }
                </nav>
            </div>
        </div>
        </Affix>
    )
}

export default Header