import { Request, Response, NextFunction } from 'express'

const INTERNAL_SERVER_ERROR = 500

export default fn => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await fn(req, res, next)
  } catch (e) {
    console.log(e.stack)
    res.status(INTERNAL_SERVER_ERROR).json({
      error: true,
      message: e.message
    })
  }
}
