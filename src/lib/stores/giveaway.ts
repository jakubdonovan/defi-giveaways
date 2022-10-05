import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';
import state from '$lib/stores/fsm';

interface Giveaway {
	giveaway_type: string;
	project_contract_address: string;
	giveaway_amount: number;
	participants: object[];
	round: number;
	winner: object[];
}

const InitialState: Giveaway = {
	giveaway_type: '',
	project_contract_address: '',
	giveaway_amount: 0,
	participants: [],
	round: 0,
	winner: []
};

const sessionState = browser && sessionStorage.getItem('giveaway');
export const giveaway = writable(sessionState ? JSON.parse(sessionState) : InitialState);

giveaway.subscribe((state) => {
	browser && sessionStorage.setItem('giveaway', JSON.stringify(state));
});
