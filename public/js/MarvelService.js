//Marvel Service Resource JS SDK
appServices.service("Marvel",["$rootScope","$resource","Tag","$q",
	function($rootScope,$resource,Tag,$q){
		//Instantiate a new MarvelAPI with options
		var api = new MarvelApi({
			apiKey :"7ac0dc0b1cb2d8d6f1d0597f5f8ea7a2",
			apiBase : "http://localhost",
			apiVersion : "/api/v1"
		});
		var self = this;
		//Creates a service tagger
		Tag = new Tag({tag: "MarvelService: "});

		//initializes the character collection via localStorage
		var characters = localStorage.getItem('characters');
		this.characters =  characters !== undefined ? angular.fromJson(characters) : undefined;
		
		//CharacterList resource
		this.CharactersList = $resource(api.Characters,{
			id: "@id",
			name: "@name"
		});
		//Character Comics Resource
		this.Comics = $resource(api.Comics,{
			id: "@id"
		});
		//Retrieves a single character
		this.getCharacter = function(id){
			var deferred = $q.defer();
			//Get singular character by id from backend
			this.CharactersList.get({id: id})
				.$promise.then(
					function(characterIn){
						Tag.log("retrieved single character promise");
						Tag.log(characterIn.data[0]);
						deferred.resolve(characterIn.data[0]);
				},
					function(response){
						Tag.error(response.error);
						deferred.rejected(response.error);
				});

			return deferred.promise;
		}
		//service function to retrieve characters 
		this.getCharacters = function(name,offset){
			var offest = offset || 0;
			var deferred = $q.defer();
			//performs resource GET
			this.CharactersList.get({name: name,offset:offset})
				.$promise.then(
					function(charactersIn){
						Tag.log("Retrieved charactersList Promise");
						localStorage.setItem('characters',angular.toJson(charactersIn.data));
						self.characters = charactersIn.data;
						deferred.resolve(self.characters);
				},
					function(response){
						Tag.error(response.error);
						deferred.rejected(response.error);
				});
			return deferred.promise;
		}
		//Get the comics based on a characterId
		this.getCharacterComics = function(id){
			var deferred = $q.defer();
			this.Comics.get({id: id})
				.$promise.then(
					function(comics){
						Tag.log("Retrieved Characters Comics");
						Tag.log(comics);
						self.comics = comics.data;
						deferred.resolve(self.comics);
				},
					function(response){
						Tag.error(response.error);
						deferred.rejected(response.error);
				});
			return deferred.promise;
		}
		//Show the character from the local character collection
		this.showCharacter = function(id){
			Tag.log("Retrieve character Locally");
			return _.findWhere(self.characters,{id: parseInt(id)});
		}
	}
]);

//Marvel API Options Object
function MarvelApi(options){
	this.apiKey = options.apiKey;
	this.apiBase = options.apiBase;
	this.apiVersion = options.apiVersion;
	this.apiPath = this.apiBase + this.apiVersion;
	this.Characters = this.apiPath + "/characters/:id";
	this.Comics = this.Characters + "/comics";
}