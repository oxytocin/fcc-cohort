import React from 'react';
import {bonanza_token} from "../Constants";
import {Navigate} from 'react-router-dom';

const PrivateRoute = (props: { children: React.ReactNode }): JSX.Element => {
    const token = localStorage.getItem(bonanza_token);
    if (!token) {
        return <Navigate to="/"/>
    } else {
        return <>{props.children}</>
    }
}

export default PrivateRoute
