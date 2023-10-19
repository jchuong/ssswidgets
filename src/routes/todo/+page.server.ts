import path from 'path';
import { listConfigFiles } from '$lib/server/dataUtils.js';

export function load() {
	const files = listConfigFiles('TODO');
	const links = files.reduce((memo, f) => {
		const { ext, name } = path.parse(f);
		if (ext === '.json') {
			return [...memo, name];
		}
		return memo;
	}, [] as Array<string>);
	return {
		links
	};
}
