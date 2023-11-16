import React, {FC, useState} from 'react';

import {homeAPI} from "../../../api/HomeAppService";
import {
    addUserRequestType,
    HousesResponseTypeChild,
    StreetsResponseTypeChild
} from "../../../common/interfaces/Interfaces";
import {useOpenData} from "../../../utils/customHook/useOpenData";
import {StockUserItem} from "../../users/components/StockUserItem";
import {InputComponents} from "../../../common/components/InputComponents";

interface IStocksContainer {
    house: HousesResponseTypeChild
    street: StreetsResponseTypeChild
}

export const StocksContainer: FC<IStocksContainer> = ({street, house}) => {

    const {isOpen, openDataHandler} = useOpenData()

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

    if (isLoading) {
        return <h1>...Загрузка квартиры</h1>
    }

    if (error) {
        return <h1>Произошла ошибка</h1>
    }

    return (
        <div style={{padding: "20px", margin: "20px"}}>
            <div style={{borderBottom: "4px solid black"}}>
                <div>Квартира</div>
                <div>
                    <InputComponents
                        newUser={newUser}
                        setNewUser={setNewUser}
                        handleAddUser={handleAddUser}
                        addUserIsLoading={addUserIsLoading}
                        title={"Добавить жильца"}
                    />
                    {addUserError && <div>Что то не так с запросом =(</div>}
                </div>
                <div>
                    <div>Номер дома: {house.id}</div>
                    <div>Имя дома: {house.name}</div>
                </div>
                <button onClick={openDataHandler}>{!isOpen ? "Открыть квартиры" : "Закрыть квартиры"}</button>
            </div>
            {
                isOpen && <>
                    {stocks && stocks.map(stock =>
                        <StockUserItem
                            key={stock.addressId}
                            stock={stock}
                        />
                    )}
                </>
            }

        </div>
    );
};
