import type { WebSocket } from 'ws';

import { readConfigFile, writeConfigFile } from '$lib/server/dataUtils';
import type { WebSocketMessage } from '$types';

export function handle(ws: WebSocket, data: WebSocketMessage, broadcast: (data: any) => void) {
    if (data.action === 'READ') {
        const payload = readConfigFile(data);
        if (payload) {
            // send to client
            ws.send(JSON.stringify({ ...data, payload }));
        } else {
            const errorData: WebSocketMessage = {
                ...data,
                action: 'ERROR',
                payload: `Failed to read JSON file for ${data.type} '${data.category}'. Are you sure it exists?`
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