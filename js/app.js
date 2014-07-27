var app = angular.module('app',
	[
		'ui.bootstrap',
		'ui.router',
		'app.controllers',
		'app.services',
		'ngResource'
	]
);


var appControllers = angular.module('app.controllers',[]);
var appServices = angular.module('app.services',[]);
//Configuration and routing
app.config(['$stateProvider','$urlRouterProvider',
	function($stateProvider,$urlRouterProvider){
		$stateProvider.
			state('home',{
				url: '/home',
				template: 'MOOO',
				controller: 'MainController'
			})
			.state('characters',{
				url: '/',
				templateUrl: 'partials/characters.list.html',
				controller: 'CharacterListController'
			});

		$urlRouterProvider.otherwise('home');
	}
]);

appControllers
	.controller('MainController',[
		function(){
			console.log('main');
		}
	])
	.controller('CharacterListController', ['$scope','Marvel',
		function($scope,Marvel){
			console.log('character');
			$scope.characters = [
				{name: "Harry",description:"really cool", thumbnail: "http://i.annihil.us/u/prod/marvel/i/mg/9/30/535feab462a64.jpg"},
				{name: "Super Guy",description: "really cool too", thumbnail: "http://i.annihil.us/u/prod/marvel/i/mg/9/30/535feab462a64.jpg"},
				{name: "Awesomo" , description: " Not so cool", thumbnail: "http://i.annihil.us/u/prod/marvel/i/mg/9/30/535feab462a64.jpg"}
			];
			$scope.getCharacters = function(){
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
