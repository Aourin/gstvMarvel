appControllers
	.controller('MainController',[
		function(){
			console.log('main');
		}
	])
	.controller('CharacterListController', ['$scope','Marvel','$http',
		function($scope,Marvel,$http){
			console.log('character');
			$scope.characters = [
				{name: "Harry",description:"really cool", thumbnail: "http://i.annihil.us/u/prod/marvel/i/mg/9/30/535feab462a64.jpg"},
				{name: "Super Guy",description: "really cool too", thumbnail: "http://i.annihil.us/u/prod/marvel/i/mg/9/30/535feab462a64.jpg"},
				{name: "Awesomo" , description: " Not so cool", thumbnail: "http://i.annihil.us/u/prod/marvel/i/mg/9/30/535feab462a64.jpg"}
			];
			$scope.getCharacters = function(){
				$http.get('http://localhost/api/v1/moo')
					.then(function(res){
						console.log(res);
					});
				// Marvel.Characters.get()
				// 	.$promise.then(function(characters){
				// 		console.log('characters retrieved');
				// 		$scope.characters = characters.data;
				// 	});
			}

		}
	])
	.controller('CharacterController',['$scope',
		function($scope){
			console.log('character show')

		}
	]);
