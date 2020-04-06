import React, { useState, useEffect } from 'react';
import { Pagination, List, Avatar, Input,  } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import './style.scss';

const users = [
    {
        id: '1',
        email: 'email@mail.com',
        avatar: null,
        active: true,
        deleted: false
    },
    {
        id: '2',
        email: 'i-dont-know-anything@gmail.com',
        avatar: null,
        active: false,
        deleted: false
    }
]


const UsersList = () => {
    const [searchBy, setSearchBy] = useState('');
    const [sortBy, setSortBy] = useState([]);
    const [fetchUsers, setUsers] = useState(users);
    const [sortedUser, setSortedUser] = useState(users);

    const toggleSort = (option) => {
        if (sortBy.some(it => it === option)) {
            setSortBy(sortBy.filter(it => it !== option));
            return;
        }
        setSortBy([ ...sortBy, option ])
    }

    const toggleSearch = (e) => {
        const { target: { value } } = e;
        setSearchBy(value);
    }

    useEffect(() => {
        sortBy.forEach(it => {
            let sortArray = [...sortedUser];
            if (it === 'email') {
                setSortedUser(
                    sortArray.sort((userA, userB) => userA[it] > userB[it] ? 1 : (userA[it] < userB[it]  ? -1 : 0) )
                )
            }
            else {
                setSortedUser(
                    sortArray.sort((userA, userB) => userA[it] - userB[it])
                )
            }
        })
        if (!sortBy.length && !searchBy) setSortedUser(fetchUsers)
    }, [sortBy])

    
    useEffect(() => {
        setSortedUser(
            fetchUsers.filter(user => user.email.match(searchBy))
        )
        if (!searchBy) setSortedUser(fetchUsers)
    }, [searchBy])


    return (
        <div className="users-list">
            <div className="sort-control">
                <div>
                    <span className="sort-by">Фильтровать по:</span>
                    <div className="btn-group">
                        <button
                            className={`btn btn-outline-info ${sortBy.some(it => it === 'active') && 'active'}`}
                            onClick={() => toggleSort('active')}
                        >Active</button>
                        <button
                            className={`btn btn-outline-info ${sortBy.some(it => it === 'email') && 'active'}`}
                            onClick={() => toggleSort('email')}
                        >Email</button>
                        <button
                            className={`btn btn-outline-info ${sortBy.some(it => it === 'deleted') && 'active'}`}
                            onClick={() => toggleSort('deleted')}
                        >Deleted</button>
                    </div>
                </div>
                <div className="search-control">
                    <Input onChange={toggleSearch} size="large" placeholder="Поиск по email" style={{ width: '350px' }} />
                </div>
            </div>
            <List
                itemLayout="horizontal"
                dataSource={sortedUser}
                renderItem={({ avatar, email, active, id}) => (
                <List.Item
                    className={`list-item-user ${active && 'success'}`}
                    actions={[
                        <SettingOutlined style={{ fontSize: '18px' }} />
                    ]}
                >
                    <List.Item.Meta
                        avatar={<Avatar src={avatar ? avatar : 'https://onlinebrest.by/images/no_user.png'} />}
                        title={<Link to={`/admin/users/${id}`}>{email}</Link>}
                        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                    />
                </List.Item>
                )}
            />
            <Pagination className="mt-5" defaultCurrent={1} total={50} />
        </div>
    )
}


export default UsersList;