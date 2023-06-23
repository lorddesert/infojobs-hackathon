import { writable } from 'svelte/store';

export const offerList = writable([]);

/**
 * @param {string} query
 */
export async function  updateOffers(query) {
  if (!query) {
    return;
  }

  const response = await fetch(`/api/offer?q=${query}`);

  const data = await response.json();

  if (!response.ok) throw new Error(`${response.status}: ${response.statusText}`)

  offerList.set(data.offers);

  return true
}
