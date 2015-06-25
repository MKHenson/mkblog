module mkblog
{
	'use strict';

    /**
    * Controller for single post pages
    */
    export class PostCtrl
    {
        public static $inject = ["$scope", "post", "$sce", "signaller", "meta", "scrollTop"];

		/**
		* Creates an instance of the home controller
		*/
        constructor(scope: any, post: modepress.IPost, sce: ng.ISCEService, signaller: Function, meta: Meta, scrollTop: Function)
        {
            meta.title = post.title;
            meta.bigImage = (post.featuredImage && post.featuredImage != "" ? post.featuredImage : "");
            meta.smallImage = (post.featuredImage && post.featuredImage != "" ? post.featuredImage : "");
            meta.description = (post.brief && post.brief != "" ? post.brief : "");
            meta.brief = (post.brief && post.brief != "" ? post.brief : "");

            // If no brief, then get the text content of the post itself
            if (meta.brief == "")
            {
                var tmp = document.createElement("DIV");
                tmp.innerHTML = post.content;
                meta.description = meta.brief = tmp.textContent || tmp.innerText || "";
            }

            scope.post = post;
            scope.post.content = sce.trustAsHtml(post.content);
            scrollTop();
            signaller();
        }
	}
}