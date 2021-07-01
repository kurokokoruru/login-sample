import React, { useEffect } from 'react';
import SignOutButton from '../components/SignOutButton';
// import { Auth } from 'aws-amplify';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';

const MyPage: React.FC = () => {
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

    console.log("mypage user:", user);

    return (
        <div>
            マイページです。ログイン済みでないと開けない想定です。
            <div>
                {authState}
            </div>
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

export default MyPage;