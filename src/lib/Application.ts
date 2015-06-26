declare var _url: string;

/**
 * The main entry point of the application
 */
module mkblog
{
    'use strict';



    angular.module("mkblog", ["ui.router", 'ngSanitize', 'chieffancypants.loadingBar'])
        .factory("signaller", function () 
        {
            return function() {
                    setTimeout( function () { (<any>window).prerenderReady = true; }, 500);
                }
        })
        .factory("scrollTop", function () 
        {
            return function ()
            {
                // Scroll div to top after page is rendered - not even sure why it keeps scrolling down :/
                setTimeout(function ()
                {
                    $(".content-outer")[0].scrollTop = 0;

                }, 50);
            }
        })
        .factory("meta", ["$rootScope", function (rootScope) 
        {
            return rootScope.meta;
        }])
        .config(Config)
        .run(["$rootScope", "$location", "$window", function ($rootScope: any, $location: ng.ILocationService, $window: ng.IWindowService)
        {
            // Create the meta object
            $rootScope.meta = new Meta();

            // This tells Google analytics to count a new page view on each state change
            $rootScope.$on('$stateChangeSuccess', function (event) 
            {
                if (!(<any>$window).ga)
                    return;

                (<Meta>$rootScope.meta).url = $location.absUrl();

                (<any>$window).ga('send', 'pageview', { page: $location.path() });
            });
        }])
        .constant("apiURL", "./api")
        .controller("simpleCtrl", SimpleCtrl)
        .controller("footerCtrl", FooterCtrl)
        .controller("homeCtrl", HomeCtrl)
        .controller("homeSubCtrl", HomeSubCtrl)
        .controller("postCtrl", PostCtrl)
        .controller("projectsCtrl", ProjectsCtrl)
        .controller("contactCtrl", ContactCtrl)
}