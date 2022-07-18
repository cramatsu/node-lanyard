import { ungzip } from 'pako';
import WebSocket from 'ws';
import { LanyardEventEmitter } from './LanyardEventEmmiter.js';
import { LanyardWebsocketData, LanyardWebSocketOpcode } from '../interfaces/LanyardData.js';
import { LanyardOptions } from '../other/constats.js';

export class LanyardWebsocket extends LanyardEventEmitter {
	private _connection!: WebSocket;
	private _timer: NodeJS.Timer | null = null;
	private attempts = 0;

	public constructor(public readonly subscribeTo: string | string[]) {
		super();
	}

	public connect() {
		this._connection = new WebSocket(LanyardOptions.gateway);

		this._connection.on('message', this.onMessage.bind(this));
		this._connection.on('close', this.onClose.bind(this));
		this._connection.on('error', this.onError.bind(this));
		this._connection.on('open', () => {
			const keyName = typeof this.subscribeTo === 'string' ? 'subscribe_to_id' : 'subscribe_to_ids';
			this._connection.send(
				JSON.stringify({
					op: 2,
					d: {
						[keyName]: this.subscribeTo,
					},
				}),
			);
		});
	}

	public disconnect() {
		if (!this._connection) return;
		return this._connection.close(1000);
	}

	private heartbeat(interval: number): void {
		this._timer = setInterval(() => {
			this._connection.send(
				JSON.stringify({
					op: 3,
				}),
			);
		}, interval);
	}

	private onMessage(data: Buffer) {
		const ungziped = ungzip(data, {
			to: 'string',
		});

		const received = JSON.parse(ungziped) as LanyardWebsocketData;

		if (received.op === LanyardWebSocketOpcode.HEARTBEAT) {
			const heartbeatData = received.d as unknown as { heartbeat_interval: number };
			this.heartbeat(heartbeatData.heartbeat_interval);
			return;
		}

		if (received.t === 'PRESENCE_UPDATE' || received.t === 'INIT_STATE') {
			this.emit('update', received.d);
		}
	}

	private backOff() {
		return Math.min(Math.floor(Math.exp(this.attempts)), 10 * 60) * 1000;
	}

	private onError(err: Error) {
		console.log(err);
	}

	private onClose(code: number, reason: string) {
		if (code === 1000) return;

		const backOff = this.backOff();

		this.attempts += 1;

		console.log(`Connection closed`);
		console.log(`Code ${code}`, reason);
		console.log('Next attempt to connect after', backOff);

		setTimeout(() => {
			clearInterval(this._timer?.ref());
			this._connection = new WebSocket(LanyardOptions.gateway, {});
			this.connect();
		}, this.backOff());
	}
}
