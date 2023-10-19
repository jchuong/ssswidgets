import type { TodoItem } from '$types';

export type MessageType = 'TODO';
export type Action = 'READ' | 'WRITE' | 'ERROR';

export interface WebSocketMessage {
	type: MessageType;
	action: Action;
	category: string;
	payload: any;
}

export interface WebSocketError extends WebSocketMessage {
	action: 'ERROR';
	payload: string;
}

export interface WebSocketTodo extends WebSocketMessage {
	type: 'TODO';
	payload: Array<TodoItem>;
}
