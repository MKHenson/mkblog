/**
 * The main entry point of the application
 */
module mkblog
{
    'use strict';

    angular.module("mkblog", ["ui.router", 'ngSanitize', 'chieffancypants.loadingBar'])
        .config(Config)
        .run(["$rootScope", "$location", "$window", function ($rootScope: ng.IRootScopeService, $location: ng.ILocationService, $window: ng.IWindowService)
        {
            // This tells Google analytics to count a new page view on each state change
            $rootScope.$on('$stateChangeSuccess', function (event) 
            {
                if (!(<any>$window).ga)
                    return;

                (<any>$window).ga('send', 'pageview', { page: $location.path() });
            });
        }])
        .constant("apiURL", "./api")
        .controller("footerCtrl", FooterCtrl)
        .controller("homeCtrl", HomeCtrl)
        .controller("blogCtrl", BlogCtrl)
        .controller("contactCtrl", ContactCtrl)
}