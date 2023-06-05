import { error } from "@sveltejs/kit"
import { DEFAULT_API_CONFIG } from "$lib/constants"
export async function load({ fetch }) {

  const response = await fetch(`infojobs/api/9/offer`, DEFAULT_API_CONFIG)

  if (!response.ok)
    return error(response.status, `
    ERROR: ${response.statusText}
    BODY USED: 
    ${JSON.stringify(response.bodyUsed)}
    `)

  const data = await response.json()
  const offerList = data.offers

  return {
    offerList
  }
} 
