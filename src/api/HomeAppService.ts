import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react';

import {HousesResponseType, StocksResponseType, StreetsResponseType} from '../common/interfaces/Interfaces';

export const homeAPI = createApi({
    reducerPath: 'homeAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'https://dispex.org/api/vtest/'}),
    endpoints: builder => ({
        getAllStreets: builder.query<StreetsResponseType, string>({
            query: () => ({
                url: '/Request/streets',
            }),
        }),
        getCurrentHouses: builder.query<HousesResponseType, number>({
            query: (streetId: number) => ({
                url: `/Request/houses/${streetId}`,
            }),
        }),
        getStocks: builder.query<StocksResponseType, { streetsId: number, housesId: number }>({
            query: ({ streetsId, housesId }) => ({
                url: `/HousingStock`,
                params: {
                    streetId: streetsId,
                    houseId: housesId
                }
            }),
        }),
    }),
});
