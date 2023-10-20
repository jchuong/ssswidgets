import type { WebSocketHandlerParams, WebSocketElapsed } from '$types';

export function handle({ data, broadcast }: WebSocketHandlerParams) {
	const { action } = data;
	switch (action) {
		case 'READ': {
			// do nothing, this is a one way widget
			return;
		}
		case 'WRITE': {
			const msg = { ...data, action: 'READ' } as WebSocketElapsed;
			broadcast(msg);
		}
	}
}
