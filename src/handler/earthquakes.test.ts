import earthquakes from './earthquakes'
import queryBuilder from './query/query-builder'
import { Request, Response } from 'express'
import earthquakeApi from 'usgs-earthquake-api'

jest.mock('usgs-earthquake-api')
jest.mock('./query/query-builder')
jest.mock('../translator/api-response-translator')

describe('/earthquakes handler', () => {
  let req: Request
  let res: Response

  beforeEach(() => {
    req = {
      query: {}
    } as any as Request

    res = {
      json: jest.fn()
    } as any as Response
  })

  test('does correct API query', async () => {
    (queryBuilder.build as jest.Mock).mockReturnValue({ limit: 20 })

    await earthquakes(req, res)

    expect(earthquakeApi.query.earthquakes).toHaveBeenCalledTimes(1)
    expect(earthquakeApi.query.earthquakes).toHaveBeenCalledWith({ limit: 20 })
  })
})
