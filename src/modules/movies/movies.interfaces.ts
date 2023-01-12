import { Request } from 'express'

export interface SearchRequest extends Request {
	query: {
		searchTerm: string
	}
}

export interface GetMovieFromIMDBRequest extends Request {
	params: {
		IMDBId: string
	}
}

export interface CreateMovieRequest extends Request {
	body: Movie
}

export interface UpdateMovieRequest extends Request {
	body: Partial<Movie>
	params: {
		id: string
	}
}

export interface DeleteMovieRequest extends Request {
	params: {
		id: string
	}
}

export interface GetMovieRequest extends Request {
	params: {
		id: string
	}
}

export interface Movie {
	title: string
	plot: string
	year: string
	magnet: string
	fileName: string
	sourceUrl: string
	director: string
	actors: string[]
	poster: string
	backdrop: string
	trailer: string
	_id?: string
	boxOffice: string
	released: string
	writer: string
	runtime: string
	ratingImdb: string
	imdbId: string
	rated: string
	genres: string[]
}

export interface IMDBMovie {
	adult: boolean
	backdrop_path: string
	belongs_to_collection: Belongstocollection
	budget: number
	genres: Genre[]
	homepage: string
	id: number
	imdb_id: string
	original_language: string
	original_title: string
	overview: string
	popularity: number
	poster_path: string
	production_companies: Productioncompany[]
	production_countries: Productioncountry[]
	release_date: string
	revenue: number
	runtime: number
	spoken_languages: Spokenlanguage[]
	status: string
	tagline: string
	title: string
	video: boolean
	vote_average: number
	vote_count: number
}

export interface Spokenlanguage {
	english_name: string
	iso_639_1: string
	name: string
}

export interface Productioncountry {
	iso_3166_1: string
	name: string
}

export interface Productioncompany {
	id: number
	logo_path: string
	name: string
	origin_country: string
}

export interface Genre {
	id: number
	name: string
}

export interface Belongstocollection {
	id: number
	name: string
	poster_path: string
	backdrop_path: string
}

export interface CrewMember {
	adult: boolean
	gender: number
	id: number
	known_for_department: string
	name: string
	original_name: string
	popularity: number
	profile_path?: any
	credit_id: string
	cast_id?: string
	character?: string
	department: string
	job: string
	order: number
}

export interface IMDBTrailer {
	iso_639_1: string
	iso_3166_1: string
	name: string
	key: string
	site: string
	size: number
	type: string
	official: boolean
	published_at: string
	id: string
}

export interface GetCreditsResponse {
	id: number
	cast: CrewMember[]
	crew: CrewMember[]
}

export interface GetVideosResponse {
	id: number
	results: IMDBTrailer[]
}

export interface SearchMoviesResponse {
	page: number
	results: Partial<IMDBMovie>[]
	total_pages: number
	total_results: number
}