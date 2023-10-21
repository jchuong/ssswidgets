import { readConfigFile, writeConfigFile } from '$lib/server/dataUtils';
import type { WebSocketHandlerParams, WebSocketMessage } from '$types';

export function handle({ ws, data, broadcast }: WebSocketHandlerParams) {
	const { type, category } = data;
	if (data.action === 'READ') {
		const payload = readConfigFile(type, category);
		if (payload) {
			// send to client
			ws.send(JSON.stringify({ ...data, payload }));
		} else {
			const errorData: WebSocketMessage = {
				...data,
				action: 'ERROR',
				payload: `Failed to read JSON file for ${type} '${category}'. Are you sure it exists?`
			};
			ws.send(JSON.stringify(errorData));
		}
	} else if (data.action === 'WRITE') {
		const success = writeConfigFile(data);
		if (success) {
			// Broadcast updates too all
			broadcast(data);
		}
	}
}
