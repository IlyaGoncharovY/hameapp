import React from 'react';

import {homeAPI} from "../../../api/HomeAppService";
import {HomesContainer} from "../../homes/components/HomesContainer";

export const StreetsContainer = () => {

    const {data: streets, error, isLoading} = homeAPI.useGetAllStreetsQuery('')

    return (
        <div style={{border: "2px solid black"}}>
            <div>StreetsContainer</div>
            <div>
                {streets && streets.map((street) =>
                    <HomesContainer key={street.id}
                                    street={street}
                    />)}
            </div>
        </div>
    );
};
