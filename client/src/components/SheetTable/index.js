import React from 'react';
import { Table, Input } from 'antd';

// const columns = [{
//     title: 'Name',
//     dataIndex: 'name',
//     key: 'name',
//     render: text => <a href="#">{text}</a>,
//   }, {
//     title: 'Age',
//     dataIndex: 'age',
//     key: 'age',
//   }, {
//     title: 'Address',
//     dataIndex: 'address',
//     key: 'address',
//     }, {
//         title: 'Action',
//         key: 'action',
//         render: (text, record) => (
//         <span>
//             <a href="#">Action 一 {record.name}</a>
//             <span className="ant-divider" />
//             <a href="#">Delete</a>
//             <span className="ant-divider" />
//             <a href="#" className="ant-dropdown-link">
//             More actions 
//             </a>
//         </span>
//         ),
//     }];


// const data = [{
//     key: '1',
//     name: 'John Brown',
//     age: 32,
//     address: 'New York No. 1 Lake Park',
//     }, {
//     key: '2',
//     name: 'Jim Green',
//     age: 42,
//     address: 'London No. 1 Lake Park',
//     }, {
//     key: '3',
//     name: 'Joe Black',
//     age: 32,
//     address: 'Sidney No. 1 Lake Park',
// }];

const SheetTable = ({ colCount, rowCount }) => {
    const columns = new Array(colCount).fill('').map((_, id) => ({ 
        key: Math.random().toString(),
        dataIndex: Math.random().toString(),
        title: () => <Input />,
        render: () => <Input />
    }))
    const data = new Array(rowCount).fill('').map((_, id) => ({ 
        id,
        key: Math.random().toString(),
    }))
    return (
        <Table columns={columns} dataSource={data} pagination={false} className="mb-2" />
    )
}


export default SheetTable;