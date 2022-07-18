export interface LanyardWebsocketData {
	op: LanyardWebSocketOpcode;
	d: LanyardData;
	t: LanyardEvent;
}

export interface LanyardRestErrorData {
	success: boolean;
	error: {
		message: string;
		code: string;
	};
}
export interface LanyardData {
	spotify?: Spotify;
	listening_to_spotify: boolean;
	discord_user: User;
	discord_status: DiscordStatus;
	kv?: Kv;
	activities: Activity[];
	active_on_discord_mobile: boolean;
	active_on_discord_desktop: boolean;
}

export interface LanyardRest {
	success: boolean;
	data: LanyardData;
}

export interface Spotify {
	track_id: string;
	timestamps: Timestamps;
	song: string;
	artist: string;
	album_art_url: string;
	album: string;
}

export interface Timestamps {
	start: number;
	end: number;
}

export interface Activity {
	type: number;
	state: string;
	name: string;
	id: string;
	emoji?: Emoji;
	created_at: number;
	application_id?: string;
	timestamps?: Timestamps;
	session_id?: string;
	details?: string;
	buttons?: string[];
	assets?: Assets;
}

export interface Assets {
	small_text: string;
	small_image: string;
	large_text: string;
	large_image: string;
}

export interface Emoji {
	name: string;
	id?: string;
	animated?: boolean;
}

export interface User {
	username: string;
	public_flags: number;
	id: string;
	discriminator: string;
	avatar: string;
}

export type Kv = Record<string, string>;


export enum LanyardWebSocketOpcode {
	EVENT = 0,
	HELLO = 1,
	INITIALIZE = 2,
	HEARTBEAT = 3,
}

export type DiscordStatus = 'online' | 'idle' | 'dnd' | 'offline';
export type LanyardEvent = 'INIT_STATE' | 'PRESENCE_UPDATE';
