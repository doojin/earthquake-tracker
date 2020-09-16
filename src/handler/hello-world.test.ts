import { Request, Response } from 'express'
import helloWorldHandler from './hello-world'

describe('hello-world handler', () => {
  let req: Request
  let res: Response

  beforeEach(() => {
    res = {
      send: jest.fn()
    } as any as Response
  })

  test('sends the hello-world response', () => {
    helloWorldHandler(req, res)

    expect(res.send).toHaveBeenCalledTimes(1)
    expect(res.send).toHaveBeenCalledWith('Hello, world!')
  })
})
