import jsdom from 'jsdom';
import axios from 'axios';

const { JSDOM } = jsdom;
const { test } = QUnit;

const url = 'https://al3xback.github.io/fmentor-stats-preview-qunit/';

const getData = () => {
	return axios
		.get(url)
		.then((res) => {
			const { document } = new JSDOM(res.data).window;
			return document;
		})
		.catch((err) => {
			throw new Error(err);
		});
};

QUnit.module('DOM', (hooks) => {
	hooks.beforeEach(async (assert) => {
		try {
			const document = await getData();
			global.document = document;
		} catch (err) {
			console.log(err);
		}
	});

	test("should have a title element with a class of 'card__title'", (assert) => {
		const cardTitleEl = document.querySelector('.card__title');

		assert.ok(cardTitleEl);
	});

	test("should have a desc element with a class of 'card__desc'", (assert) => {
		const cardDescEl = document.querySelector('.card__desc');

		assert.ok(cardDescEl);
	});

	test('should have a mark element in card title element', (assert) => {
		const cardTitleEl = document.querySelector('.card__title');
		const cardMarkEl = cardTitleEl.querySelector('mark');

		assert.ok(cardMarkEl);
	});
});
