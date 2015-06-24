﻿module mkblog
{
	'use strict';

    /**
    * Controller for the blog page
    */
    export class ProjectsCtrl
	{
		// An array of todo items
        private http: ng.IHttpService;
        public posts: Array<modepress.IPost>;
        public apiURL: string;

        public author: string;
        public category: string;
        public tag: string;
        public index: number;
        public limit: number;
        public last: number;
        public signaller: Function;

		// The dependency injector
        public static $inject = ["$http", "apiURL", "$stateParams", "signaller" ];

		/**
		* Creates an instance of the home controller
		*/
        constructor(http: ng.IHttpService, apiURL: string, stateParams: any, signaller: Function)
		{
            this.http = http;
            this.posts = [];
            this.apiURL = apiURL;
            this.signaller = signaller;

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
        goNext()
        {
            this.index += this.limit;
            this.getPosts();
        }

        /**
        * Sets the page search back to index = 0
        */
        goPrev()
        {
            this.index -= this.limit;
            if (this.index < 0)
                this.index = 0;
            this.getPosts();
        }

        /**
        * Fetches a list of posts with the given GET params
        */
        getPosts()
        {
            var that = this;
            this.http.get<modepress.IGetPosts>(`${this.apiURL}/posts/get-posts?visibility=public&tags=${that.tag},mkhenson&index=${that.index}&limit=${that.limit}&author=${that.author}&categories=${that.category}&minimal=true`).then(function (posts)
            {
                that.posts = posts.data.data;
                that.last = posts.data.count;
                that.signaller(); 
            });
        }

        getBlogImageURL(post: modepress.IPost)
        {
            var url = "/media/images/camera.jpg";
            if (post.featuredImage && post.featuredImage != "")
                url = post.featuredImage;

            return {
                "background-image": "url('" + url + "')"
            }
        }
	}
}