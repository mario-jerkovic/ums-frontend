/**
 * Created by nikolaykozhukharenko on 4/24/16.
 */

import chai, {expect} from 'chai';
chai.should();
import {isDictLoaded, createDataMap} from './helpers'

describe('dictionary helper', () => {

  let listOfDict = ['dic_01', 'dic_02'];
  let dictState = {
    'dic_01': {
      isLoading: false,
      resources: [1,3,4]
    },
    'dic_02': {
      isLoading: false,
      resources: [5,7,9]
    }
  };

  describe('isDictLoaded fn', () => {

    it('should throw an error if wrong parameters were passed', () => {
      expect(isDictLoaded.bind({}, false, 1)).to.throw(Error)
    });
    
    it('should return "false" if dictionaries state it empty', () => {
      isDictLoaded([], {}).should.equal(false)
    });

    it('should throw an error if dic does not exists', () => {
      expect(isDictLoaded.bind({}, ['DontExistDictName'], dictState))
        .to.throw(ReferenceError)
    });

    it('should not throw an error if listOfDict eq to string', () => {
      expect(isDictLoaded.bind({}, 'dic_01', dictState))
        .to.not.throw(Error)
    });

    it('should return "true" if data for dictionaries exists', () => {
      isDictLoaded(listOfDict, dictState).should.equal(true)
    });

    it('should return "false" if one of dict "isLoading" right now', () => {
      isDictLoaded(listOfDict, {
        'dic_01': {
          isLoading: true,
          resources: [1,3,5]
        },
        'dic_02': {
          isLoading: false,
          resources: [4,6,7]
        }
      }).should.equal(false)
    });

    it('should return "false" if one of dict do not have "resources" field ', () => {
      isDictLoaded(listOfDict, {
        'dic_01': {
          isLoading: false
        },
        'dic_02': {
          isLoading: false,
          resources: [4,6,7]
        }
      }).should.equal(false)
    });

    it('should return "false" if one of dict has an empty "resources"', () => {
      isDictLoaded(listOfDict, {
        'dic_01': {
          isLoading: false,
          resources: [1,3,5]
        },
        'dic_02': {
          isLoading: false,
          resources: []
        }
      }).should.equal(false)
    });

    it('should return "true" when one dict (as a string) was passed ', () => {
      isDictLoaded('dic_011', {
        'dic_011': {
          isLoading: false,
          resources: [1,3,5]
        },
        'dic_02': {
          isLoading: false,
          resources: []
        }
      }).should.equal(true)
    });
  });


  describe('isDictLoaded fn', () => {
    it('should return an array', () => {
      expect(createDataMap([
        {
          id: 0,
          name: 'name_01'
        }
      ])).to.be.instanceof(Array);
    });
    
    it('should return a map', () => {
      expect(createDataMap([
        {
          id: 0,
          name: 'name_01'
        },
        {
          id: 1,
          name: 'name_02'
        }
      ])).to.eql(['name_01','name_02'])
    });

    it('should return a map when id order is different', () => {
      expect(createDataMap([
        {
          id: 1,
          name: 'name_01'
        },
        {
          id: 3,
          name: 'name_02'
        }
      ])).to.eql([,'name_01',,'name_02'])
    });
  })
});