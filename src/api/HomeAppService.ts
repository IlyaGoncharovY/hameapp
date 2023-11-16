import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react';

import {
    addUserRequestType,
    addUserResponseSuccessType,
    addUserResponseType,
    HousesResponseType,
    StocksResponseType,
    StreetsResponseType
} from '../common/interfaces/Interfaces';

export const homeAPI = createApi({
    reducerPath: 'homeAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'https://dispex.org/api/vtest/'}),
    tagTypes: ["PUT"],
    endpoints: builder => ({
        getAllStreets: builder.query<StreetsResponseType, string>({
            query: () => ({
                url: 'Request/streets',
            }),
        }),
        getCurrentHouses: builder.query<HousesResponseType, number>({
            query: (streetId: number) => ({
                url: `Request/houses/${streetId}`,
            }),
        }),
        getStocks: builder.query<StocksResponseType, { streetsId: number, housesId: number }>({
            query: ({streetsId, housesId}) => ({
                url: `HousingStock`,
                params: {
                    streetId: streetsId,
                    houseId: housesId
                }
            }),
        }),
        getUsers: builder.query<addUserResponseType[], number>({
            query: (addressId: number) => ({
                url: `HousingStock/clients`,
                params: {
                    addressId: addressId
                }
            }),
            providesTags: result => result?.map(({ id }) => ({ type: 'PUT', id })) || [],
        }),
        addNewUser: builder.mutation<addUserResponseSuccessType, addUserRequestType>({
            query: (newUser) => ({
                url: 'HousingStock/client',
                method: "POST",
                body: newUser
            }),
        }),
        bindUserInApartment: builder.mutation<void, { addressId: number, clientId: number }>({
            query: ({addressId, clientId}) => ({
                url: `HousingStock/bind_client`,
                method: "PUT",
                body: {
                    addressId: addressId,
                    clientId: clientId
                },
            }),
            invalidatesTags: ["PUT"],
        }),
        deleteUser: builder.mutation<void, number>({
            query: (bindId) => ({
                url: `HousingStock/bind_client/${bindId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["PUT"],
        }),
    }),
});
