import path from 'path';
import { listConfigFiles } from '$lib/server/dataUtils.js';

export function load({ params }) {
	const files = listConfigFiles('TODO');
	const links = files.map((f) => path.parse(f).name);
	return {
		links
	};
}
