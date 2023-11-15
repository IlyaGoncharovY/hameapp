/**
 * streets common type
 * @param StreetsResponseTypeChildPrefix
 * @param StreetsResponseTypeChild
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
 * @param HousesResponseTypeChild
 */
export type HousesResponseType = HousesResponseTypeChild[];
export type HousesResponseTypeChild = {
	id: number;
	name: string;
}

/**
 * stocks common type
 * @param StocksResponseTypeChild
 * @param StocksResponseTypeChildAccounts
 * @param StocksResponseTypeChildAccountsType
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
