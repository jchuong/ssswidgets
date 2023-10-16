import type { MessageType, WebSocketMessage } from '$types';
import fs from 'fs';
import path from 'path';

const filenameMapping: Record<MessageType, string> = {
    'TODO': 'todo'
}

export function writeConfigFile(data: WebSocketMessage) {
    const filename = filenameMapping[data.type];
    const filePath = path.join('data', `category_${filename}.json`);
    try {
        fs.writeFileSync(filePath, JSON.stringify(data.payload, null, 2));
        return true;
    } catch (err) {
        console.error(err);
    }
    return false;
}