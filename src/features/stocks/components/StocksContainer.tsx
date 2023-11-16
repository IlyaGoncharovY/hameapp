import React, {FC, useState} from 'react';

import {homeAPI} from "../../../api/HomeAppService";
import {
    addUserRequestType,
    HousesResponseTypeChild,
    StreetsResponseTypeChild
} from "../../../common/interfaces/Interfaces";
import {StockUserItem} from "../../users/components/StockUserItem";

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

    const [addUser] = homeAPI.useAddNewUserMutation()

    const [bindUserInApartment,
        {
            error: addUserError,
            isLoading: addUserIsLoading
        }
    ] = homeAPI.useBindUserInApartmentMutation()

    const [newUser, setNewUser] = useState<addUserRequestType>({
        name: '',
        phone: '',
        email: '',
    })

    const handleAddUser = async () => {
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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value,
        });
    };

    if (isLoading) {
        return <h1>...Загрузка квартиры</h1>
    }

    if (error) {
        return <h1>Произошла ошибка</h1>
    }

    return (
        <div style={{padding: "20px", margin: "20px"}}>
            <div>Квартира</div>
            <div>
                <div>
                    <input
                        type="text"
                        name="name"
                        placeholder="Имя"
                        value={newUser.name}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="phone"
                        placeholder="Телефон"
                        value={newUser.phone}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={newUser.email}
                        onChange={handleInputChange}
                    />
                    {addUserError && <div>Что то не так с запросом =(</div>}
                </div>
                <button onClick={handleAddUser} disabled={addUserIsLoading}>Добавить жильца</button>
            </div>
            <div>
                <div>Номер дома: {house.id}</div>
                <div>Имя дома: {house.name}</div>
            </div>
            <div>
                {stocks && stocks.map(stock =>
                    <StockUserItem
                        key={stock.addressId}
                        stock={stock}
                    />
                )}
            </div>
        </div>
    );
};
