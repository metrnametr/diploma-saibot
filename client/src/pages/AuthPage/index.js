import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { Form, Input, Button } from 'antd';
import './style.scss';


// error solved and showing messages

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState({});

    const onAuth = async (e) => {
        const res = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        const data = await res.json();
        const { message } = data;
        if (message === 'no such user found') {
            setError({
                type: 'email',
                message: 'Пользователь не существует'
            })
            return;
        }

        if (message === "passwords did not match") {
            setError({
                type: 'pssw',
                message: 'Неверный пароль'
            })
            return;
        }

        if (data.token) {
            localStorage.setItem('token', data.token)
        }

    }

    return (
        <Form onFinish={onAuth} className="auth-form">
            <div className="form-group">
                <label htmlFor="login">Email</label>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} id="login" className="form-control" placeholder="Введите email" />
            </div>
            <div className="form-group">
                <label htmlFor="password">Пароль</label>
                <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" className="form-control" placeholder="Введите пароль" />
            </div>
            <Button className="btn btn-outline-primary ml-auto d-block" htmlType="submit">Войти</Button>
        </Form>
    )
}

const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secondPassword, setSecondPassword] = useState('');
    const [error, setError] = useState({});

    const onAuth = async () => {
        if (password === secondPassword) {
            const res = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                    admin: true
                })
            });
            const data = await res.json();
            console.log(data)
        }
    }

    const disabled = !!(password && secondPassword) && (secondPassword === password);

    return (
        <Form onFinish={onAuth} className="w-100 auth-form">
            <div className="form-group">
                <label htmlFor="login">Email</label>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} id="login" className="form-control" placeholder="Введите email" />
            </div>
            <div className="form-group">
                <label htmlFor="password">Пароль</label>
                <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" className="form-control" placeholder="Введите пароль" />
            </div>
            <div className="form-group">
                <label htmlFor="password">Повторите пароль</label>
                <Input value={secondPassword} onChange={(e) => setSecondPassword(e.target.value)} type="password" id="password" className="form-control" placeholder="Повторите пароль" />
            </div>
            <Button disabled={!disabled} className="btn btn-outline-primary ml-auto d-block" htmlType="submit">Создать профиль</Button>
        </Form>
    )
}

const AuthPage = ({ match }) => {
    const [activeButton, setActiveButton] = useState(false)
    const { path } = match;
    const login = path === '/login';

    return (
        <div className="container form-container">
            <div className="row page">
                <div className="col-md-6 offset-md-3 col-xs-12">
                    <h1 className="text-center">{login ? "Форма авторизации" : "Форма регистрации"}</h1>
                    <p className="text-center">
                        <Link to={login ? "/register" : 'login'}>{login ? "Зарегестрироваться" : "Войти"}</Link>
                    </p>
                    {login ? <LoginForm /> : <RegisterForm />}
                </div>
            </div>
        </div>
    )
}


export default AuthPage;