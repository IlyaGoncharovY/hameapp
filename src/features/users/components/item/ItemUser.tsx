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
            .unwrap()
            .then(() => {
                console.log("User deleted successfully");
            })
            .catch((error) => {
                console.error("Error deleting user:", error);
            });
    }

    return (
        <div style={{padding: "20px", border: "2px solid purple", margin: "20px"}}>
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
