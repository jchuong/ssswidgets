import type { TodoItem } from '$types';

export type MessageType = 'TODO';
export type Action = 'READ' | 'WRITE';

export interface WebSocketMessage {
	type: MessageType;
	action: Action;
	payload: any;
}

export interface WebSocketTodo extends WebSocketMessage {
	type: 'TODO';
	payload: Array<TodoItem>;
}
