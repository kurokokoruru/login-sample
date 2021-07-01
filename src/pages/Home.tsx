import React, { useEffect } from 'react';
import SignOutButton from '../components/SignOutButton';
import { withAuthenticator } from '@aws-amplify/ui-react'
// import { Auth } from 'aws-amplify';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
// import { CognitoUser } from 'amazon-cognito-identity-js';

const Home: React.FC = () => {
    const [authState, setAuthState] = React.useState<AuthState>();
    const [user, setUser] = React.useState<object | undefined>();

    useEffect(() => {
        return onAuthUIStateChange((nextAuthState, authData) => {
            setAuthState(nextAuthState);
            setUser(authData)
            console.log("--------1--------");
            console.log(nextAuthState);
            console.log("--------2--------");
            console.log(authData)
        })
    },[]);

    console.log("user:", user);

    return (
        <div>
            ホームです。{authState}
            {/* <div>
                authState: {authState}
            </div>
            <div>user: {user}</div> */}
            <hr />
            <SignOutButton />
        </div>)
}

// const getUser = async () => {
//     // return await Auth.currentSession().then(data => data);
//     let user = await Auth.currentAuthenticatedUser()
//     console.log("xxx", user);
//     return user;
// }

export default withAuthenticator(Home);