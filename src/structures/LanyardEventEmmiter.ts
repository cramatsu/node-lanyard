import EventEmitter from 'events';
import type { LanyardEvents } from '../interfaces/LanyardEvents.js';

export type Awaitable<T> = T | PromiseLike<T>;

export class LanyardEventEmitter extends EventEmitter {
	public override emit<K extends keyof LanyardEvents>(event: K, ...args: LanyardEvents[K]): boolean {
		return super.emit(event, ...args);
	}

	public override on<K extends keyof LanyardEvents>(
		event: K,
		listener: (...args: LanyardEvents[K]) => Awaitable<void>,
	): this;
	public override on<S extends string | symbol>(
		event: Exclude<S, keyof LanyardEvents>,
		listener: (...args: any[]) => Awaitable<void>,
	): this {
		return super.on(event, listener);
	}

	public override once<K extends keyof LanyardEvents>(
		event: K,
		listener: (args: LanyardEvents[K]) => Awaitable<void>,
	): this {
		return super.once(event, listener);
	}

	public override off<K extends keyof LanyardEvents>(
		event: K,
		listener: (args: LanyardEvents[K]) => Awaitable<void>,
	): this {
		return super.off(event, listener);
	}
}
