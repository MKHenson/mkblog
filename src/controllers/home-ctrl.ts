module mkblog
{
	'use strict';

    /**
    * Controller for managing the
    */
    export class HomeCtrl extends PagedContent
    {
        // An array of todo items
        public posts: Array<Modepress.IPost>;
        public apiURL: string;
        public sce: ng.ISCEService;

        public author: string;
        public category: string;
        public tag: string;
        public index: number;
        public limit: number;
        public last: number;
        public selectedTag: string;
        public signaller: Function;
        public meta: Meta;

        private _posts: ModepressClientPlugin.PostService;

        public static $inject = ["$http", "apiURL", "$sce", "signaller", "meta", "posts"];

		/**
		* Creates an instance of the home controller
		*/
        constructor(http: ng.IHttpService, apiURL: string, sce: ng.ISCEService, signaller: Function, meta: Meta, posts: ModepressClientPlugin.PostService)
        {
            super(http)
            this.posts = [];
            this.apiURL = apiURL;
            this.sce = sce;
            this.selectedTag = "";
            this.limit = 10;
            this.last = 1;
            this.signaller = signaller;
            this.meta = meta;
            this._posts = posts;
        }


        /**
        * Fetches a list of posts with the given GET params
        */
        updatePageContent()
        {
            var that = this;
            that.posts = [];
            this._posts.all({
                visibility : ModepressClientPlugin.Visibility.public,
                tags: [that.tag],
                rtags: ["mkhenson"],
                index: that.index,
                limit: that.limit,
                author: that.author,
                categories: [that.category]

            }).then(function (posts)
            {
                that.posts = posts.data;
                var brokenArr;

                for (var i = 0, l = that.posts.length; i < l; i++)
                {
                    brokenArr = that.posts[i].content.split("<!-- pagebreak -->");
                    that.posts[i].content = that.sce.trustAsHtml(brokenArr[0]);
                }

                that.last = posts.count;
                that.meta.defaults();
                that.signaller();
            });
        }
	}
}