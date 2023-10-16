import type { TodoItem } from '$types';

export function handle(items: TodoItem) {
	console.log('handle', items);
	return true;
}
