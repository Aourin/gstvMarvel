appServices.service("Marvel",["$rootScope","$resource","Tag","$q",
	function($rootScope,$resource,Tag,$q){
		//Instantiate a new MarvelAPI with options
		var api = new MarvelApi({
			apiKey :"7ac0dc0b1cb2d8d6f1d0597f5f8ea7a2",
			apiBase : "http://localhost",
			apiVersion : "/api/v1"
		});
		//Creates a service tagger
		Tag = new Tag({tag: "MarvelService: "});

		//initializes the character collection via localStorage
		var characters = localStorage.getItem('characters');
		this.characters =  characters !== undefined ? angular.fromJson(characters) : {};

		//CharacterList resource
		this.CharactersList = $resource(api.Characters,{
			id: "@id",
			name: "@name"
		});

		//service function to retrieve characters 
		this.getCharacters = function(name,offset){
			var offest = offset || 0;
			var deferred = $q.defer();
			//performs resource GET
			this.CharactersList.get({name: name,offset:offset})
				.$promise.then(
					function(characters){
						Tag.log("retrieved character promise");
						Tag.log(characters);
						this.characters = characters.data;
						localStorage.setItem('characters',angular.toJson(characters.data));
						deferred.resolve(this.characters);
				},
					function(response){
						Tag.error(response.error);
						deferred.rejected(response.error);
				});
			return deferred.promise;
		}
	}
]);
//Character Collection Service
appServices.service('Characters',['$scope',
	function($scope){
		this.list = {};
		this.getCharacter = function(id){
			return _.find(this.list, {id: id});

		}
	}
])
//Marvel API Options Object
function MarvelApi(options){
	this.apiKey = options.apiKey;
	this.apiBase = options.apiBase;
	this.apiVersion = options.apiVersion;
	this.apiPath = this.apiBase + this.apiVersion;
	this.Characters = this.apiPath + "/characters/:id";
	this.Comics = this.apiPath + "/comics";
}