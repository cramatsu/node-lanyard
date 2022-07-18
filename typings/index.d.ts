import { EventEmitter } from 'node:events';

declare module 'node:events' {
	class EventEmitter {
		public static once<K extends keyof Lanyard.LanyardEvents>(
			eventEmitter: LanyardWebsocket,
			eventName: K,
		): Promise<Lanyard.LanyardEvents[K]>;
		public static on<K extends keyof Lanyard.LanyardEvents>(
			eventEmitter: LanyardWebsocket,
			eventName: K,
		): AsyncIterator<Lanyard.LanyardEvents[K]>;
	}
}

export function fetchUser(id: string): Promise<Lanyard.LanyardData | undefined>;

export namespace Lanyard {
	export interface LanyardWebsocketData {
		op: LanyardWebSocketOpcode;
		d: LanyardData;
		t: LanyardEvent;
	}

	export interface LanyardRest {
		success: boolean;
		data: LanyardData;
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

	export interface LanyardEvents {
		update: [data: LanyardData];
	}
}

export class LanyardWebsocket extends TypedEventEmitter {
	public constructor(subscribeTo: string | string[]);

	public connect(): void;
	public disconnect(): void;

	private heartbeat(interval: number): void;
	private backOff(): number;
	private onError(): void;
	private onMessage(data: Buffer): void;
	private onClose(): void;
}

declare class TypedEventEmitter extends EventEmitter {
	emit<K extends keyof Lanyard.LanyardEvents>(event: K, ...args: Lanyard.LanyardEvents[K]): boolean;
	emit<S extends string | symbol>(event: Exclude<S, keyof Lanyard.LanyardEvents>, ...args: unknown[]): boolean;

	on<K extends keyof Lanyard.LanyardEvents>(
		event: K,
		listener: (...args: Lanyard.LanyardEvents[K]) => Awaitable<void>,
	): this;
	on<S extends string | symbol>(
		event: Exclude<S, keyof Lanyard.LanyardEvents>,
		listener: (...args: any[]) => Awaitable<void>,
	): this;

	once<K extends keyof Lanyard.LanyardEvents>(
		event: K,
		listener: (...args: Lanyard.LanyardEvents[K]) => Awaitable<void>,
	): this;
	once<S extends string | symbol>(
		event: Exclude<S, keyof Lanyard.LanyardEvents>,
		listener: (...args: any[]) => Awaitable<void>,
	): this;

	off<K extends keyof Lanyard.LanyardEvents>(
		event: K,
		listener: (...args: Lanyard.LanyardEvents[K]) => Awaitable<void>,
	): this;
	off<S extends string | symbol>(
		event: Exclude<S, keyof Lanyard.LanyardEvents>,
		listener: (...args: any[]) => Awaitable<void>,
	): this;

	removeAllListeners<K extends keyof Lanyard.LanyardEvents>(event?: K): this;
	removeAllListeners<S extends string | symbol>(event?: Exclude<S, keyof Lanyard.LanyardEvents>): this;
}

type Awaitable<T> = T | PromiseLike<T>;
