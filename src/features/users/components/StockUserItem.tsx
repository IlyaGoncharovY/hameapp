import React, {FC} from 'react';

import {ItemUser} from "./item/ItemUser";
import {StocksResponseTypeChild} from "../../../common/interfaces/Interfaces";

interface IStockUserItem {
    stock: StocksResponseTypeChild
}

export const StockUserItem: FC<IStockUserItem> = ({stock}) => {
    return (
        <div style={{border: "2px solid green"}}>
            {/*<div>StockUserItem</div>*/}
            {stock.accounts.map(userInfo =>
                <ItemUser
                    key={stock.flat}
                    userInfo={userInfo}
                />)}
        </div>
    );
};
