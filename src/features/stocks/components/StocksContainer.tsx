import React, {FC, useState} from 'react';

import {homeAPI} from "../../../api/HomeAppService";
import {
    addUserRequestType,
    HousesResponseTypeChild,
    StreetsResponseTypeChild
} from "../../../common/interfaces/Interfaces";
import {useOpenData} from "../../../utils/customHook/useOpenData";
import {StockUserItem} from "../../users/components/StockUserItem";
import {handleAddUser} from "../../../utils/addUser/handleAddUser";
import {InputComponents} from "../../../common/components/InputComponents";

import stylesContainer from "../../../common/styles/Containers.module.css"


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

    const wrapperAddUser = () => {
        handleAddUser(addUser, newUser, stocks, bindUserInApartment, setNewUser)
    }
    if (isLoading) {
        return <h1>...Загрузка квартиры</h1>
    }

    if (error) {
        return <h1>Произошла ошибка</h1>
    }

    return (
        <div className={stylesContainer.mainContainer}>
            <div className={stylesContainer.descriptionContainer}>
                <div>Квартира</div>
                <div>
                    <InputComponents
                        newUser={newUser}
                        setNewUser={setNewUser}
                        handleAddUser={wrapperAddUser}
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
