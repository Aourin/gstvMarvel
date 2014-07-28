//Application filters
appFilters
	//Returns a filtered string to be the maxlength
	.filter('truncate',function(){
		return function(data, length){
			if(data.length > length)
				return data.substr(0,length) + '...';
			else
				return data;
		}
	})
	//Builds an imagelocation or returns a default
	.filter('imageLocation',function(){
		return function(thumbnail){
			if(thumbnail == (null || undefined)){
				return 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
			} else if(thumbnail.path !== undefined && thumbnail.extension !== undefined){
				var path = thumbnail.path + '.' + thumbnail.extension;
				return path;
			}
			else
				return 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
		}
	})
	.filter('available',function(){
		return function(available,total){
			if(available <= 0)
				return 'red';
			else if(available <= total / 4 && available > 0)
				return 'black';
			else if(available >= total / 4 && available < total / 2)
				return 'orange';
			else if(available >= total / 2 && available < total * .75)
				return 'green';
			else if(available >= total * .75)
				return 'purple';
		}
	})