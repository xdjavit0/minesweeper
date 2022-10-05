/* eslint-disable no-undef */
const { Given, When, Then } = require('@cucumber/cucumber');
const { expect, selectors } = require('@playwright/test');

const url = 'http://127.0.0.1:5500/';


Given('a user opens the app', async () => {
	await page.goto(url);
});

Given('the user charge the data {string}',async function (string) {
	let url_mockdata=url+"?"+string;
	await page.goto(url_mockdata);
});

Then('the board should have {string} and {string}',async function (string, string2) {
	let numero =await  page.locator('.row');
	let row =await numero.count();
	row=await row.toString();

	numero =await  page.locator('#row0 div');
	let column = await numero.count();
	column=await column.toString();

	expect(column,row).toBe(string,string2);
});

Then('all the squares should be hidden',async function () {
	let numero = await  page.locator('.cells');
	numero = await numero.count();
	let numero2=await  page.locator('.hiddencells');
	numero2 = await numero2.count();
	expect(numero).toBe(numero2);
});

Given('load mock data {string}',async function (string) {
	let url_mockdata=url+"?"+string;
	await page.goto(url_mockdata);
});

Then('the non marked bomb counter display should show the following value: {string}',async function (string) {
	let bomb_counter_display = await page.locator('#reminingBombCounter');
	bomb_counter_display= await bomb_counter_display.innerText();
	expect(bomb_counter_display).toBe(string);
});