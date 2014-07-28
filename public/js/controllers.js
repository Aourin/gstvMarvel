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
				$scope.loading = true;
				promise.then(
					function(characters){
						$scope.characters = characters;
						$scope.loading = false;
						chars = characters;
					},
					function(error){
						$scope.error = error;
						$scope.loading = false;
					});
			}
			$scope.showCharacter = function(id){

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
	.controller('CharacterShowController',['$scope','$stateParams','Marvel','Tag',
		function($scope,$stateParams,Marvel,Tag){
			$scope.Tag = new Tag({tag: 'CharacterShowController:'});
			console.log($stateParams);
			$scope.Tag.log($stateParams.character_id);
			$scope.character = Marvel.showCharacter($stateParams.character_id);
			console.log($scope.character);
		}
	]);
	var chars;
