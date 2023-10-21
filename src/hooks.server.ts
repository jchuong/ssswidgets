/**
 *  MIT License

 *  Copyright (c) 2023 Suhail Dawood

 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:

 *  The above copyright notice and this permission notice shall be included in all
 *  copies or substantial portions of the Software.

 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *  SOFTWARE.
 */
import { building } from '$app/environment';
import { GlobalThisWSS } from '$lib/server/webSocketUtils';
import * as todo from './server/todoHandler';
import * as elapsed from './server/elapsedHandler';
import type { Handle } from '@sveltejs/kit';
import type { ExtendedGlobal } from '$lib/server/webSocketUtils';
import type { WebSocketMessage } from '$types';

// This can be extracted into a separate file
let wssInitialized = false;
const startupWebsocketServer = () => {
	if (wssInitialized) return;
	console.log('[wss:kit] setup');
	const wss = (globalThis as ExtendedGlobal)[GlobalThisWSS];
	if (wss !== undefined) {
		const broadcast = (data: object) => {
			const message = JSON.stringify(data);
			wss.clients.forEach((client) => client.send(message));
		};
		wss.on('connection', (ws) => {
			// This is where you can authenticate the client from the request
			// const session = await getSessionFromCookie(request.headers.cookie || '');
			// if (!session) ws.close(1008, 'User not authenticated');
			// ws.userId = session.userId;
			console.log(`[wss:kit] client connected`);

			ws.on('close', () => {
				console.log(`[wss:kit] client disconnected`);
			});

			ws.on('message', (event) => {
				try {
					const data: WebSocketMessage = JSON.parse(event.toString());
					switch (data.type) {
						case 'TODO': {
							todo.handle({ ws, data, broadcast });
							break;
						}
						case 'ELAPSED': {
							elapsed.handle({ ws, data, broadcast });
							break;
						}
						default:
							throw new Error('Unexpected message type');
					}
				} catch (err) {
					console.error(err);
				}
			});
		});
		wssInitialized = true;
	}
};

export const handle = (async ({ event, resolve }) => {
	startupWebsocketServer();
	// Skip WebSocket server when pre-rendering pages
	if (!building) {
		const wss = (globalThis as ExtendedGlobal)[GlobalThisWSS];
		if (wss !== undefined) {
			event.locals.wss = wss;
		}
	}
	const response = await resolve(event, {
		filterSerializedResponseHeaders: (name) => name === 'content-type'
	});
	return response;
}) satisfies Handle;
