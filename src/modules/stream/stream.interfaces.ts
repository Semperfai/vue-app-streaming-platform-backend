import { Request } from 'express'

export interface AddMagnetRequest extends Request {
	params: {
		magnetUrl: string
	}
}