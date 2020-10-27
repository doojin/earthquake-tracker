import { ParsedQs as RequestQuery } from 'qs'
import { Query } from 'usgs-earthquake-api'

function parseNumberParameter (requestQuery: RequestQuery, param: string, parseFunction: (str: string) => number,
  defaultValue: number = null, min: number = null, max: number = null) {
  let value = defaultValue

  if (requestQuery[param] !== undefined) {
    value = parseFunction(requestQuery[param] as string)
    value = isNaN(value) ? defaultValue : value
    value = value !== null && min !== null ? Math.max(value, min) : value
    value = value !== null && max !== null ? Math.min(value, max) : value
  }

  return value
}

function parseIntegerParameter (requestQuery: RequestQuery, param: string, defaultValue: number = null,
  min: number = null, max: number = null) {
  return parseNumberParameter(requestQuery, param, parseInt, defaultValue, min, max)
}

function parseDecimalParameter (requestQuery: RequestQuery, param: string, defaultValue: number = null,
  min: number = null, max: number = null) {
  return parseNumberParameter(requestQuery, param, parseFloat, defaultValue, min, max)
}

function getLimit (requestQuery: RequestQuery): number {
  return parseIntegerParameter(requestQuery, 'limit', 100, 1, 1000)
}

function getLatitude (requestQuery: RequestQuery): number {
  return parseDecimalParameter(requestQuery, 'latitude', null, -90, 90)
}

function getLongitude (requestQuery: RequestQuery): number {
  return parseDecimalParameter(requestQuery, 'longitude', null, -180, 180)
}

function getRadiusKm (requestQuery: RequestQuery): number {
  return parseDecimalParameter(requestQuery, 'radius', null, 0, 20_000)
}

function getMinMagnitude (requestQuery: RequestQuery): number {
  return parseDecimalParameter(requestQuery, 'minMagnitude')
}

function getMaxMagnitude (requestQuery: RequestQuery): number {
  return parseDecimalParameter(requestQuery, 'maxMagnitude')
}

function getStartTime (requestQuery: RequestQuery): string {
  return requestQuery.startTime as string || null
}

function getEndTime (requestQuery: RequestQuery): string {
  return requestQuery.endTime as string || null
}

function getMinDepth (requestQuery: RequestQuery): number {
  return parseDecimalParameter(requestQuery, 'minDepth', null, -100, 1000)
}

function getMaxDepth (requestQuery: RequestQuery): number {
  return parseDecimalParameter(requestQuery, 'maxDepth', null, -100, 1000)
}

function assignIfNotNull <T extends keyof Query>
(query: Query, requestQuery: RequestQuery, prop: T, getter: (requestQuery: RequestQuery) => Query[T]) {
  const value = getter(requestQuery)
  if (value !== null) {
    query[prop] = value
  }
}

export default {
  build (requestQuery: RequestQuery): Query {
    const query: Query = {}

    assignIfNotNull(query, requestQuery, 'limit', getLimit)
    assignIfNotNull(query, requestQuery, 'latitude', getLatitude)
    assignIfNotNull(query, requestQuery, 'longitude', getLongitude)
    assignIfNotNull(query, requestQuery, 'maxradiuskm', getRadiusKm)
    assignIfNotNull(query, requestQuery, 'minmagnitude', getMinMagnitude)
    assignIfNotNull(query, requestQuery, 'maxmagnitude', getMaxMagnitude)
    assignIfNotNull(query, requestQuery, 'starttime', getStartTime)
    assignIfNotNull(query, requestQuery, 'endtime', getEndTime)
    assignIfNotNull(query, requestQuery, 'mindepth', getMinDepth)
    assignIfNotNull(query, requestQuery, 'maxdepth', getMaxDepth)

    return query
  }
}
