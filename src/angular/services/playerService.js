angular.module("ePartsTest").factory("playersAPI", ($http, config)=>{
    const _get = function(){
        return $http({
            url: config.baseUrl + '/jogadores',
            method: 'GET'
        })
    }

    const _post = function(player){
        return $http.post(config.baseUrl + "/jogadores", player)
    }

    const _delete = function(playerID){
        return $http.delete(config.baseUrl + "/jogadores/" + playerID)
    }

    const _put = function(playerID, update){
        return $http.put(config.baseUrl + "/jogadores/" + playerID, update)
    }

    return {
        readPlayers : _get,
        createPlayer : _post,
        deletePlayer : _delete,
        updatePlayer : _put
    }
})