//Simple directive to handle the Enter button
appDirectives
	.directive('onPressEnter',function(){
		return {
			restrict: 'A', 	//Restricts to attr only
			scope: {
				onPressEnter: "&onPressEnter"
			},
			link: function(scope, element, attrs) {
				//Bind to elements keydown
				angular.element(element).on('keydown',
					function(event){
						if(event.which === 13){;
							//Calls the bound function
							scope.onPressEnter();
							event.preventDefault();
							event.stopPropagation();
						}
					}
				);
			}
		};
	});
	