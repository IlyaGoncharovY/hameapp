import React, {FC} from 'react';

import {homeAPI} from "../../../../api/HomeAppService";
import {addUserResponseType} from "../../../../common/interfaces/Interfaces";

import s from "./ItemUser.module.css"

interface IItemUser {
    user: addUserResponseType
    isLoadingUsers: boolean
}

export const ItemUser: FC<IItemUser> = ({user, isLoadingUsers}) => {

    const [deleteUser] = homeAPI.useDeleteUserMutation()

    const deleteUserHandler = (bindId: number) => {
        deleteUser(bindId)
    }

    return (
        <div className={s.userContainer}>
            <div>
                Жилец
            </div>
            <div>
                <div>Имя жильца: {user.name}</div>
                <div>Телефон жильца: {user.phone}</div>
                <div>Email жильца: {user.email}</div>
                <div>ID: {user.id}</div>
            </div>
            <div>
                <button onClick={() => deleteUserHandler(user.bindId)} disabled={isLoadingUsers}>Удалить жильца</button>
            </div>
        </div>
    );
};
