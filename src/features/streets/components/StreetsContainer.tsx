import React from 'react';

import {homeAPI} from "../../../api/HomeAppService";
import {HomesContainer} from "../../homes/components/HomesContainer";

export const StreetsContainer = () => {

    const {
        data: streets,
        error,
        isLoading
    } = homeAPI.useGetAllStreetsQuery('')

    if (isLoading) {
        return <h1>...Загрузка улиц</h1>
    }

    if (error) {
        return <h1>Произошла ошибка</h1>
    }
    return (
        <>
            {streets && streets.map((street) =>
                <HomesContainer key={street.id}
                                street={street}
                />)}
        </>
    );
};
