appControllers
	.controller('MainController',[
		function(){
			console.log('main');
		}
	])
	.controller('CharacterListController', ['$scope','Marvel','Tag','$q',
		function($scope,Marvel,Tag,$q){
			$scope.Tag = new Tag({tag: 'CharacterListController:'});
			$scope.characters = Marvel.characters;
			//Search function which calls the Marvel service
			$scope.search = function(){
				var name = $scope.searchQuery;
				console.log(name);
				var promise = Marvel.getCharacters(name)
				promise.then(function(){
					console.log('resolved');
				});
			}
			//A Function made just to moo for fun
			$scope.moo = function(){
				console.log('moo');
			}
			//Watch the characters collection for changes and update
			$scope.$watchCollection('characters',function(oldColl,newColl){
				$scope.Tag.log('character collection updated');
				
			});
		}
	])
	.controller('CharacterShowController',['$scope','$stateParams','Marvel',
		function($scope,$stateParams,Marvel){
			$scope.Tag = new Tag({tag: 'CharacterShowController:'});
			$scope.getCharacter = function(){
				// Marvel.Characters
				// 	.get({id: $stateParams.character_id})
				// 	.$promise.then(function(character){
				// 		console.log(character);
				// 		$scope.character = character;
				// 	});
			}
		}
	]);
