import { ParamsDictionary } from 'express-serve-static-core'
import { Query } from 'usgs-earthquake-api'

function parseIntegerParameter (params: ParamsDictionary, param: string, defaultValue: number = null,
  min: number = null, max: number = null) {
  let value = defaultValue

  if (params[param] !== undefined) {
    value = parseInt(params[param])
    value = isNaN(value) ? defaultValue : value
    value = value !== null && min !== null ? Math.max(value, min) : value
    value = value !== null && max !== null ? Math.min(value, max) : value
  }

  return value
}

function getLimit (params: ParamsDictionary): number {
  return parseIntegerParameter(params, 'limit', 100, 1, 300)
}

function getLatitude (params: ParamsDictionary): number {
  return parseIntegerParameter(params, 'latitude', null, -90, 90)
}

function getLongitude (params: ParamsDictionary): number {
  return parseIntegerParameter(params, 'longitude', null, -180, 180)
}

function getRadiusKm (params: ParamsDictionary): number {
  return parseIntegerParameter(params, 'radius', null, 0, 20_000)
}

function getMinMagnitude (params: ParamsDictionary): number {
  return parseIntegerParameter(params, 'minMagnitude')
}

function getMaxMagnitude (params: ParamsDictionary): number {
  return parseIntegerParameter(params, 'maxMagnitude')
}

function assignIfNotNull <T extends keyof Query>
(query: Query, params: ParamsDictionary, prop: T, getter: (params: ParamsDictionary) => Query[T]) {
  const value = getter(params)
  if (value !== null) {
    query[prop] = value
  }
}

export default {
  build (params: ParamsDictionary): Query {
    const query: Query = {}

    assignIfNotNull(query, params, 'limit', getLimit)
    assignIfNotNull(query, params, 'latitude', getLatitude)
    assignIfNotNull(query, params, 'longitude', getLongitude)
    assignIfNotNull(query, params, 'maxradiuskm', getRadiusKm)
    assignIfNotNull(query, params, 'minmagnitude', getMinMagnitude)
    assignIfNotNull(query, params, 'maxmagnitude', getMaxMagnitude)

    return query
  }
}
