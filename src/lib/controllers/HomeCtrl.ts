module mkblog
{
	'use strict';

    /**
    * Controller for managing the 
    */
    export class HomeCtrl extends PagedContent
    {
        // An array of todo items
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
            super(http)
            this.posts = [];
            this.apiURL = apiURL;
            this.sce = sce;
            this.scrollTop = scrollTop;

            this.limit = 10;
            this.index = parseInt(stateParams.index) || 0;
            this.last = Infinity;

            this.author = stateParams.author || "";
            this.category = stateParams.category || "";
            this.tag = stateParams.tag || "";
            this.signaller = signaller;
            this.meta = meta;
            
            this.updatePageContent();
        }
        

        /**
        * Fetches a list of posts with the given GET params
        */
        updatePageContent()
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
                that.meta.defaults();
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
	}
}