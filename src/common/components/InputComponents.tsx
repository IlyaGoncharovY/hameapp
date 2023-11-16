import React, {FC, useState} from 'react';

import {addUserRequestType} from "../interfaces/Interfaces";

interface IInputComponents {
    title: string
    newUser: addUserRequestType
    setNewUser: (newUser: addUserRequestType) => void
    handleAddUser: () => void
    addUserIsLoading: boolean
}

/**
 * component for render inputs for added user
 * @param newUser
 * @param setNewUser
 * @param handleAddUser
 * @param addUserIsLoading
 * @param title
 * @constructor
 */
export const InputComponents: FC<IInputComponents> = ({
                                                          newUser,
                                                          setNewUser,
                                                          handleAddUser,
                                                          addUserIsLoading,
                                                          title
                                                      }) => {

    const [error, setError] = useState<string>("")

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewUser({
            ...newUser,
            [name]: value
        });
    };

    const validateName = () => {
        if (!newUser.name) {
            setError('Name is required');
        } else {
            setError('');
        }
    };

    const validatePhone = () => {
        const phoneRegex = /^[0-9+-]+$/;
        if (!phoneRegex.test(newUser.phone)) {
            setError('Invalid phone number');
        } else {
            setError('');
        }
    };

    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[ru|com]+$/;
        if (!emailRegex.test(newUser.email)) {
            setError('Invalid email address');
        } else {
            setError('');
        }
    };

    return (
        <>
            <input
                type="text"
                name="name"
                placeholder="Имя"
                value={newUser.name}
                onChange={handleInputChange}
                onBlur={validateName}
            />
            <input
                type="text"
                name="phone"
                placeholder="Телефон"
                value={newUser.phone}
                onChange={handleInputChange}
                onBlur={validatePhone}
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={newUser.email}
                onChange={handleInputChange}
                onBlur={validateEmail}
            />
            {error && <div style={{ color: "red" }}>{error}</div>}
            <div>
                <button onClick={handleAddUser} disabled={addUserIsLoading || !!error}>{title}</button>
            </div>
        </>
    );
};
