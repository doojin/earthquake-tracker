import { Request, Response } from 'express'
import earthquakeApi from 'usgs-earthquake-api'

export default async (req: Request, res: Response) => {
  const earthquakes = await earthquakeApi.query.earthquakes({ limit: 20 })
  res.json(earthquakes)
}
