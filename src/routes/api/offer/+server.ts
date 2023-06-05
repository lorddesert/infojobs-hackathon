import { DEFAULT_API_CONFIG } from "$lib/constants";
import { error, json } from "@sveltejs/kit";

interface ErrorCodes {
  404: string,
  500: string
}

const ERROR_MESSAGES = {
  404: 'No encontramos la ofera que estas buscando.',
  500: 'El hamster ha dicho que fue una falla tecnica, vuelve a intentar mas tarde!'
}

import type { RequestHandler } from './$types';
export const GET = (async ({ url, fetch }) => {
  const query = url.searchParams.get('q') || ''

  const response = await fetch(`https://api.infojobs.net/api/9/offer?q=${query}`, DEFAULT_API_CONFIG)
  const data = await response.json()
  const resultsFound = data.offers.length

  if (!resultsFound) {
    throw error(404, 'No se encontraron resultados para esta busqueda.')
  }

  if (!response.ok ) {
    const customErrorMessageExists = ERROR_MESSAGES[response.status as keyof ErrorCodes]

    if (!customErrorMessageExists) throw error(response.status, response.statusText);

    throw error(response.status, customErrorMessageExists);
  }

  return json(data)
}) satisfies RequestHandler; 
