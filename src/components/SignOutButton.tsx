import { Auth } from 'aws-amplify';
import React from 'react';
import {
    Redirect
  } from "react-router-dom";

const SignOutButton: React.FC = () => {
    const onClickHandler = () => {
        Auth.signOut();
        return <Redirect to="/login" />
    }
    return <button className="font-bold py-2 px-4 rounded bg-blue-500 text-white" onClick={onClickHandler}>サインアウト</button>
}

export default SignOutButton;