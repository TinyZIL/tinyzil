import { Rate } from "types/rate.interface"

export default async function getRates(): Promise<Rate[]>  {
  const res = await fetch(`${process.env.BACKEND_URL}/rates`)
  return await res.json()
}