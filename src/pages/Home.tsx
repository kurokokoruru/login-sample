import React, { useEffect } from 'react';
import SignOutButton from '../components/SignOutButton';
import { withAuthenticator } from '@aws-amplify/ui-react'
import {AmplifyAuthenticator, AmplifySignIn, AmplifySignOut} from "@aws-amplify/ui-react";
// import { Auth } from 'aws-amplify';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import { withCustomAuthenticator } from '../hoc/withCustomAuthenticator';
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
            <h2>独自にログアウトボタンを用意することもできる。</h2>
            <SignOutButton />
            <hr />
            <h2>用意されているログアウトボタンもある</h2>
            <AmplifySignOut buttonText="サインアウト"></AmplifySignOut>
            <div className="w-48 my-4">
                <AmplifySignOut buttonText="サインアウト"></AmplifySignOut>
            </div>
            <div className="w-full flex justify-center items-center">
                <div className="w-12 rounded-full">
                    <AmplifySignOut buttonText="sign out"></AmplifySignOut>
                </div>
            </div>

        </div>)
}

// const getUser = async () => {
//     // return await Auth.currentSession().then(data => data);
//     let user = await Auth.currentAuthenticatedUser()
//     console.log("xxx", user);
//     return user;
// }

export default withCustomAuthenticator(Home);