module mkblog
{
	'use strict';

    /**
    * Controller for managing the 
    */
	export class HomeCtrl
    {
        // An array of todo items
        private http: ng.IHttpService;
        public posts: Array<modepress.IPost>;
        public apiURL: string;
        public sce: ng.ISCEService;

        public author: string;
        public category: string;
        public tag: string;
        public index: number;
        public limit: number;
        public last: number;
        public signaller: Function;
        public scrollTop: Function;
        public meta: Meta;

        public static $inject = ["$http", "apiURL", "$stateParams", "$sce", "signaller", "meta", "scrollTop"];

		/**
		* Creates an instance of the home controller
		*/
        constructor(http: ng.IHttpService, apiURL: string, stateParams: any, sce: ng.ISCEService, signaller: Function, meta: Meta, scrollTop: Function)
        {
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
            this.http.get<modepress.IGetPosts>(`${this.apiURL}/posts/get-posts?visibility=all&tags=${that.tag},mkhenson&index=${that.index}&limit=${that.limit}&author=${that.author}&categories=${that.category}`).then(function (posts)
            {
                that.posts = posts.data.data;
                var brokenArr;

                for (var i = 0, l = that.posts.length; i < l; i++)
                {
                    brokenArr = that.posts[i].content.split("<!-- pagebreak -->");
                    that.posts[i].content = that.sce.trustAsHtml(brokenArr[0]);
                }

                that.last = posts.data.count;

                that.scrollTop();
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

        /**
        * Cleans up the controller
        */
        onDestroy()
        {
        }
	}
}