import path from 'path'
import { Request, Response } from 'express'

export default async (req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, '../../frontend/build/index.html'))
}
