module mkblog
{
	'use strict';

    /**
    * Controller for single post pages
    */
    export class PostCtrl
    {
        public static $inject = ["$scope", "post", "$sce", "signaller", "meta"];

		/**
		* Creates an instance of the home controller
		*/
        constructor(scope: any, post: modepress.IPost, sce: ng.ISCEService, signaller: Function, meta: Meta)
        {
            meta.title = post.title;
            meta.bigImage = (post.featuredImage && post.featuredImage != "" ? post.featuredImage : "");
            meta.smallImage = (post.featuredImage && post.featuredImage != "" ? post.featuredImage : "");
            meta.description = (post.brief && post.brief != "" ? post.brief : "");
            meta.brief = (post.brief && post.brief != "" ? post.brief : "");
            scope.post = post;
            scope.post.content = sce.trustAsHtml(post.content);

            signaller();
        }
	}
}