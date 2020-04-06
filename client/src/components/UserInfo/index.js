import React from 'react';

import './style.scss';
import { Button } from 'antd';

const UserInfo = ({ active = false }) => {
    return (
        <div className="row user-info page">
            <div className="col-lg-3 avatar-container">
                <img src='https://onlinebrest.by/images/no_user.png' />
            </div>
            <div className="col-lg-7 info-container">
                <p className="user-email">Email: i-dont-know-anythink@email.com</p>
                <p>Статус: <span className={`user-status ${active && 'active'}`}>{active ? 'Активный' : 'Не активный'}</span></p>
                <p>Описание:</p>
                <p className="user-description">lorem lorem loremloremloremloremloremloremloremloremloremloremlorem lorem lorem</p>
            </div>
            <div className="col-lg-2 control-container">
                {
                    active ?
                    <Button className="btn-outline-warning">Деактивировать</Button>
                    :
                    <Button className="btn-outline-success">Активировать</Button>
                }
                <Button className="btn-outline-danger">Удалить</Button>
            </div>
        </div>
    )
}

export default UserInfo;