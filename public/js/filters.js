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
	//Total comic count color filter
	.filter('available',function(){
		return function(available,total){
			if(available <= 0)
				return 'red'; //Zero
			else if(available <= total / 4 && available > 0) 
				return 'gray'; //Small - 0%-25%
			else if(available >= total / 4 && available < total / 2)
				return 'orange'; //Many 25%-50%
			else if(available >= total / 2 && available < total * .75)
				return 'green'; //Good and Plenty  50%-70%
			else if(available >= total * .75 && available < total * .9)
				return 'blue'; //Thats a lot of lemonheads 75%
			else if(available >= total * .9)
				return 'purple';
		}
	})
	.filter('notAvailable',function(){
		return function(available){
			if(available == null || available == undefined || available.length <= 0)
				return 'Not Available';
			else
				return available;			
		}
	})