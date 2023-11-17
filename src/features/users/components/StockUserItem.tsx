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
        return null
    }

    return (
        <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between"}}>
            {users && users.map(user =>
                <ItemUser
                    key={user.id}
                    user={user}
                    isLoadingUsers={isLoading}
                />
            )}
        </div>
    );
};
