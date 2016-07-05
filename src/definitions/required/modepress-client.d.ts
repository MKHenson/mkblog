declare module ModepressClientPlugin {
    /**
     * Describes the visibility of the post
     */
    enum Visibility {
        /** Posts marked as public. Visible to both guest and admin users */
        public = 0,
        /** Posts marked as private. Visible to only admin users and will not show for non-admin users */
        private = 1,
        /** Visible to both guest and admin users */
        all = 2,
    }
    /**
     * Describes the order to fetch the posts
     */
    enum SortOrder {
        /** Sorts from newest to oldest */
        desc = 0,
        /** Sorts from oldest to newest */
        asc = 1,
    }
    /**
     * Describes how to filter the posts returned from a GET call.
     */
    interface IPostOptions {
        /** Sort by last updated instead of date created */
        sortByUpdate?: boolean;
        /** Filter by public, private or both */
        visibility?: Visibility;
        /** Set the number of posts returned by the call */
        limit?: number;
        /** Set the starting index for fetching posts */
        index?: number;
        /** Filter by the post author */
        author?: string;
        /** Filter by a post title or content keyword */
        keyword?: string;
        /** If true, do not fetch the post's content */
        minimal?: boolean;
        /** Specify the sort order */
        sortOrder?: SortOrder;
        /** Filter post's by the categories provided */
        categories?: string[];
        /** Filter post's by the optional tags provided */
        tags?: string[];
        /** Filter post's by the required tags provided */
        rtags?: string[];
    }
    /**
     * A service for interacting with post data and the relevant modepress endpoints
     */
    class PostService {
        private _http;
        private _url;
        private _q;
        static $inject: string[];
        constructor($http: ng.IHttpService, apiUrl: string, $q: ng.IQService);
        /**
         * Gets a post by its unique slug
         * @param {string} slug The slug of the post
         * @returns {ng.IPromise<Modepress.IPost>}
         */
        private getSingle(url);
        /**
         * Gets a post by its unique slug
         * @param {string} slug The slug of the post
         * @returns {ng.IPromise<Modepress.IPost>}
         */
        bySlug(slug: string): ng.IPromise<Modepress.IPost>;
        /**
         * Gets a post by its id
         * @param {string} slug The slug of the post
         * @returns {ng.IPromise<Modepress.IPost>}
         */
        byId(id: string): ng.IPromise<Modepress.IPost>;
        /**
         * Removes a post by its ID
         * @param {string} id The id of the post
         * @returns {ng.IPromise<string>}
         */
        delete(id: string): ng.IPromise<string>;
        /**
         * Edits a post by its ID
         * @param {string} id The id of the post
         * @param {Modepress.IPost} postData The post data to edit
         * @returns {ng.IPromise<string>}
         */
        edit(id: string, postData: Modepress.IPost): ng.IPromise<string>;
        /**
         * Creates a new post
         * @param {Modepress.IPost} postData The post data to create
         * @returns {ng.IPromise<string>}
         */
        create(postData: Modepress.IPost): ng.IPromise<string>;
        /**
         * Gets all posts that match each of the parameter conditions
         * @param {Modepress.IPostOptions} options The filter options
         */
        all(options?: IPostOptions): ng.IPromise<Modepress.IGetPosts>;
    }
}
declare module ModepressClientPlugin {
    /**
     * A service for interacting with categories
     */
    class CategoryService {
        private _http;
        private _url;
        private _q;
        static $inject: string[];
        constructor($http: ng.IHttpService, apiUrl: string, $q: ng.IQService);
        /**
         * Removes a category by its ID
         * @param {string} id The id of the category
         * @returns {ng.IPromise<string>}
         */
        delete(id: string): ng.IPromise<string>;
        /**
         * Creates a new category
         * @param {Modepress.ICategory} category The category data to create
         * @returns {ng.IPromise<string>}
         */
        create(category: Modepress.ICategory): ng.IPromise<string>;
        /**
         * Gets all categories
         * @param {number} index The start index to fetch categories from
         * @param {number} limit The number of categories to return for this call
         * @returns {Modepress.IGetCategories}
         */
        all(index?: number, limit?: number): ng.IPromise<Modepress.IGetCategories>;
    }
}
declare module ModepressClientPlugin {
}
