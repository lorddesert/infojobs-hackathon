import { error } from "@sveltejs/kit"
import { DEFAULT_API_CONFIG } from "$lib/constants"

export async function load(event) {

  const response = await event.fetch(`infojobs/api/9/offer`, DEFAULT_API_CONFIG)

  if (!response.ok)
    return error(response.status, `
    ERROR: ${response.statusText}
    BODY USED: 
    ${JSON.stringify(response.bodyUsed)}
    `)

  const data = await response.json()


  return {
    offerList: data
  }
} 