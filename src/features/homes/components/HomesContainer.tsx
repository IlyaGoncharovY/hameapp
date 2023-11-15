import React, {FC} from 'react';

import {homeAPI} from "../../../api/HomeAppService";
import {StocksContainer} from "../../stocks/components/StocksContainer";
import {StreetsResponseTypeChild} from "../../../common/interfaces/Interfaces";

interface IHomesContainer {
    street: StreetsResponseTypeChild
}

export const HomesContainer: FC<IHomesContainer> = ({street}) => {
    const {data: houses, error, isLoading} = homeAPI.useGetCurrentHousesQuery(street.id)
    return (
        <div style={{border: "2px solid red"}}>
            <div>
                HomesContainer
            </div>
            <div>
                <div>
                    Город: {street.city}
                </div>
                <div>
                    Название: {street.nameWithPrefix}
                </div>
            </div>
            {houses && houses.map(house =>
                <StocksContainer
                    key={house.id}
                    street={street}
                    house={house}
                />)}
        </div>
    );
};
