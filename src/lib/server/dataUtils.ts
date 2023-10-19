import type { MessageType, WebSocketMessage } from '$types';
import fs from 'fs';
import path from 'path';

const TypePathMapping: Record<MessageType, string> = {
	TODO: 'todo'
};

function getFilePath(data: WebSocketMessage) {
	const typePath = TypePathMapping[data.type];
	const filePath = path.join('data', `${typePath}`, `${data.category}.json`);
	return filePath;
}

export function readConfigFile(data: WebSocketMessage) {
	const filePath = getFilePath(data);
	try {
		const content = fs.readFileSync(filePath, { encoding: 'utf8' });
		return JSON.parse(content);
	} catch (err) {
		console.error(err);
		return null;
	}
}

export function writeConfigFile(data: WebSocketMessage) {
	const filePath = getFilePath(data);
	try {
		fs.writeFileSync(filePath, JSON.stringify(data.payload, null, 2));
		return true;
	} catch (err) {
		console.error(err);
	}
	return false;
}
