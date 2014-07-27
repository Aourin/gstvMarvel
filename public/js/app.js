//Application module and dependencies
var app = angular.module('app',
	[
		'ui.bootstrap',
		'ui.router',
		'app.controllers',
		'app.services',
		'app.filters',
		'ngResource'
	]
); 

var appControllers = angular.module('app.controllers',[]);
var appServices = angular.module('app.services',[]);
var appFilters = angular.module('app.filters',[]);
//Configuration and routing
app.config(['$stateProvider','$urlRouterProvider',
	function($stateProvider,$urlRouterProvider){
		$stateProvider.
			state('home',{
				url: '/app',
				template: 'MOOO',
				controller: 'MainController'
			})
			.state('characters',{
				url: '/app/characters',
				templateUrl: 'partials/characters.list.html',
				controller: 'CharacterListController'
			});

		$urlRouterProvider.otherwise('app');
	}
]);

