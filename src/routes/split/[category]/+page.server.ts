import { error } from '@sveltejs/kit';
import { readConfigFile } from '$lib/server/dataUtils.js';
import type { SplitConfig } from '$types';

export function load({ params }) {
	const { category } = params;
	const config: SplitConfig = readConfigFile('SPLIT', category);
	if (!config) {
		throw error(404, `No config file found for ${category}`);
	}
	return {
		category,
		config
	};
}
