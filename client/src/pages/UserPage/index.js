import React from 'react';
import DocList from '../../components/DocList';
import UserInfo from '../../components/UserInfo';


const UserPage = () => {
    return (
        <div className="container">
            <UserInfo />
            <DocList />
        </div>
    )
}

export default UserPage;