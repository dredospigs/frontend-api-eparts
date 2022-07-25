require('angular');
require('angular-mocks');
require('../app');
require('./playerController');

describe('Players Controller', function () {

  beforeEach(function () {
    angular.mock.module('ePartsTest');
  });

  const fakePromise = () => new Promise((resolve) => resolve)

  const _playersAPI = {
    readPlayers: fakePromise,
    createPlayer: fakePromise,
    deletePlayer: fakePromise,
    updatePlayer: fakePromise,
  }

  let controller;
  let rootScope

  beforeEach(inject(($controller, $rootScope) => {
    rootScope = $rootScope
    controller = $controller
  }));

  describe('Order controller', function () {
    it('should return the right criterion and direction of the order by name', function () {
      const vm = newControllerInstance()
      vm.orderBy('Jogador A-Z')

      expect(vm.orderCriterion).toEqual('name')
      expect(vm.orderDirection).toEqual(false)
    })

    it('should return the right criterion and direction of the order by coins', function () {
      const vm = newControllerInstance()
      vm.orderBy('Moedas Asc')

      expect(vm.orderCriterion).toEqual('coins')
      expect(vm.orderDirection).toEqual(true)
    })
  })

  describe('Modal controller', function (){    
    let spy;
    let mockElement;
    beforeAll(() => {
      spy = jest.spyOn(document, 'getElementById'); 
    });
    beforeAll(() => {
      mockElement = document.createElement('btnSave')
      spy.mockReturnValue(mockElement);
    });

    it('should change the newPlayer status to true when addModal is called', function (){
      const vm = newControllerInstance()
      vm.addModal([])
      expect(vm.newPlayer).toEqual(true)
    })

    it('should set right Modal Title and set the NewPlayer as false when updateModal is called', function (){
      const vm = newControllerInstance()
      let data = {"name" : "auby"}

      vm.updateModal(data)
      expect(vm.modalTitle).toEqual('Editar Jogador - auby')
      expect(vm.newPlayer).toEqual(false)
    })

    it('should check if the deleteName matches with the name on the object when deleteModal is called', function(){
      const vm = newControllerInstance()
      let data = {"name" : "mewo"}

      vm.deleteModal(data)
      expect(vm.deleteName).toEqual('mewo')
    })
  })

  describe('Other function', () => {    
    it('should initialize with the default informations', function (){
      const vm = newControllerInstance()

      expect(vm.users).toEqual([])
      expect(vm.newPlayer).toEqual(false)
    })
  })

  function newControllerInstance () {
    const scope = rootScope.$new()
    controller('mainController', {
      $scope: scope,
      playersAPI: _playersAPI
    })

    return scope
  }
});

