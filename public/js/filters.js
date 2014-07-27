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