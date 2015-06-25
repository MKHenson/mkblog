var mkblog;
(function (mkblog) {
    /**
    * A class bound to the meta tags of the site. You can call this object in controllers with the dependency "meta"
    */
    var Meta = (function () {
        /**
        * Creates an instance of the meta class
        */
        function Meta() {
            this.defaults();
        }
        /**
        * Sets the values to their default state
        */
        Meta.prototype.defaults = function () {
            this.description = "Mathew Henson's blog page, dublin based web developer";
            this.title = "Mathew Henson's blog";
            this.brief = "Mat's blog of game, server and app development based in Dublin";
            this.smallImage = "";
            this.bigImage = "";
            this.author = "Mathew Henson";
            this.website = "Mathew Henson's Blog";
            this.url = this.url || "http://mkhenson.com";
            this.twitterAuthor = "@MathewKHenson";
            this.twitterSite = "@WebinateNet";
        };
        return Meta;
    })();
    mkblog.Meta = Meta;
})(mkblog || (mkblog = {}));
var mkblog;
(function (mkblog) {
    'use strict';
    /**
    * Configures the application
    */
    var Config = (function () {
        /**
        * Creates an instance of the config
        */
        function Config(routeProvider, stateProvider, $locationProvider) {
            // Creates nice URLs
            $locationProvider.html5Mode(true);
            $locationProvider.hashPrefix('!');
            // if the path doesn't match any of the urls you configured
            // 'otherwise' will take care of routing back to the index
            routeProvider.otherwise("/");
            // Create the states
            stateProvider.state("home", { url: "/?author&category&tag&index", templateUrl: "templates/home.html", controller: "homeCtrl", controllerAs: "controller" });
            stateProvider.state("about", { url: "/about", templateUrl: "templates/about.html", controller: "simpleCtrl" });
            stateProvider.state("contact", { url: "/contact", templateUrl: "templates/contact.html", controller: "contactCtrl", controllerAs: "controller" });
            stateProvider.state("projects", { url: "/projects?author&category&tag&index", templateUrl: "templates/projects.html", controller: "projectsCtrl", controllerAs: "controller" });
            // Download the post prior to loading this state
            // then assign the post to the scope
            stateProvider.state("post", {
                url: "/post/:slug", templateUrl: "templates/post.html", controller: "postCtrl",
                resolve: {
                    post: ["$http", "apiURL", "$stateParams", function ($http, apiURL, stateParams) {
                            return $http.get(apiURL + "/posts/get-post/" + stateParams.slug).then(function (posts) {
                                if (posts.data.error)
                                    return posts.data;
                                return posts.data.data;
                            });
                        }]
                }
            });
        }
        Config.$inject = ["$urlRouterProvider", "$stateProvider", "$locationProvider"];
        return Config;
    })();
    mkblog.Config = Config;
})(mkblog || (mkblog = {}));
var mkblog;
(function (mkblog) {
    'use strict';
    /**
    * Controller for managing the
    */
    var SimpleCtrl = (function () {
        /**
        * Creates an instance of the home controller
        */
        function SimpleCtrl(signaller, meta) {
            meta.defaults();
            signaller();
        }
        SimpleCtrl.$inject = ["signaller", "meta"];
        return SimpleCtrl;
    })();
    mkblog.SimpleCtrl = SimpleCtrl;
})(mkblog || (mkblog = {}));
var mkblog;
(function (mkblog) {
    var FooterCtrl = (function () {
        function FooterCtrl(scope, http, apiURL) {
            scope.posts = [];
            var that = this;
            http.get(apiURL + "/posts/get-posts?limit=5&minimal=true&visibility=public").then(function (posts) {
                scope.posts = posts.data.data;
            });
            http.get(apiURL + "/posts/get-posts?limit=5&minimal=true&visibility=all").then(function (posts) {
                scope.allPosts = posts.data.data;
            });
        }
        // The dependency injector
        FooterCtrl.$inject = ["$scope", "$http", "apiURL"];
        return FooterCtrl;
    })();
    mkblog.FooterCtrl = FooterCtrl;
})(mkblog || (mkblog = {}));
var mkblog;
(function (mkblog) {
    'use strict';
    /**
    * Controller for the blog page
    */
    var ProjectsCtrl = (function () {
        /**
        * Creates an instance of the home controller
        */
        function ProjectsCtrl(http, apiURL, stateParams, signaller, scrollTop) {
            this.http = http;
            this.posts = [];
            this.apiURL = apiURL;
            this.signaller = signaller;
            this.scrollTop = scrollTop;
            this.limit = 12;
            this.index = parseInt(stateParams.index) || 0;
            this.last = Infinity;
            this.author = stateParams.author || "";
            this.category = stateParams.category || "";
            this.tag = stateParams.tag || "";
            this.getPosts();
        }
        /**
        * Sets the page search back to index = 0
        */
        ProjectsCtrl.prototype.goNext = function () {
            this.index += this.limit;
            this.getPosts();
        };
        /**
        * Sets the page search back to index = 0
        */
        ProjectsCtrl.prototype.goPrev = function () {
            this.index -= this.limit;
            if (this.index < 0)
                this.index = 0;
            this.getPosts();
        };
        /**
        * Fetches a list of posts with the given GET params
        */
        ProjectsCtrl.prototype.getPosts = function () {
            var that = this;
            this.http.get(this.apiURL + "/posts/get-posts?visibility=public&tags=" + that.tag + ",mkhenson&index=" + that.index + "&limit=" + that.limit + "&author=" + that.author + "&categories=" + that.category + "&minimal=true").then(function (posts) {
                that.posts = posts.data.data;
                that.last = posts.data.count;
                that.scrollTop();
                that.signaller();
            });
        };
        ProjectsCtrl.prototype.getBlogImageURL = function (post) {
            var url = "/media/images/camera.jpg";
            if (post.featuredImage && post.featuredImage != "")
                url = post.featuredImage;
            return {
                "background-image": "url('" + url + "')"
            };
        };
        // The dependency injector
        ProjectsCtrl.$inject = ["$http", "apiURL", "$stateParams", "signaller", "scrollTop"];
        return ProjectsCtrl;
    })();
    mkblog.ProjectsCtrl = ProjectsCtrl;
})(mkblog || (mkblog = {}));
var mkblog;
(function (mkblog) {
    'use strict';
    /**
    * Controller for managing the
    */
    var HomeCtrl = (function () {
        /**
        * Creates an instance of the home controller
        */
        function HomeCtrl(http, apiURL, stateParams, sce, signaller, meta, scrollTop) {
            this.http = http;
            this.posts = [];
            this.apiURL = apiURL;
            this.sce = sce;
            this.scrollTop = scrollTop;
            this.limit = 5;
            this.index = parseInt(stateParams.index) || 0;
            this.last = Infinity;
            this.author = stateParams.author || "";
            this.category = stateParams.category || "";
            this.tag = stateParams.tag || "";
            this.signaller = signaller;
            this.meta = meta;
            this.meta.description = "Well it looks like we've got news!";
            this.getPosts();
        }
        /**
        * Sets the page search back to index = 0
        */
        HomeCtrl.prototype.goNext = function () {
            this.index += this.limit;
            this.getPosts();
        };
        /**
        * Sets the page search back to index = 0
        */
        HomeCtrl.prototype.goPrev = function () {
            this.index -= this.limit;
            if (this.index < 0)
                this.index = 0;
            this.getPosts();
        };
        /**
        * Fetches a list of posts with the given GET params
        */
        HomeCtrl.prototype.getPosts = function () {
            var that = this;
            this.http.get(this.apiURL + "/posts/get-posts?visibility=all&tags=" + that.tag + ",mkhenson&index=" + that.index + "&limit=" + that.limit + "&author=" + that.author + "&categories=" + that.category).then(function (posts) {
                that.posts = posts.data.data;
                var brokenArr;
                for (var i = 0, l = that.posts.length; i < l; i++) {
                    brokenArr = that.posts[i].content.split("<!-- pagebreak -->");
                    that.posts[i].content = that.sce.trustAsHtml(brokenArr[0]);
                }
                that.last = posts.data.count;
                that.scrollTop();
                that.signaller();
            });
        };
        HomeCtrl.prototype.getBlogImageURL = function (post) {
            var url = "/media/images/camera.jpg";
            if (post.featuredImage && post.featuredImage != "")
                url = post.featuredImage;
            return {
                "background-image": "url('" + url + "')"
            };
        };
        /**
        * Cleans up the controller
        */
        HomeCtrl.prototype.onDestroy = function () {
        };
        HomeCtrl.$inject = ["$http", "apiURL", "$stateParams", "$sce", "signaller", "meta", "scrollTop"];
        return HomeCtrl;
    })();
    mkblog.HomeCtrl = HomeCtrl;
})(mkblog || (mkblog = {}));
var mkblog;
(function (mkblog) {
    'use strict';
    /**
    * Controller for single post pages
    */
    var PostCtrl = (function () {
        /**
        * Creates an instance of the home controller
        */
        function PostCtrl(scope, post, sce, signaller, meta, scrollTop) {
            meta.title = post.title;
            meta.bigImage = (post.featuredImage && post.featuredImage != "" ? post.featuredImage : "");
            meta.smallImage = (post.featuredImage && post.featuredImage != "" ? post.featuredImage : "");
            meta.description = (post.brief && post.brief != "" ? post.brief : "");
            meta.brief = (post.brief && post.brief != "" ? post.brief : "");
            scope.post = post;
            scope.post.content = sce.trustAsHtml(post.content);
            scrollTop();
            signaller();
        }
        PostCtrl.$inject = ["$scope", "post", "$sce", "signaller", "meta", "scrollTop"];
        return PostCtrl;
    })();
    mkblog.PostCtrl = PostCtrl;
})(mkblog || (mkblog = {}));
var mkblog;
(function (mkblog) {
    'use strict';
    /**
     * Controller for the contact us page
     */
    var ContactCtrl = (function () {
        /**
        * Creates an instance of the home controller
        */
        function ContactCtrl(http, signaller, meta) {
            this.http = http;
            meta.defaults();
            this.mail = { email: "", name: "", message: "" };
            signaller();
        }
        /*
        * Sends an email to the modepress admin
        */
        ContactCtrl.prototype.sendMessage = function () {
            var details = this.mail;
            jQuery(".success").hide();
            jQuery(".error").hide();
            jQuery("#contact-form .submit").prop('disabled', true);
            this.http.post("/api/message-admin", details).then(function (response) {
                // Check for any errors
                if (response.data.error) {
                    jQuery(".error").show().text(response.data.message);
                    return;
                }
                else {
                    jQuery(".success").show().text(response.data.message);
                }
            }).catch(function (error) {
                jQuery(".error").show().text("Oh dear, there seems to be an error with our server.\n                    Please try again or send us an email and we'll try get back to you as soon as possible");
            }).finally(function () {
                jQuery("#contact-form .submit").prop('disabled', false);
            });
        };
        // The dependency injector
        ContactCtrl.$inject = ["$http", "signaller", "meta"];
        return ContactCtrl;
    })();
    mkblog.ContactCtrl = ContactCtrl;
})(mkblog || (mkblog = {}));
/**
 * The main entry point of the application
 */
