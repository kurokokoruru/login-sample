import React, { useState } from 'react';
import { signUp } from '../utils/auth-utils';

const SignUp: React.FC = () => {

    const [email, setEmail] = useState("");
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }

    const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
        const user = await signUp(email);
        console.log(user);
        setEmail("");
    }

    return (
        <div className="w-full bg-gray-500">
            <div className="container mx-auto py-8">
                <div className="w-96 mx-auto bg-white shadow">
                    <div className="mx-16 py-4 px-8 text-black text-xl font-bold border-b border-gray-500">サインアップ</div>

                    <div className="py-4 px-8">
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-600 text-sm font-bold mb-2">メールアドレス</label>
                            <input type="text" name="email" placeholder="office@testtest.co.jp" value={email} onChange={handleChange}/>
                        </div>
                    </div>
                    <div className="mb-8">
                        <button className="mb-4 mx-16 rounded-full py-1 px-24 bg-gray-300" onClick={handleClick}>作成</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp;