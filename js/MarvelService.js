appServices.service("Marvel",["$rootScope","$resource",
	function($rootScope,$resource){
		var api = new MarvelApi({
			apiKey :"7ac0dc0b1cb2d8d6f1d0597f5f8ea7a2",
			apiBase : "http://localhost",
			apiVersion : "/api/v1"
		});
		this.Characters = $resource(api.Characters,{
			id: "@id"
		});
	}
]);

function MarvelApi(options){
	this.apiKey = options.apiKey;
	this.apiBase = options.apiBase;
	this.apiVersion = options.apiVersion;
	this.apiPath = this.apiBase + this.apiVersion;
	this.Characters = this.apiPath + "/characters";
	this.Comics = this.apiPath + "/comics";
}