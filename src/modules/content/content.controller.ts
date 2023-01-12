import { Router } from 'express';

const router = Router()
router.get('/', (_, res) => {
	res.sendFile('src/views/index.html', {
		root: '.'
	})
})

export default router