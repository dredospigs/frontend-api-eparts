require('angular');
require('angular-mocks');
require('../app');
require('../values/configValue');
require('./playerService');

describe('Player Service', function () {

  beforeEach(function () {
    angular.mock.module('ePartsTest');
  });

  var _playerService;
  var configs, httpBackend, rootScope

  beforeEach(inject((playersAPI, $httpBackend, config, $rootScope) => {
    _playerService = playersAPI
    httpBackend = $httpBackend
    rootScope = $rootScope
    configs = config
  }));

  describe('Player Service', function () {
    it('should get all players', async function () {
      httpBackend.whenGET(configs.baseUrl + '/jogadores')
      .respond(200, [{
        name: 'Elaina',
        coins: 10
      }])

      var res = _playerService.readPlayers()
      httpBackend.flush()

      res.then(function (response) {
        const result = response.data
        expect(result[0].name).toEqual('Elaina')
        expect(result[0].coins).toEqual(10)
      })
    })

    it('should check if the post service was called', async function(){
      httpBackend.whenPOST(configs.baseUrl + '/jogadores').respond(200)

      var res = _playerService.createPlayer()
      httpBackend.flush()

      res.then(function(response) {
        const result = response.data
        expect(result.status).toEqual(200)
      })
    })
  })
});
