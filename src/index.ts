import express from 'express'
import cors from 'cors'
import logger from 'morgan'
import * as path from 'path'
import mongoose from 'mongoose'
//routes
import streamRouter from './modules/stream/stream.controller'
import contentRouter from './modules/content/content.controller'
import moviesRouter from './modules/movies/movies.controller'


import 'dotenv/config'



try {
	console.log(process.env.MONGO_URL);
	mongoose.set("strictQuery", false);
	mongoose.connect(process.env.MONGO_URL, () => {
		console.log("Connected to MongoDB");
	});
} catch (error) {
	console.warn('Connection to mongo failed', error);
	throw error
}



// middleware
const app = express()
app.use(cors())
app.use(express.json())
app.use(logger('dev'))



//endpoints
app.use('/stream', streamRouter)
app.use('/content', contentRouter)
app.use('/movies', moviesRouter)

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
	console.log('start');
	console.log(`http://localhost:${PORT}`);
})