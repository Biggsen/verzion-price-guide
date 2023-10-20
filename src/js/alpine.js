import Alpine from 'alpinejs';
import collapse from '@alpinejs/collapse';
import persist from '@alpinejs/persist';
import intersect from '@alpinejs/intersect';
import { scroll, xFetch } from './helper';

Alpine.plugin(collapse);
Alpine.plugin(persist);
Alpine.plugin(intersect);

window.Alpine = Alpine;

Alpine.magic('fetchjson', () => {
	return async (url, jsonItem, method) => await xFetch(url, jsonItem, method);
});

Alpine.magic('fetch', () => {
	return async (url, method) => await xFetch(url, null, method);
});

Alpine.magic('scroll', () => {
	return (target, options) => scroll(target, options);
});

Alpine.data('setup', () => ({
	init() {
		this.getItems();
	},
	items: null,
	priceMultiplier: 1,
	sellMargin: 0.3,
	get earth() {
		return this.filterCategory('earth');
	},
	get drops() {
		return this.filterCategory('drops');
	},
	roundPrice(price) {
		return Math.round(price * 100) / 100;
	},
	getItems() {
		fetch('https://api.npoint.io/f5a8e4675589ae12ba3d')
			.then((response) => response.json())
			.then((items) => (this.items = items));
	},
	filterCategory(category) {
		return this.items?.filter((item) => item.category === category);
	},
}));

Alpine.start();
