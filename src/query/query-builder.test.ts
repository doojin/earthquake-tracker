import queryBuilder from './query-builder'
import { ParamsDictionary } from 'express-serve-static-core'

describe('query builder', () => {
  let params: ParamsDictionary

  beforeEach(() => {
    params = {}
  })

  describe('parsing limit parameter', () => {
    describe('limit parameter not exists in request parameters', () => {
      beforeEach(() => {
        params.limit = undefined
      })

      test('default value is used', () => {
        const query = queryBuilder.build(params)
        expect(query.limit).toEqual(100)
      })
    })

    describe('limit parameter is not a number', () => {
      beforeEach(() => {
        params.limit = 'notNumber'
      })

      test('default value should be used', () => {
        const query = queryBuilder.build(params)
        expect(query.limit).toEqual(100)
      })
    })

    describe('limit parameter is less than 1', () => {
      beforeEach(() => {
        params.limit = '0'
      })

      test('parameter value should be increased to 1', () => {
        const query = queryBuilder.build(params)
        expect(query.limit).toEqual(1)
      })
    })

    describe('limit parameter is greater than 300', () => {
      beforeEach(() => {
        params.limit = '301'
      })

      test('parameter value should be decreased to 300', () => {
        const query = queryBuilder.build(params)
        expect(query.limit).toEqual(300)
      })
    })
  })

  describe('parsing latitude parameter', () => {
    describe('latitude parameter not exists in request parameters', () => {
      beforeEach(() => {
        params.latitude = undefined
      })

      test('not adding latitude parameter to query', () => {
        const query = queryBuilder.build(params)
        expect(query.latitude).toBeUndefined()
      })
    })

    describe('latitude parameter is not a valid number', () => {
      beforeEach(() => {
        params.latitude = 'notNumber'
      })

      test('not adding latitude parameter to query', () => {
        const query = queryBuilder.build(params)
        expect(query.latitude).toBeUndefined()
      })
    })

    describe('latitude parameter is less than -90', () => {
      beforeEach(() => {
        params.latitude = '-91'
      })

      test('increasing latitude parameter to -90', () => {
        const query = queryBuilder.build(params)
        expect(query.latitude).toEqual(-90)
      })
    })

    describe('latitude parameter is greater than 90', () => {
      beforeEach(() => {
        params.latitude = '91'
      })

      test('decreasing latitude parameter to 90', () => {
        const query = queryBuilder.build(params)
        expect(query.latitude).toEqual(90)
      })
    })
  })

  describe('parsing longitude parameter', () => {
    describe('longitude parameter not exists in query parameters', () => {
      beforeEach(() => {
        params.longitude = undefined
      })

      test('not adding longitude parameter to query', () => {
        const query = queryBuilder.build(params)
        expect(query.longitude).toBeUndefined()
      })
    })

    describe('longitude parameter is not a valid number', () => {
      beforeEach(() => {
        params.longitude = 'notNumber'
      })

      test('not adding longitude parameter to query', () => {
        const query = queryBuilder.build(params)
        expect(query.longitude).toBeUndefined()
      })
    })

    describe('longitude parameter is less than -180', () => {
      beforeEach(() => {
        params.longitude = '-181'
      })

      test('increasing longitude parameter to -180', () => {
        const query = queryBuilder.build(params)
        expect(query.longitude).toEqual(-180)
      })
    })

    describe('longitude parameter is greater than 180', () => {
      beforeEach(() => {
        params.longitude = '181'
      })

      test('decreasing longitude parameter to 180', () => {
        const query = queryBuilder.build(params)
        expect(query.longitude).toEqual(180)
      })
    })
  })

  describe('parsing radius parameter', () => {
    describe('radius parameter not exists in request parameters', () => {
      beforeEach(() => {
        params.radius = undefined
      })

      test('not adding radius parameter to query', () => {
        const query = queryBuilder.build(params)
        expect(query.maxradiuskm).toBeUndefined()
      })
    })

    describe('radius parameter is not a valid number', () => {
      beforeEach(() => {
        params.radius = 'notNumber'
      })

      test('not adding radius parameter to query', () => {
        const query = queryBuilder.build(params)
        expect(query.maxradiuskm).toBeUndefined()
      })
    })

    describe('radius parameter is less than 0', () => {
      beforeEach(() => {
        params.radius = '-1'
      })

      test('increasing radius parameter to 0', () => {
        const query = queryBuilder.build(params)
        expect(query.maxradiuskm).toEqual(0)
      })
    })

    describe('radius parameter is greater than 20.000', () => {
      beforeEach(() => {
        params.radius = '20001'
      })

      test('decreasing radius parameter to 20.000', () => {
        const query = queryBuilder.build(params)
        expect(query.maxradiuskm).toEqual(20_000)
      })
    })
  })

  describe('parsing minMagnitude parameter', () => {
    describe('minMagnitude parameter not exists in request parameters', () => {
      beforeEach(() => {
        params.minMagnitude = undefined
      })

      test('not adding minMagnitude parameter to query', () => {
        const query = queryBuilder.build(params)
        expect(query.minmagnitude).toBeUndefined()
      })
    })

    describe('minMagnitude parameter is not a valid number', () => {
      beforeEach(() => {
        params.minMagnitude = 'notNumber'
      })

      test('not adding minMagnitude parameter to query', () => {
        const query = queryBuilder.build(params)
        expect(query.minmagnitude).toBeUndefined()
      })
    })

    describe('minMagnitude parameter is a valid number', () => {
      beforeEach(() => {
        params.minMagnitude = '13'
      })

      test('adding minMagnitude parameter to query', () => {
        const query = queryBuilder.build(params)
        expect(query.minmagnitude).toEqual(13)
      })
    })
  })

  describe('parsing maxMagnitude parameter', () => {
    describe('maxMagnitude parameter not exists in request parameters', () => {
      beforeEach(() => {
        params.maxMagnitude = undefined
      })

      test('not adding maxMagnitude parameter to query', () => {
        const query = queryBuilder.build(params)
        expect(query.maxmagnitude).toBeUndefined()
      })
    })

    describe('maxMagnitude parameter is not a valid number', () => {
      beforeEach(() => {
        params.maxMagnitude = 'notNumber'
      })

      test('not adding maxMagnitude parameter to query', () => {
        const query = queryBuilder.build(params)
        expect(query.maxmagnitude).toBeUndefined()
      })
    })

    describe('maxMagnitude parameter is a valid number', () => {
      beforeEach(() => {
        params.maxMagnitude = '13'
      })

      test('adding maxMagnitude parameter to query', () => {
        const query = queryBuilder.build(params)
        expect(query.maxmagnitude).toEqual(13)
      })
    })
  })
})
