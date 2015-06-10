module mkblog
{
	'use strict';

    /**
    * Controller for managing the 
    */
	export class HomeCtrl
    {
        // The dependency injector
        public static $inject = ["$scope"];

		/**
		* Creates an instance of the home controller
		*/
        constructor(scope: ng.IScope)
        {
            var that = this;

            scope.$on("$destroy", function() { that.onDestroy(); });
        }

        /**
        * Cleans up the controller
        */
        onDestroy()
        {
        }
	}
}