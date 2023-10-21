import { readConfigFile, writeConfigFile } from '$lib/server/dataUtils';
import type { WebSocketHandlerParams } from '$types';

export function handle({ data, broadcast }: WebSocketHandlerParams) {
	if (data.action === 'READ') {
		// Do nothing, initial state comes from +page.server.ts now
		return;
	} else if (data.action === 'WRITE') {
		const config = readConfigFile(data.type, data.category);
		config.splits = data.payload;
		const writeData = { ...data, payload: config };
		const success = writeConfigFile(writeData);
		if (success) {
			// Broadcast updates too all
			broadcast({
				...data,
				action: 'READ'
			});
		}
	}
}
