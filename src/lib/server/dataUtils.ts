import type { MessageType, WebSocketMessage } from '$types';
import fs from 'fs';
import path from 'path';

const TypePathMapping: Record<MessageType, string> = {
	TODO: 'todo',
	ELAPSED: 'elapsed',
	SPLIT: 'split'
};

function getFilePath(type: MessageType, category: string) {
	const typePath = TypePathMapping[type];
	const filePath = path.join('data', `${typePath}`, `${category}.json`);
	return filePath;
}

export function readConfigFile(type: MessageType, category: string) {
	const filePath = getFilePath(type, category);
	try {
		const content = fs.readFileSync(filePath, { encoding: 'utf8' });
		return JSON.parse(content);
	} catch (err) {
		console.error(err);
		return null;
	}
}

export function writeConfigFile(data: WebSocketMessage) {
	const filePath = getFilePath(data.type, data.category);
	try {
		fs.writeFileSync(filePath, JSON.stringify(data.payload, null, 2));
		return true;
	} catch (err) {
		console.error(err);
	}
	return false;
}

/**
 * Returns list of json files for the page type
 * @param type
 * @returns list of files in the data directory for the type
 */
export function listConfigFiles(type: MessageType) {
	const typePath = TypePathMapping[type];
	try {
		const files = fs.readdirSync(path.join('data', typePath));
		return files;
	} catch (err) {
		console.error(err);
		throw err;
	}
}
