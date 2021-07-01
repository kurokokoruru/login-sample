import React, { Component, useEffect, useState } from 'react';
import { RouteProps, Route, Redirect } from 'react-router-dom';
// import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import { Hub, Auth } from 'aws-amplify';

interface IPrivateRouteProps extends RouteProps {
    comp: React.FC
}

const PrivateRoute: React.FC<IPrivateRouteProps> = (props) => {
    const { comp, ...rest } = props;
    const [isSignIn, setIsSignIn] = useState(false);

    const updateUser = async () => {
        // return await Auth.currentSession().then(data => data);
        let user = await Auth.currentAuthenticatedUser()
        console.log("xxx", user);
        setIsSignIn(user != null);
    }

    useEffect(() => {
        Hub.listen('auth', ({payload: { event, data}}) => {
            console.log("eventです。", event);
            switch (event) {
                case 'signIn':
                case 'congniteHostedUI':
                    const user = updateUser();
                    console.log(user);
                    break;
                case 'signOut':
                    setIsSignIn(false);
                    break;
                case 'signIn_failure':
                case 'cognitoHostedUI_failure':
                    console.log("サインイン失敗");
                    break;
            }
        });

    },[isSignIn]);

    updateUser();

    console.log("-------route-------")
    console.log(isSignIn)
    // console.log(authState);
    // console.log(AuthState.SignedIn);

    return (
        <Route
            { ...rest}
            render={(innerProps: any) => isSignIn ?
            (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/login",
                        state: {from: innerProps.location}
                    }}
                />
            )}
        />
    )
}



export default PrivateRoute;