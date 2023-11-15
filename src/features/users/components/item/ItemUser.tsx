import React, {FC} from 'react';

import {StocksResponseTypeChildAccounts} from "../../../../common/interfaces/Interfaces";

interface IItemUser {
    userInfo: StocksResponseTypeChildAccounts
}

export const ItemUser: FC<IItemUser> = ({userInfo}) => {
    return (
        <div>
            <div>
                ItemUser
            </div>
            <div>
                <div>Имя аккаунта: {userInfo.account}</div>
                <div>ID: {userInfo.type.id}</div>
                <div>Имя: {userInfo.type.name}</div>
            </div>
        </div>
    );
};
