﻿module mkblog
{
	/**
	* Abstract class for controllers that page through content items.
	*/
    export class PagedContent
    {
        protected http: ng.IHttpService;
        protected error: boolean;
        protected errorMsg: string;
        protected loading: boolean;
        protected index: number;
        protected limit: number;
        protected last: number;
        protected searchTerm: string;

        constructor(http: ng.IHttpService)
        {
            this.http = http;
            this.loading = false;
            this.error = false;
            this.errorMsg = "";
            this.index = 0;
            this.limit = 10;
            this.last = 1;
            this.searchTerm = "";
        }

        /**
        * Updates the content
        */
        updatePageContent()
        {
        }

        /**
        * Gets the current page number
        * @returns {number}
        */
        getPageNum(): number
        {
            return (this.index / this.limit) + 1;
        }

        /**
		* Gets the total number of pages
        * @returns {number}
		*/
        getTotalPages()
        {
            return Math.ceil(this.last / this.limit);
        }

        /**
		* Sets the page search back to index = 0
		*/
        goFirst()
        {
            this.index = 0;
            this.updatePageContent();
        }

        /**
		* Gets the last set of users
		*/
        goLast()
        {
            this.index = this.last - this.limit;
            this.updatePageContent();
        }

        /**
        * Sets the page search back to index = 0
        */
        goNext()
        {
            this.index += this.limit;
            this.updatePageContent();
        }

        /**
        * Sets the page search back to index = 0
        */
        goPrev()
        {
            this.index -= this.limit;
            if (this.index < 0)
                this.index = 0;

            this.updatePageContent();
        }

        /**
        * Called when the controller is being destroyed
        */
        onDispose()
        {
        }
    }
}