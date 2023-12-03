import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
    MutationDefinition
} from "@reduxjs/toolkit/query";
import {MutationTrigger} from "@reduxjs/toolkit/dist/query/react/buildHooks";

import {addUserRequestType, addUserResponseSuccessType, StocksResponseType} from "../../common/interfaces/Interfaces";

/**
 * hook for added new user in apartment
 * @param addUser
 * @param newUser
 * @param stocks
 * @param bindUserInApartment
 * @param setNewUser
 * @return promise
 */
export const handleAddUser = async (addUser: MutationTrigger<MutationDefinition<addUserRequestType,
                                        BaseQueryFn<string | FetchArgs,
                                            unknown,
                                            FetchBaseQueryError,
                                            {}, FetchBaseQueryMeta>,
                                        "PUT",
                                        addUserResponseSuccessType,
                                        "homeAPI">>,
                                    newUser: addUserRequestType,
                                    stocks: StocksResponseType | undefined,
                                    bindUserInApartment: MutationTrigger<MutationDefinition<{
                                        addressId: number;
                                        clientId: number;
                                    },
                                        BaseQueryFn<string | FetchArgs,
                                            unknown,
                                            FetchBaseQueryError,
                                            {},
                                            FetchBaseQueryMeta>,
                                        "PUT",
                                        void,
                                        "homeAPI">>,
                                    setNewUser: (value: addUserRequestType) => void) => {
    try {
        const response = await addUser(newUser)

        if ('data' in response && response.data?.result === "Ok") {
            const clientId = response.data.id;

            const stockAddressId = stocks && stocks[0]?.addressId

            if (stockAddressId) {
                await bindUserInApartment({
                    addressId: stockAddressId,
                    clientId: clientId,
                })
            }
        }

        setNewUser({
            name: '',
            phone: '',
            email: '',
        })
    } catch (error) {
        console.error("Error adding new user:", error)
    }
};
