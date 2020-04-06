import React from 'react';
import DocList from '../../components/DocList';
import { Button } from 'antd';


const AdminDocsPage = (props) => {


    const toggleCreate = () => {
        const { history } = props;
        history.push('/admin/docs/create')
    }
    return (
        <div className="container page">
            <Button className="btn-outline-primary" onClick={toggleCreate}>Создать документ</Button>
            <DocList />
        </div>
    )
}

export default AdminDocsPage;