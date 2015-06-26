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
            this.description = "Mathew Henson's blog page, Dublin based web developer with years of experience in backend and frontend application development";
            this.title = "Mathew Henson's blog";
            this.brief = this.description;
            this.smallImage = _url + "/media/images/mathew-profile.png";
            this.bigImage = _url + "/media/images/mathew-profile.png";
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
            stateProvider.state("home", { url: "/", abstract: true, templateUrl: "templates/home.html", controller: "homeCtrl", controllerAs: "controller" });
            stateProvider.state("home.posts", { url: "?author&category&tag&index", templateUrl: "templates/home-posts.html", controller: "homeSubCtrl", controllerAs: "subController" });
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
    /**
    * Abstract class for controllers that page through content items.
    */
    var PagedContent = (function () {
        function PagedContent(http) {
            this.http = http;
            this.loading = false;
            this.error = false;
            this.errorMsg = "";
            this.index = 0;
            this.limit = 10;
            this.last = 1;
            this.searchTerm = "";
        }
        /**
        * Updates the content
        */
        PagedContent.prototype.updatePageContent = function () {
        };
        /**
        * Gets the current page number
        * @returns {number}
        */
        PagedContent.prototype.getPageNum = function () {
            return (this.index / this.limit) + 1;
        };
        /**
        * Gets the total number of pages
        * @returns {number}
        */
        PagedContent.prototype.getTotalPages = function () {
            return Math.ceil(this.last / this.limit);
        };
        /**
        * Sets the page search back to index = 0
        */
        PagedContent.prototype.goFirst = function () {
            this.index = 0;
            this.updatePageContent();
        };
        /**
        * Gets the last set of users
        */
        PagedContent.prototype.goLast = function () {
            this.index = this.last - this.limit;
            this.updatePageContent();
        };
        /**
        * Sets the page search back to index = 0
        */
        PagedContent.prototype.goNext = function () {
            this.index += this.limit;
            this.updatePageContent();
        };
        /**
        * Sets the page search back to index = 0
        */
        PagedContent.prototype.goPrev = function () {
            this.index -= this.limit;
            if (this.index < 0)
                this.index = 0;
            this.updatePageContent();
        };
        /**
        * Called when the controller is being destroyed
        */
        PagedContent.prototype.onDispose = function () {
        };
        return PagedContent;
    })();
    mkblog.PagedContent = PagedContent;
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
            http.get(apiURL + "/posts/get-posts?rtags=mkhenson&limit=5&minimal=true&visibility=public").then(function (posts) {
                scope.posts = posts.data.data;
            });
            http.get(apiURL + "/posts/get-posts?rtags=mkhenson&limit=5&minimal=true&visibility=all").then(function (posts) {
                scope.allPosts = posts.data.data;
            });
        }
        // The dependency injector
        FooterCtrl.$inject = ["$scope", "$http", "apiURL"];
        return FooterCtrl;
    })();
    mkblog.FooterCtrl = FooterCtrl;
})(mkblog || (mkblog = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var mkblog;
(function (mkblog) {
    'use strict';
    /**
    * Controller for the blog page
    */
    var ProjectsCtrl = (function (_super) {
        __extends(ProjectsCtrl, _super);
        /**
        * Creates an instance of the home controller
        */
        function ProjectsCtrl(http, apiURL, stateParams, signaller, scrollTop) {
            _super.call(this, http);
            this.posts = [];
            this.apiURL = apiURL;
            this.signaller = signaller;
            this.scrollTop = scrollTop;
            this.limit = 12;
            this.index = parseInt(stateParams.index) || 0;
            this.author = stateParams.author || "";
            this.category = stateParams.category || "";
            this.tag = stateParams.tag || "";
            this.updatePageContent();
        }
        /**
        * Fetches a list of posts with the given GET params
        */
        ProjectsCtrl.prototype.updatePageContent = function () {
            var that = this;
            this.http.get(this.apiURL + "/posts/get-posts?visibility=public&tags=" + that.tag + "&rtags=mkhenson&index=" + that.index + "&limit=" + that.limit + "&author=" + that.author + "&categories=" + that.category + "&minimal=true").then(function (posts) {
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
    })(mkblog.PagedContent);
    mkblog.ProjectsCtrl = ProjectsCtrl;
})(mkblog || (mkblog = {}));
var mkblog;
(function (mkblog) {
    'use strict';
    /**
    * Controller for managing the
    */
    var HomeCtrl = (function (_super) {
        __extends(HomeCtrl, _super);
        /**
        * Creates an instance of the home controller
        */
        function HomeCtrl(http, apiURL, sce, signaller, meta, scrollTop) {
            _super.call(this, http);
            this.posts = [];
            this.apiURL = apiURL;
            this.sce = sce;
            this.scrollTop = scrollTop;
            this.selectedTag = "";
            this.limit = 10;
            this.last = 1;
            this.signaller = signaller;
            this.meta = meta;
        }
        /**
        * Fetches a list of posts with the given GET params
        */
        HomeCtrl.prototype.updatePageContent = function () {
            var that = this;
            this.http.get(this.apiURL + "/posts/get-posts?visibility=all&tags=" + that.tag + "&rtags=mkhenson&index=" + that.index + "&limit=" + that.limit + "&author=" + that.author + "&categories=" + that.category).then(function (posts) {
                that.posts = posts.data.data;
                var brokenArr;
                for (var i = 0, l = that.posts.length; i < l; i++) {
                    brokenArr = that.posts[i].content.split("<!-- pagebreak -->");
                    that.posts[i].content = that.sce.trustAsHtml(brokenArr[0]);
                }
                that.last = posts.data.count;
                that.meta.defaults();
                that.scrollTop();
                that.signaller();
            });
        };
        HomeCtrl.$inject = ["$http", "apiURL", "$sce", "signaller", "meta", "scrollTop"];
        return HomeCtrl;
    })(mkblog.PagedContent);
    mkblog.HomeCtrl = HomeCtrl;
})(mkblog || (mkblog = {}));
var mkblog;
(function (mkblog) {
    'use strict';
    /**
    * Controller for managing the
    */
    var HomeSubCtrl = (function () {
        /**
        * Creates an instance of the home controller
        */
        function HomeSubCtrl(scope, stateParams) {
            scope.controller.posts;
            scope.controller.index = parseInt(stateParams.index) || 0;
            scope.controller.author = stateParams.author || "";
            scope.controller.category = stateParams.category || "";
            scope.controller.tag = stateParams.tag || "";
            scope.controller.selectedTag = scope.controller.tag;
            scope.controller.updatePageContent();
        }
        HomeSubCtrl.$inject = ["$scope", "$stateParams"];
        return HomeSubCtrl;
    })();
    mkblog.HomeSubCtrl = HomeSubCtrl;
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
            // If no brief, then get the text content of the post itself
            if (meta.brief == "") {
                var tmp = document.createElement("DIV");
                tmp.innerHTML = post.content;
                meta.description = tmp.textContent || tmp.innerText || "";
                //Trim
                meta.description = meta.description.replace(/^\s+|\s+$/g, '');
                // Remove nbsp
                meta.description = meta.description.replace(new RegExp(String.fromCharCode(160), "g"), " ");
                // Limit length
                meta.description = meta.description.substr(0, 155);
                //This javascript replaces all 3 types of line breaks with a space
                meta.description = meta.description.replace(/(\r\n|\n|\r)/gm, " ");
                //Replace all double white spaces with single spaces
                meta.description = meta.description.replace(/\s+/g, " ");
                meta.brief = meta.description;
            }
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
            meta.title = "Contact Mathew Henson";
            meta.description = "If you are looking for a contract web developer around Dublin, with years of experience in both front and backend technologies, send me an email in the contact form below.";
            meta.brief = meta.description;
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
        .controller("homeSubCtrl", mkblog.HomeSubCtrl)
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
/// <reference path="lib/controllers/PagedContent.ts" />
/// <reference path="lib/controllers/SimpleCtrl.ts" />
/// <reference path="lib/controllers/FooterCtrl.ts" />
/// <reference path="lib/controllers/ProjectsCtrl.ts" />
/// <reference path="lib/controllers/HomeCtrl.ts" />
/// <reference path="lib/controllers/HomeSubCtrl.ts" />
/// <reference path="lib/controllers/PostCtrl.ts" />
/// <reference path="lib/controllers/ContactCtrl.ts" />
/// <reference path="lib/Application.ts" /> 
