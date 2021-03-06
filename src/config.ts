﻿module mkblog
{
	'use strict';

	/**
	* Configures the application
	*/
	export class Config
	{
        public static $inject = ["$urlRouterProvider", "$stateProvider", "$locationProvider"];

        /**
		* Creates an instance of the config
		*/
        constructor(routeProvider: angular.ui.IUrlRouterProvider, stateProvider: angular.ui.IStateProvider, $locationProvider: angular.ILocationProvider)
        {
            // Creates nice URLs
            $locationProvider.html5Mode(true);
            $locationProvider.hashPrefix('!');

            // if the path doesn't match any of the urls you configured
            // 'otherwise' will take care of routing back to the index
            routeProvider.otherwise("/");

            // Create the states
            stateProvider.state("home", { url: "/", templateUrl: "templates/home.html", controller: "homeCtrl", controllerAs: "controller", abstract: true });
            stateProvider.state("home.posts", { url: "?author&category&tag&index", templateUrl: "templates/home-posts.html", controller: "homeSubCtrl", controllerAs: "subController" });
            stateProvider.state("about", { url: "/about", templateUrl: "templates/about.html", controller: "simpleCtrl" });
            stateProvider.state("contact", { url: "/contact", templateUrl: "templates/contact.html", controller: "contactCtrl", controllerAs: "controller" });
            stateProvider.state("projects", { url: "/projects?author&category&tag&index", templateUrl: "templates/projects.html", controller: "projectsCtrl", controllerAs: "controller" });

            // Download the post prior to loading this state
            // then assign the post to the scope
            stateProvider.state("post", {
                url: "/post/:slug",
                templateUrl: "templates/post.html",
                controller: "postCtrl",
                resolve: {
                    post: ["$stateParams", "posts", function ( stateParams, posts : ModepressClientPlugin.PostService ) {
                        return posts.bySlug(stateParams.slug);
                    }]
                }
            });
        }
	}
}