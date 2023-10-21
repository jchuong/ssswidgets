import type { TodoItem } from '$types';
import type { WebSocket } from 'ws';

export type MessageType = 'TODO' | 'ELAPSED' | 'SPLIT';
export type Action = 'READ' | 'WRITE' | 'ERROR';

export interface WebSocketHandlerParams {
	ws: WebSocket;
	data: WebSocketMessage;
	broadcast: (data: Object) => void;
}

export interface WebSocketMessage {
	type: MessageType;
	action: Action;
	category: string;
	payload: unknown;
}

export interface WebSocketError extends WebSocketMessage {
	action: 'ERROR';
	payload: string;
}

export interface WebSocketTodo extends WebSocketMessage {
	type: 'TODO';
	payload: Array<TodoItem>;
}

export interface WebSocketElapsed extends WebSocketMessage {
	type: 'ELAPSED';
	payload: number; // ms
}
