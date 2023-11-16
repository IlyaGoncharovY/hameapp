/**
 * streets common type
 * @type StreetsResponseTypeChildPrefix
 * @type StreetsResponseTypeChild
 */
export type StreetsResponseType = StreetsResponseTypeChild[];
export type StreetsResponseTypeChildPrefix = {
	id: number;
	name: string;
	shortName: string;
}
export type StreetsResponseTypeChild = {
	id: number;
	prefix: StreetsResponseTypeChildPrefix;
	name: string;
	cityId: number;
	city: string;
	nameWithPrefix: string;
}

/**
 * hoses common type
 * @type HousesResponseTypeChild
 */
export type HousesResponseType = HousesResponseTypeChild[];
export type HousesResponseTypeChild = {
	id: number;
	name: string;
}

/**
 * stocks common type
 * @type StocksResponseTypeChild use addressId: number
 * @type StocksResponseTypeChildAccounts
 * @type StocksResponseTypeChildAccountsType
 */
export type StocksResponseType = StocksResponseTypeChild[];
export type StocksResponseTypeChildAccountsType = {
	id: number;
	name: string;
}
export type StocksResponseTypeChildAccounts = {
	bindId: number;
	account: string;
	type: StocksResponseTypeChildAccountsType;
}
export type StocksResponseTypeChild = {
	clients: any[];
	accounts: StocksResponseTypeChildAccounts[];
	addressId: number;
	streetId: number;
	houseId: number;
	streetName: string;
	building: string;
	flat: string;
}
/**
 * type addUsers response
 * @type addUserResponseType res
 * @type id (number)
 * @type name (string)
 * @type phone (string)
 * @type email (string)
 * @type bindId (number)
 */
export type addUserResponseType = {
	id: number;
	name: string;
	phone: string;
	email: string;
	bindId: number
}

/**
 * type res add user
 * @type addUserRequestType request
 * @type id userId(number)
 * @type result
 */
export type addUserResponseSuccessType = {
	id: number;
	result: string;
}

/**
 * type req add user
 * @type addUserResponseType res
 * @type name (string)
 * @type phone (string
 * @type email (string)
 */
export type addUserRequestType = {
	name: string;
	phone: string;
	email: string;
}

