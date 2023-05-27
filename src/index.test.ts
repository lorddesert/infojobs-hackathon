
import { describe, it, expect } from 'vitest';
import type { OfferList } from '$lib/types';
import { DEFAULT_API_CONFIG, INFOJOBS_URL } from '$lib/constants';

const possibleJobTitles = ['Front end', 'Back end']
const defaultParams = (config: string) => `?q=${config}&?salaryMin=20000`

const randomTitleSearchGenerator = () => possibleJobTitles[Math.floor(Math.random() * possibleJobTitles.length)]
describe('Infojobs API', () => {
	it('Should be up!', async () => {
		const response = await fetch(`${INFOJOBS_URL}${defaultParams}`, DEFAULT_API_CONFIG)

		expect(response.ok).toBe(true)
	})
})

describe('Infojobs API offer GET', () => {
	it('Should return a job offer list', async () => {
		const response = await fetch(`${INFOJOBS_URL}${defaultParams}`, DEFAULT_API_CONFIG)
		const data: OfferList = await response.json()

		expect(data.items).toBeDefined()
	})

	it('Should search offer titles where some items matches the user input', async () => {
		const userInput: string = randomTitleSearchGenerator()

		const response = await fetch(`${INFOJOBS_URL}${defaultParams}&?q=${userInput}`, DEFAULT_API_CONFIG)
		const data: OfferList = await response.json()

		console.log(data)

		const matchesUserInput = data.items.some(item => item.title.includes(userInput))
		expect(matchesUserInput).toBe(true)
	})

	it('Should retrieve page number 2', async () => {
		const response = await fetch(`${INFOJOBS_URL}${defaultParams('java')}`, DEFAULT_API_CONFIG)
		const data: OfferList = await response.json()
		const { currentPage } = data

		expect(currentPage).toBe(2)
	})


})

async function getAPIData(TARGET_URL: string) {
	const response = await fetch(`${INFOJOBS_URL}${TARGET_URL}`, DEFAULT_API_CONFIG)
	const data: OfferList = await response.json()

	return data
}
