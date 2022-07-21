angular.module('ePartsTest').controller('mainController', function($scope, playersAPI){
    $scope.users = []  
    $scope.newPlayer = false; 
    var changingPlayer = ''

    function loadPlayers(){
        playersAPI.readPlayers()
        .then((res) => {            
            $scope.users = res.data
        })
    }

    $scope.addModal = function(){
        document.getElementById('nameModal').value = ''
        document.getElementById('coinsModal').value = ''
        document.getElementById('btnSave').disabled = true

        $scope.modalTitle = "Novo Jogador"
        $scope.newPlayer = true;
    }

    $scope.updateModal = function(player){
        document.getElementById('btnSave').disabled = false
        document.getElementById('nameModal').value = player.name
        document.getElementById('coinsModal').value = player.coins

        changingPlayer = player
        $scope.modalTitle = "Editar Jogador - " + player.name
        $scope.newPlayer = false;
    }

    $scope.savePlayer = function(player){
        var sideToast = new bootstrap.Toast(document.getElementById("sideToast"))  

        if($scope.newPlayer){
            playersAPI.createPlayer(player)
            .then(() => {
                delete $scope.user
                loadPlayers()

                $scope.toastHeader = 'toast-header mainBlue text-white'
                $scope.toastBody = {'--bs-bg-opacity': '.9', 'background-color': '#387dcf'}
                $scope.toastTitle = 'Sucesso!'
                $scope.toastText = 'O jogador foi criado!'
                $scope.toastIcon = 'bi bi-check-circle-fill'               
                
                sideToast.show();    
                $('#mainModal').modal('hide');
            })
            .catch(() => {
                $scope.toastHeader = 'toast-header text-bg-danger'
                $scope.toastBody = {'--bs-bg-opacity': '.9', 'background-color': '#c24246'}
                $scope.toastTitle = 'Erro!'
                $scope.toastText = 'Houve um erro ao criar o jogador!'
                $scope.toastIcon = 'bi bi-x-circle-fill'
    
                sideToast.show();
            })
        }
        else{
            playersAPI.updatePlayer(changingPlayer._id, player)
            .then(() => {
                loadPlayers()

                $scope.toastHeader = 'toast-header mainBlue text-white'
                $scope.toastBody = {'--bs-bg-opacity': '.9', 'background-color': '#387dcf'}
                $scope.toastTitle = 'Sucesso!'
                $scope.toastText = 'O jogador foi atualizado!'
                $scope.toastIcon = 'bi bi-check-circle-fill'   
                
                sideToast.show();
                $('#mainModal').modal('hide');
            })
            .catch(() => {
                $scope.toastHeader = 'toast-header text-bg-danger'
                $scope.toastBody = {'--bs-bg-opacity': '.9', 'background-color': '#c24246'}
                $scope.toastTitle = 'Erro!'
                $scope.toastText = 'Houve um erro ao atualizar o jogador!'
                $scope.toastIcon = 'bi bi-x-circle-fill'
                
                $scope.newCoins = ''
                updateToast.hide();
                sideToast.show();
            })  
        
        }
    }

    $scope.orderBy = function(option){
        if(option == 'Jogador A-Z'){            
            $scope.orderCriterion = 'name'
            $scope.orderDirection = false
        }
        else if(option == 'Jogador Z-A'){            
            $scope.orderCriterion = 'name'
            $scope.orderDirection = true
        }
        else if(option == 'Moedas Desc'){            
            $scope.orderCriterion = 'coins'
            $scope.orderDirection = false
        }
        else if(option == 'Moedas Asc'){            
            $scope.orderCriterion = 'coins'
            $scope.orderDirection = true
        }
    }

    $scope.deleteModal = function(player){
        changingPlayer = player
        $scope.deleteName = player.name
    }

    $scope.deletePlayer = function(){
        var sideToast = new bootstrap.Toast(document.getElementById("sideToast"))  

        playersAPI.deletePlayer(changingPlayer._id)
        .then((res)=>{
            $scope.users = $scope.users.filter(function(user){
                if(user._id !== changingPlayer._id) return user
            })

            $scope.toastHeader = 'toast-header mainBlue text-white'
            $scope.toastBody = {'--bs-bg-opacity': '.9', 'background-color': '#387dcf'}
            $scope.toastTitle = 'Sucesso!'
            $scope.toastText = 'O jogador foi deletado!'
            $scope.toastIcon = 'bi bi-check-circle-fill' 

            sideToast.show();
            $('#deleteModal').modal('hide');
        })
        .catch(() => {
            $scope.toastHeader = 'toast-header text-bg-danger'
            $scope.toastBody = {'--bs-bg-opacity': '.9', 'background-color': '#c24246'}
            $scope.toastTitle = 'Erro!'
            $scope.toastText = 'Houve um erro ao deletar o jogador!'
            $scope.toastIcon = 'bi bi-x-circle-fill'

            sideToast.show();
        })
    }

    loadPlayers()
})
