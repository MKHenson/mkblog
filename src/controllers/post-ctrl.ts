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
        constructor(scope: any, post: Modepress.IPost, sce: ng.ISCEService, signaller: Function, meta: Meta)
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
            signaller();
        }
	}
}