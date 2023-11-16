import React, {FC} from 'react';

import {homeAPI} from "../../../../api/HomeAppService";
import {addUserResponseType} from "../../../../common/interfaces/Interfaces";

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
        <div style={{
            width: "250px",
            height: "250px",
            border: "2px solid purple",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "20px",
            padding: "20px",
            margin: "20px"
        }}>
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
