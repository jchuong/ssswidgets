export type Split = {
	title: string;
	time: number;
	attempts: number;
	active: boolean;
};

export type SplitConfig = {
	useAttempts: boolean;
	useTime: boolean;
	splits: Array<Split>;
};
