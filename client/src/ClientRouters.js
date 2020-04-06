import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import AdminUsersPage from './pages/AdminUsersPage';
import UserPage from './pages/UserPage';
import AdminDocsPage from './pages/AdminDocsPage';
import AdminCreateDocPage from './pages/AdminCreateDocPage';

import ProtectedRoute from './components/ProtectedRoute';

const ClientRoutes = () => {
    return (
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/login" component={AuthPage} />
            <Route path="/register" component={AuthPage} />
            <ProtectedRoute exact path="/admin/users" component={AdminUsersPage} />
            <ProtectedRoute path="/admin/users/:id" component={UserPage} />
            <ProtectedRoute exact path="/admin/docs" component={AdminDocsPage} />
            <ProtectedRoute path="/admin/docs/create" component={AdminCreateDocPage} />
        </Switch>
    )
}

export default ClientRoutes