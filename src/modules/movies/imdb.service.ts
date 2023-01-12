import { convertMovie, IMDBRequests } from './helper/imdb.helper'
import { IMDBMovie, Movie } from './movies.interfaces'

const { searchMovie, getMovie } = IMDBRequests()
export const searchInIMDB = async (query: string): Promise<Partial<IMDBMovie>> => {
	const {
		data: { results }
	} = await searchMovie(query)
	const [movie] = results

	return movie
}

export const getMovieFromIMDB = async (IMDBId: string): Promise<Partial<Movie>> => {
	const { data } = await getMovie(IMDBId)
	return convertMovie(data)
}