import React, {FC} from 'react';

import {ItemUser} from "./item/ItemUser";
import {homeAPI} from "../../../api/HomeAppService";
import {StocksResponseTypeChild} from "../../../common/interfaces/Interfaces";

import s from "./StockUserItem.module.css"

interface IStockUserItem {
    stock: StocksResponseTypeChild
}

export const StockUserItem: FC<IStockUserItem> = ({stock}) => {
    const {
        data: users,
        error,
        isLoading
    } = homeAPI.useGetUsersQuery(stock.addressId)

    if (isLoading) {
        return <h1>...Загрузка жильца</h1>
    }

    if (error) {
        return <h1>Error</h1>
    }

    return (
        <div className={s.containerUserItem}>
            {users && users.map(user => user.id ?
                <ItemUser
                    key={user.id}
                    user={user}
                    isLoadingUsers={isLoading}
                />
                :
                null
            )}
        </div>
    );
};
