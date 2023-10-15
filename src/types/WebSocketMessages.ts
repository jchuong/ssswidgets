import type { TodoItem } from '$types';

export type MessageType = 'TODO';

export interface WebSocketMessage {
	type: MessageType;
	payload: any;
}

export interface WebSocketTodo extends WebSocketMessage {
	type: 'TODO';
	payload: Array<TodoItem>;
}
