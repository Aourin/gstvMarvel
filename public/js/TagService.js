//Simple logging module used to provide specific log contexts
angular.module('tag',[])
	.factory('Tag',[
		function (){
			function Tag(options){
				this.options = options;

				this.log = function(message){
					console.log(options.tag, message);
				}
				this.error = function(error){
					console.error(options.tag,error);
				}
			}
			return Tag;
		}
	])