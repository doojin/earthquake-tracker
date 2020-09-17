import earthquakes from './earthquakes'
import { Request, Response } from 'express'
import earthquakeApi from 'usgs-earthquake-api'

jest.mock('usgs-earthquake-api')

describe('/earthquakes handler', () => {
  let req: Request
  let res: Response

  beforeEach(() => {
    res = {
      json: jest.fn()
    } as any as Response
  })

  test('does correct API query', async () => {
    await earthquakes(req, res)

    expect(earthquakeApi.query.earthquakes).toHaveBeenCalledTimes(1)
    expect(earthquakeApi.query.earthquakes).toHaveBeenCalledWith({ limit: 20 })
  })
})
