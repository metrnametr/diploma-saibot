import React, { useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { customFetch } from './tools/customFetch';
import { isEmpty } from 'lodash';
import ClientRouters from './ClientRouters';


import Header from './components/Header';


import './main.scss';

export const AuthContext = React.createContext(false);



const App = () => {

    const [auth, setAuth] = useState(false);

    useEffect(() => {
        checkUser();
    }, [])

    const checkUser = async () => {
        const res = await customFetch('/auth');
        if (!isEmpty(res)) {
            setAuth(res.auth);
        }
    }

    return (
        <Router>
            <AuthContext.Provider value={auth}>
                <Header />
                <ClientRouters />
            </AuthContext.Provider>
        </Router>
    )
}


ReactDOM.render(
    // <React.StrictMode>
        <App />,
    // </React.StrictMode>,
    document.getElementById('root')
)