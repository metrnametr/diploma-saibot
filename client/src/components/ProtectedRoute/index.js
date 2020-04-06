import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { isEmpty } from 'lodash';
import { AuthContext } from '../../index';

import { customFetch } from '../../tools/customFetch';

const ProtectedRoute = ({ component: Component, ...rest }) => {

    const authContext = useContext(AuthContext);
    

    return <Route { ...rest } render={(props) => {
        const isAdmin = true;
        const { match: { path } } = props;
        if (!authContext) {
            return <Redirect to={{ pathname: '/login' }} />
        }
        if (path.match('/admin')) {
            if (!isAdmin) {
                return <Redirect to={{ pathname: '/' }} />
            }
        }

        return <Component { ...props } />
    }
    }/>
}

export default ProtectedRoute;