import React, { useState } from 'react';
import { confirmSignUp } from '../utils/auth-utils';
import { AmplifyAuthenticator, AmplifyConfirmSignUp } from "@aws-amplify/ui-react";

const ConfirmEmail: React.FC = () => {

    const [code, setCode] = useState("");
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCode(event.target.value);
    }

    const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
        const result = await confirmSignUp("kurokokoruru@gmail.com", code);
        console.log(result);
        setCode("");
    }

    return (
        <div className="w-full bg-gray-500">
            <div className="container mx-auto py-8">
                <div className="w-96 mx-auto bg-white shadow">
                    <div className="mx-16 py-4 px-8 text-black text-xl font-bold border-b border-gray-500">メールアドレス疎通</div>

                    <div className="py-4 px-8">
                        <div className="mb-4">
                            <label htmlFor="code" className="block text-gray-600 text-sm font-bold mb-2">認証コード</label>
                            <input type="text" name="code" placeholder="####" value={code} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="mb-8">
                        <button className="mb-4 mx-16 rounded-full py-1 px-24 bg-gray-300" onClick={handleClick}>送信</button>
                    </div>
                </div>
                <AmplifyAuthenticator>
                    <AmplifyConfirmSignUp
                        headerText="My Custom Confirm Sign Up Text"
                        slot="confirm-sign-up"
                    ></AmplifyConfirmSignUp>
                </AmplifyAuthenticator>

            </div>
        </div>
    )
}

export default ConfirmEmail;