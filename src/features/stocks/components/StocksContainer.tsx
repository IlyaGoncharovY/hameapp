import React, {FC} from 'react';

import {homeAPI} from "../../../api/HomeAppService";
import {StockUserItem} from "../../users/components/StockUserItem";
import {HousesResponseTypeChild, StreetsResponseTypeChild} from "../../../common/interfaces/Interfaces";

interface IStocksContainer {
    house: HousesResponseTypeChild
    street: StreetsResponseTypeChild
}

export const StocksContainer: FC<IStocksContainer> = ({street, house}) => {

    const {
        data: stocks,
        error,
        isLoading
    } = homeAPI.useGetStocksQuery({streetsId: street.id, housesId: house.id})

    return (
        <div style={{border: "2px solid gold"}}>
            <div>StocksContainer</div>
            <div>
                <div>Номер дома: {house.id}</div>
                <div>Имя дома: {house.name}</div>
            </div>
            <div>
                {stocks && stocks.map(stock =>
                    <StockUserItem
                        key={stock.addressId}
                        stock={stock}
                    />)}
            </div>
        </div>
    );
};
