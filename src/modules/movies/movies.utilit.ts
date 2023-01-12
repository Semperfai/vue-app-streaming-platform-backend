import { parse } from "qs"
import { MAGNET_KEY, SPLIT_MAGNET_STRING } from "./movies.const"

export const extractMagnetFromQuery = (query: string) => {
	const parseMagnetLink = parse(query)
	return String(parseMagnetLink[MAGNET_KEY]).replace(SPLIT_MAGNET_STRING, '')
}