import { DEFAULT_API_CONFIG } from "$lib/constants";
import { json } from "@sveltejs/kit";

import type { RequestHandler } from './$types';
export const GET = (async ({ url, fetch }) => {
  const query = url.searchParams.get('q') || ''

  const response = await fetch(`https://api.infojobs.net/api/9/offer?q=${query}`, DEFAULT_API_CONFIG)
  const data = await response.json()

  return json(data)
}) satisfies RequestHandler; 
