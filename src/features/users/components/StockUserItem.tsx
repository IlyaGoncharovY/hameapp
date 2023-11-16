import React, {FC} from 'react';

import {ItemUser} from "./item/ItemUser";
import {homeAPI} from "../../../api/HomeAppService";
import {StocksResponseTypeChild} from "../../../common/interfaces/Interfaces";

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
        return <h1>Произошла ошибка</h1>
    }

    // const validUsers = users?.filter(user => user)

    return (
        <>
            {users && users.map(user =>
                    <ItemUser
                        key={user.id}
                        user={user}
                        isLoadingUsers={isLoading}
                    />
              )}
        </>
    );
};
