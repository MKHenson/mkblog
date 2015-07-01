module mkblog
{
	'use strict';

    /**
    * Controller for managing the 
    */
    export class HomeSubCtrl
    {
        public static $inject = ["$scope", "$stateParams"];

		/**
		* Creates an instance of the home controller
		*/
        constructor(scope: any, stateParams: any)
        {
            scope.controller.index = parseInt(stateParams.index) || 0;
            scope.controller.author = stateParams.author || "";
            scope.controller.category = stateParams.category || "";
            scope.controller.tag = stateParams.tag || "";
            scope.controller.selectedTag = scope.controller.tag;
            scope.controller.updatePageContent();
        }
	}
}