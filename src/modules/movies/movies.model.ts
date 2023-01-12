import { Schema, model } from 'mongoose'
import { Movie } from './movies.interfaces'

const entity = new Schema<Movie>({
	title: {
		type: String,
		deafult: ''
	},
	magnet: {
		type: String,
		deafult: ''
	},
	fileName: {
		type: String,
		default: ''
	},
	sourceUrl: {
		type: String,
		default: ''
	},
	plot: {
		type: String,
		deafult: ''
	},
	year: {
		type: String,
		deafult: ''
	},
	director: {
		type: String,
		deafult: ''
	},
	actors: [
		{
			type: String,
			deafult: ''
		}
	],
	backdrop: {
		type: String,
		default: ''
	},
	poster: {
		type: String,
		deafult: ''
	},
	trailer: {
		type: String,
		deafult: ''
	},
	boxOffice: {
		type: String,
		deafult: ''
	},
	released: {
		type: String,
		deafult: ''
	},
	writer: {
		type: String,
		deafult: ''
	},
	runtime: {
		type: String,
		deafult: ''
	},
	ratingImdb: {
		type: String,
		deafult: ''
	},
	imdbId: {
		type: String,
		deafult: ''
	},
	rated: {
		type: String,
		deafult: ''
	},
	genres: [
		{
			type: String,
			deafult: ''
		}
	]
})

entity.index({
	title: 'text',
	writer: 'text'
})

export default model('movie', entity)