/* eslint-disable no-undef */
const { Given, When, Then } = require('@cucumber/cucumber');
const { expect, selectors } = require('@playwright/test');

const url = 'http://127.0.0.1:5500/';




async function buttonClick(buttonId) {
	await page.click(`[id="${buttonId}"]`, { force: true });
}

async function buttonRightClick(buttonId) {
	await page.locator(`[id="${buttonId}"]`).click({ button: "right" });
  }

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

Then('the image display should have a {string} face',async function (string) {
	let face = await page.locator('#face');
	face= await face.innerText();
	expect(face).toBe(string);
});

Then('the timer display should be {string}',async function (string) {
	let timer = await page.locator('#timer');
	timer= await timer.innerText();
	expect(timer).toBe(string);
});

When('the user discover the square {string}',async function (string) {
	await buttonClick(string);
});

Then('the square state should change to:{string}',async function (string) {
	let locator =await page.locator('[id="0-0"]');
	locator =await locator.getAttribute("class");
	expect(locator.includes("reveledcells")).toBeTruthy();
});

When('the user click the square {string}',async function (string) {
	let locator;
	locator = await page.locator(`[id="${string}"]`);
	await buttonClick(string);
});

Then('the square {string} state should change to:{string}',async function (string, string2) {
	let locator =await page.locator('[id="0-0"]');
	locator =await locator.getAttribute("class");
	expect(locator.includes("reveledcells")).toBeTruthy();
});

Then('the image display should be {string} face',async function (string) {
	let face = await page.locator('#face');
	face= await face.innerText();
	expect(face).toBe(string);
});

Then('the user should loose the game',async function () {
	let face = await page.locator('#face');
	face= await face.innerText();
	expect(face).toBe("sad");
});

Then('the bomb in the square {string} should be highlighted',async function (string) {
	let locator;
	locator = await page.locator(`[id="${string}"]`);
	locator =await locator.getAttribute("class");
	expect(locator.includes("reveledbomb")).toBeTruthy();
});

Then('all bombs status should change to {string}',async function (string) {
	let numero = await  page.locator('.reveledbomb');
	numero = await numero.count();
	expect(numero).toBe(7);
});

Then('the square {string} should display {string}',async function (string, string2) {
	let locator = await page.locator(`[id="${string}"]`).innerText();
	expect(locator).toBe(string2);
});

Then('the square {string} should be empty',async function (string) {
	let locator = await page.locator(`[id="${string}"]`).innerText();
	expect(locator).toBe("");
});

Then('the square {string} should be {string}',async function (string, string2) {
	let locator = await page.locator(`[id="${string}"]`).innerText();
	expect(locator).toBe(string2);
});

Given('the square {string} is {string}',async function (string, string2) {
	if (string2 == "!") {
		await buttonRightClick(string);
	}else if (string2 == "?") {
		await buttonRightClick(string);
		await buttonRightClick(string);
	}
});

When('the user tag the {string}',async function (string) {
	await buttonRightClick(string);
});

Then('the visual data should change to {string}',async function (string) {
	let locator = await page.locator(`[id="0-1"]`).innerText();
	let tag;
	if (string == "!") {
		tag = "\u{1F6A9}";
	}else if (string == "?") {
		tag = "\u{2753}";
	}else{
		tag = "";
	}
	expect(locator).toBe(tag);
});

Then('the counter should display {string}',async function (string) {
	let locator = await page.locator(`[id="reminingBombCounter"]`).innerText();
	expect(locator).toBe(string);
});

Given('the user mark as mined {string},{string} and {string}',async function (string, string2, string3) {
	await buttonRightClick(string);
	await buttonRightClick(string2);
	await buttonRightClick(string3);
});

Then('The {string} should be marked with !',async function (string) {
	let locator = await page.locator(`[id="${string}"]`).innerText();
	expect(locator).toBe("\u{1F6A9}");
});

Then('the user should win',async function () {
	let face = await page.locator('#face');
	face= await face.innerText();
	expect(face).toBe("happy");
});

Then('the image should display an {string} face',async function (string) { 
	let face = await page.locator('#face');
	face= await face.innerText();
	expect(face).toBe(string);
});

When('the user press on the image display',async function () {
	await buttonClick("face");
});

Then('the face image should be {string} face',async function (string) {
	let face = await page.locator('#face');
	face= await face.innerText();
	expect(face).toBe(string);
});

Then('all squares should be disabled',async function () {
	let locator =await page.locator('[id="board"]');
	locator =await locator.getAttribute("class");
	expect(locator.includes("noclick")).toBeTruthy();
});