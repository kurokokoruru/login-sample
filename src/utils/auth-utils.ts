import { Auth } from 'aws-amplify';

const TEMPORARY_PASSWORD = 'office-office';
export const signUp = async (email: string) => {
    try {
        const { user } = await Auth.signUp({
            username: email,
            password: TEMPORARY_PASSWORD,
            attributes: {
                email: email
            }
        })
        return user;
    } catch (error) {
        console.log(error);
        // "UsernameExistsException"　ユーザーがすでにいる
        // code: "UsernameExistsException"
        // message: "An account with the given email already exists."
        // name: "UsernameExistsException"

        // "InvalidParameterException"
        // code: "InvalidParameterException"
        // message: "Invalid email address format."
        // name: "InvalidParameterException"
        return null;
    }
}

export const signIn = async (email: string, password: string) => {
    try {
        await Auth.signIn(email, password);
    } catch (error) {
        console.log("error signing in", error);
        // https://traveler0401.com/aws-cognito-error/

        // code: "UserNotConfirmedException"
        // message: "User is not confirmed."
        // name: "UserNotConfirmedException"
    }
}

export const updateUserEmail = async (email: string) => {
    let user = await Auth.currentAuthenticatedUser();

    let result = await Auth.updateUserAttributes(user, { email: email });

    return result;
}

export const confirmSignUp = async (email: string, code: string) => {
    let result = await Auth.confirmSignUp(email, code);
    console.log(result)
    return result;
}


// export const verifyCurrentUserAttributeSubmit = async (varificationCode: string) => {
//     let result = Auth.verifyCurrentUserAttributeSubmit('email', varificationCode);
//     console.log(result);
//     // ログイン前はUserNotFoundException
// }

