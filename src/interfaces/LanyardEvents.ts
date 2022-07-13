import type { LanyardData } from './LanyardData.js';

export interface LanyardEvents {
	update: [data: LanyardData];
}
