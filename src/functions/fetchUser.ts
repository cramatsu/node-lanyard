import fetch from 'node-fetch';
import type { LanyardData, LanyardRest } from '../interfaces/LanyardData.js';
import { LanyardOptions } from '../other/constats.js';

/**
 * Makes a GET request to https://api.lanyard.rest/v1/users/
 * @param id unique user ID
 * @returns Lanyrad's user object
 * @example Basically this is how you will get the data
 *
 * ```ts
 * const data = await fetchUser('226622016986415104');
 *
 * console.log(data)
 *
 * // (´｡• ᵕ •｡`) ♡
 * ```
 * */
export const fetchUser = async (id: string): Promise<LanyardData | undefined> => {
	const response = await fetch(LanyardOptions.rest(id), {
		method: 'GET',
	});

	if (response.status === 404) return undefined;

	return ((await response.json()) as LanyardRest).data;
};
