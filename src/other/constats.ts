export const LanyardOptions = {
	gateway: 'wss://api.lanyard.rest/socket?compression=zlib_json',
	rest: (id: string): string => `https://api.lanyard.rest/v1/users/${id}`,
} as const;
