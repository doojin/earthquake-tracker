import { Feature, QueryApiResponse } from 'usgs-earthquake-api'
import { Earthquake, Position } from '../domain/earthquake'

function translateCoordinates (coordinates: [number, number, number]): Position {
  const [longitude, latitude, depth] = coordinates
  return new Position(longitude, latitude, depth)
}

function translateFeature (feature: Feature): Earthquake {
  const position = translateCoordinates(feature.geometry.coordinates)
  const { title, mag: magnitude, time: timestamp } = feature.properties
  return new Earthquake(feature.id, title, position, magnitude, timestamp)
}

function translate (apiResponse: QueryApiResponse): Array<Earthquake> {
  return apiResponse.features.map(translateFeature)
}

export default {
  translate
}
