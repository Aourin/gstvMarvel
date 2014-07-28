//Application module and dependencies
var app = angular.module('app',
	[
		'ui.bootstrap',
		'ui.router',
		'app.controllers',
		'app.services',
		'app.filters',
		'app.directives',
		'ngResource',
		'tag'
	]
); 

var appControllers = angular.module('app.controllers',[]);
var appServices = angular.module('app.services',[]);
var appFilters = angular.module('app.filters',[]);
var appDirectives = angular.module('app.directives',[]);

//Configuration and routing
app.config(['$stateProvider','$urlRouterProvider',
	function($stateProvider,$urlRouterProvider){
		$stateProvider.
			state('home',{
				url: '/app',
				template: 'moo',
				controller: 'MainController'
			})
			.state('characters',{
				url: '/app/characters',
				templateUrl: 'partials/characters.list.html',
				controller: 'CharacterListController'
			})
			.state('characters.show',{
				url: '/:character_id',
				templateUrl: 'partials/characters.show.html',
				controller: 'CharacterShowController'
			});

		$urlRouterProvider.otherwise('characters');
	}
]);
