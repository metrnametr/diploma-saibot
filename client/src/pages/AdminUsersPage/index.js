import React from 'react';
import FormAddUser from '../../components/FormAddUser';
import UsersList from '../../components/UsersList';


const AdminUsersPage = () => {
    return (
        <div className="container">
            <FormAddUser />
            <UsersList />
        </div>
    )
}


export default AdminUsersPage;