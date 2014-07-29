appControllers
	//Character List Controller
	.controller('CharacterListController', ['$scope','Marvel','Tag','$q',
		function($scope,Marvel,Tag,$q){
			$scope.Tag = new Tag({tag: 'CharacterListController:'});
			$scope.characters = Marvel.characters;
			//Search function which calls the Marvel service
			$scope.search = function(){
				var name = $scope.searchQuery;
				console.log(name);
				//Creates a promie on the Marvel service to retrieve characters
				var promise = Marvel.getCharacters(name);
				$scope.loading = true;
				promise.then(
					//Successful promise sets the characters collection
					function(characters){
						$scope.characters = characters;
						$scope.loading = false;
					},
					//Failed/Rjected Promise
					function(error){
						$scope.error = error;
						$scope.loading = false;
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
	//Character Show Controller 
	.controller('CharacterShowController',['$scope','$stateParams','Marvel','Tag',
		function($scope,$stateParams,Marvel,Tag){  
			$scope.Tag = new Tag({tag: 'CharacterShowController:'});
			//Randomizes some stats for display
			$scope.stats = {};
			$scope.stats.carry = Math.random() * 100;
			$scope.stats.support = Math.random() * 100;
			$scope.stats.tank = 100 - $scope.stats.carry - $scope.stats.support;
			$scope.stats.difficulty = Math.random() * 100;

			//Init the character from local or serer
			$scope.character = Marvel.showCharacter($stateParams.character_id);
			
			//Check if character is in a local collection
			if($scope.character == undefined){
				//request character from backend if not
				var promise = Marvel.getCharacter($stateParams.character_id);
				promise.then(function(character){
					$scope.character = character;
					$scope.getComics();  //Once character is set, retrieve comics
				},function(){
					$state.go('characters');
				});
			} else{

			}
			//Set selected deault
			$scope.selected = 'profile';

			//Retrieve comics for character
			$scope.getComics = function(){
				var promise = Marvel.getCharacterComics($scope.character.id);
				$scope.loading = true;
				promise.then(
					//Successful Resolve of comics sets collection
					function(comics){
						$scope.comics = comics;
						$scope.loading = false;
						chars = comics;
					},
					function(error){
						$scope.error = error;
						$scope.loading = false;
					});
			}
			//Watch characters object
			var characters = $scope.$watch('characters',function(oldval,newval){
				$scope.Tag.log('char change');
				$scope.getComics();
			});
			//Destroys characters watch
			$scope.$on('destroy',function(){
				characters();
			})
		}
	]);
