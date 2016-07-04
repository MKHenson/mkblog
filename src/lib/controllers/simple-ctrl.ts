module mkblog
{
	'use strict';

    /**
    * Controller for managing the 
    */
    export class SimpleCtrl
    {
        public static $inject = ["signaller", "meta"];

		/**
		* Creates an instance of the home controller
		*/
        constructor(signaller: any, meta: Meta)
        {
            meta.defaults();
            signaller();
        }
	}
}