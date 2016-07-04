module mkblog
{
    export class FooterCtrl
    {
        public allPosts: Array<modepress.IPost>;
        public posts: Array<modepress.IPost>;

        // The dependency injector
        public static $inject = ["$scope", "$http", "apiURL"];
        
        constructor(scope: any, http: ng.IHttpService, apiURL: string )
        {
            scope.posts = [];

            var that = this;
            http.get<modepress.IGetPosts>(`${apiURL}/posts/get-posts?rtags=mkhenson&limit=5&minimal=true&visibility=public`).then(function (posts)
            {
                scope.posts = posts.data.data;
            });

            http.get<modepress.IGetPosts>(`${apiURL}/posts/get-posts?rtags=mkhenson&limit=5&minimal=true&visibility=all`).then(function (posts)
            {
                scope.allPosts = posts.data.data;
            });
        }
    }
}