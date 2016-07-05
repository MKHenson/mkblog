module mkblog
{
    export class FooterCtrl
    {
        public allPosts: Array<Modepress.IPost>;
        public posts: Array<Modepress.IPost>;

        // The dependency injector
        public static $inject = ["$scope", "$http", "apiURL", "posts"];

        constructor(scope: any, http: ng.IHttpService, apiURL: string, posts: ModepressClientPlugin.PostService )
        {
            scope.posts = [];

            var that = this;
            posts.all({
                visibility: ModepressClientPlugin.Visibility.public,
                minimal: true,
                limit: 5,
                rtags: ["mkhenson"]
            }).then(function (posts)
            {
                scope.posts = posts.data;
            });

            posts.all({
                visibility: ModepressClientPlugin.Visibility.all,
                minimal: true,
                limit: 5,
                rtags: ["mkhenson"]
            }).then(function (posts)
            {
                scope.allPosts = posts.data;
            });
        }
    }
}