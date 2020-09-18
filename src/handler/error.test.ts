import { Request, Response, NextFunction } from 'express'
import handleError from './error'

describe('error handler', () => {
  let reqHandler: (req: Request, res: Response, next: NextFunction) => void
  let req: Request
  let res: Response
  let next: NextFunction

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as any as Response

    global.console.log = jest.fn()
  })

  describe('error is thrown during request handler execution', () => {
    beforeEach(() => {
      reqHandler = (req: Request, res: Response, next: NextFunction) => {
        throw new Error('test error')
      }
    })

    test('sends 500 status with error message', async () => {
      await handleError(reqHandler)(req, res, next)

      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.json).toHaveBeenCalledWith({
        error: true,
        message: 'test error'
      })
    })
  })

  describe('error not thrown during request handler execution', () => {
    beforeEach(() => {
      reqHandler = (req: Request, res: Response, next: NextFunction) => {}
    })

    test('not processes any errors', async () => {
      await handleError(reqHandler)(req, res, next)

      expect(res.status).not.toHaveBeenCalled()
      expect(res.json).not.toHaveBeenCalled()
    })
  })
})
