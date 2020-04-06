import React from 'react';
import { Link } from 'react-router-dom';

const ProtNavLink = (props) => {
    return (
        <Link className="nav-link" {...props}>{props.children}</Link>
    )
}

export default ProtNavLink;