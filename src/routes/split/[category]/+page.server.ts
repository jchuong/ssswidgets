import { error } from '@sveltejs/kit';
import { readConfigFile } from '$lib/server/dataUtils.js';

export function load({ params }) {
	const { category } = params;
	const config = readConfigFile('SPLIT', category);
	if (!config) {
		throw error(404, `No config file found for ${category}`);
	}
	return {
		category,
		config
	};
}
