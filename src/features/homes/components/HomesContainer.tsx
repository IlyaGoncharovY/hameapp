import React, {FC} from 'react';

import {homeAPI} from "../../../api/HomeAppService";
import {useOpenData} from "../../../utils/customHook/useOpenData";
import {StocksContainer} from "../../stocks/components/StocksContainer";
import {StreetsResponseTypeChild} from "../../../common/interfaces/Interfaces";

interface IHomesContainer {
    street: StreetsResponseTypeChild
}

export const HomesContainer: FC<IHomesContainer> = ({street}) => {

    const {isOpen, openDataHandler} = useOpenData()

    const {
        data: houses,
        error,
        isLoading
    } = homeAPI.useGetCurrentHousesQuery(street.id)

    if (isLoading) {
        return <h1>...Загрузка домов</h1>
    }

    if (error) {
        return <h1>Произошла ошибка</h1>
    }

    return (
        <div style={{padding: "20px", margin: "20px"}}>
            <div style={{borderBottom: "4px solid black"}}>
                <div>
                    Улица
                </div>
                <div>
                    <div>
                        Город: {street.city}
                    </div>
                    <div>
                        Название: {street.nameWithPrefix}
                    </div>
                </div>
                <button onClick={openDataHandler}>{!isOpen ? "Открыть улицы" : "Закрыть улицы"}</button>
            </div>
            {isOpen && <>
                {houses && houses.map(house =>
                    <StocksContainer
                        key={house.id}
                        street={street}
                        house={house}
                    />)}
            </>}
        </div>
    );
};
