import { Request, Response } from 'express'
import earthquakeApi from 'usgs-earthquake-api'
import queryBuilder from './query/query-builder'

export default async (req: Request, res: Response) => {
  const query = queryBuilder.build(req.query)
  const earthquakes = await earthquakeApi.query.earthquakes(query)
  res.json(earthquakes)
}
