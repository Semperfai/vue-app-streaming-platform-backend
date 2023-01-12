import {
	CrewMember,
	GetCreditsResponse,
	GetVideosResponse,
	IMDBMovie,
	Movie,
	SearchMoviesResponse
} from '../movies.interfaces'

import axios from 'axios'
import { stringify } from 'qs'
import { IMDB_SEARCH_URL } from '../movies.const'

import 'dotenv/config'

const findCrewMember = (crew: CrewMember[], memberJob: string) => crew.find(({ job }) => job === memberJob).name || ''

export const IMDBRequests = () => {
	const queryParams = stringify({
		language: 'ru-RU',
		api_key: process.env.IMDB_API_KEY
	})
	const MOVIE_URL = `${IMDB_SEARCH_URL}/movie`

	return {
		getMovie: (IMDBId: string) => axios.get<IMDBMovie>(`${MOVIE_URL}/${IMDBId}?${queryParams}`),
		getMovieCredits: (IMDBId: number) => axios.get<GetCreditsResponse>(`${MOVIE_URL}/${IMDBId}/credits?${queryParams}`),
		searchMovie: (query: string) =>
			axios.get<SearchMoviesResponse>(`${MOVIE_URL}/search/movie?${queryParams}&query=${query}`),
		getVideos: (IMDBId: number) => axios.get<GetVideosResponse>(`${MOVIE_URL}/${IMDBId}/videos?${queryParams}`)
	}
}
const { getMovieCredits, getVideos } = IMDBRequests()

export const movieCredits = async (IMDBId: number) => {
	try {
		const {
			data: { crew, cast }
		} = await getMovieCredits(IMDBId)
		const actors = cast.map(({ name }) => name)

		return {
			actors,
			director: findCrewMember(crew, 'Director'),
			writer: findCrewMember(crew, 'Writer')
		}
	} catch (error) {
		console.log(error)
		return {
			actors: [],
			director: '',
			writer: ''
		}
	}
}

export const getTrailer = async (IMDBId: number) => {
	try {
		const {
			data: { results }
		} = await getVideos(IMDBId)
		const { key } = results.find(({ type }) => type === 'Trailer')
		return `https://www.themoviedb.org/video/play?key=${key}`
	} catch (error) {
		console.log(error)
		return ''
	}
}

export const convertMovie = async ({
	title,
	overview,
	release_date,
	id,
	poster_path,
	backdrop_path,
	revenue,
	runtime,
	vote_average,
	imdb_id,
	genres
}: IMDBMovie): Promise<Partial<Movie>> => {
	const { actors, director, writer } = await movieCredits(id)
	return {
		title,
		plot: overview,
		year: String(new Date(release_date).getFullYear),
		director,
		actors,
		poster: `https://image.tmdb.org/t/p/w1280${poster_path}`,
		backdrop: `https://image.tmdb.org/t/p/w1280${backdrop_path}`,
		trailer: await getTrailer(id),
		boxOffice: String(revenue),
		released: release_date,
		writer,
		runtime: String(runtime),
		ratingImdb: String(vote_average),
		imdbId: imdb_id,
		rated: '',
		genres: genres.map(({ name }) => name)
	}
}