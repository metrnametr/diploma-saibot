import React from 'react';
import { Select, Input, Form, Button } from 'antd';

import './style.scss';

const { Option } = Select;


const FormAddUser = () => {
    return (
        <div className="page">
            <h3 className="text-right">Создать пользователя</h3>
            <Form>
                <Form.Item
                    className="add-user-input"
                    label="Email"
                    name="email"
                    rules={[
                    {
                        required: true,
                        message: 'Введите email',
                    },
                    ]}
                >
                    <Input size="large" placeholder="Введите email" />
                </Form.Item>
                <div className="form-group">
                    <Select
                        size="large"
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="Выберите доступные документы"
                    >
                        <Option>Small select</Option>
                        <Option>Small select</Option>
                    </Select>
                </div>
                <Button size="large" type="submit" >Создать</Button>
            </Form>
        </div>
    )
}



export default FormAddUser;