var mkblog;
(function (mkblog) {
    'use strict';
    angular.module("mkblog", ["ui.router", 'ngSanitize', 'chieffancypants.loadingBar'])
        .factory("signaller", function () {
        return function () {
            setTimeout(function () { window.prerenderReady = true; }, 500);
        };
    })
        .factory("scrollTop", function () {
        return function () {
            // Scroll div to top after page is rendered - not even sure why it keeps scrolling down :/
            setTimeout(function () {
                $(".content-outer")[0].scrollTop = 0;
            }, 50);
        };
    })
        .factory("meta", ["$rootScope", function (rootScope) {
            return rootScope.meta;
        }])
        .config(mkblog.Config)
        .run(["$rootScope", "$location", "$window", function ($rootScope, $location, $window) {
            // Create the meta object
            $rootScope.meta = new mkblog.Meta();
            // This tells Google analytics to count a new page view on each state change
            $rootScope.$on('$stateChangeSuccess', function (event) {
                if (!$window.ga)
                    return;
                $rootScope.meta.url = $location.absUrl();
                $window.ga('send', 'pageview', { page: $location.path() });
            });
        }])
        .constant("apiURL", "./api")
        .controller("simpleCtrl", mkblog.SimpleCtrl)
        .controller("footerCtrl", mkblog.FooterCtrl)
        .controller("homeCtrl", mkblog.HomeCtrl)
        .controller("postCtrl", mkblog.PostCtrl)
        .controller("projectsCtrl", mkblog.ProjectsCtrl)
        .controller("contactCtrl", mkblog.ContactCtrl);
})(mkblog || (mkblog = {}));
/// <reference path="lib/definitions/jquery.d.ts" />
/// <reference path="lib/definitions/angular.d.ts" />
/// <reference path="lib/definitions/angular-ui-router.d.ts" />
/// <reference path="lib/definitions/modepress.d.ts" />
/// <reference path="lib/Meta.ts" />
/// <reference path="lib/Config.ts" />
/// <reference path="lib/controllers/SimpleCtrl.ts" />
/// <reference path="lib/controllers/FooterCtrl.ts" />
/// <reference path="lib/controllers/ProjectsCtrl.ts" />
/// <reference path="lib/controllers/HomeCtrl.ts" />
/// <reference path="lib/controllers/PostCtrl.ts" />
/// <reference path="lib/controllers/ContactCtrl.ts" />
/// <reference path="lib/Application.ts" /> 
