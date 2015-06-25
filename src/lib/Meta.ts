module mkblog
{
    /**
    * A class bound to the meta tags of the site. You can call this object in controllers with the dependency "meta"
    */
    export class Meta
    {
        public description: string;
        public title: string;
        public brief: string;
        public smallImage: string;
        public bigImage: string;
        public author: string;
        public website: string;
        public url: string;
        public twitterAuthor: string;
        public twitterSite: string;

        /**
        * Creates an instance of the meta class
        */
        constructor()
        {
            this.defaults();
        }

        /**
        * Sets the values to their default state
        */
        defaults()
        {
            this.description = "Mathew Henson's blog page, Dublin based web developer with years of experience in backend and frontend application development";
            this.title = "Mathew Henson's blog"
            this.brief = this.description;
            this.smallImage = "./media/images/mathew-profile.png";
            this.bigImage = "./media/images/mathew-profile.png";
            this.author = "Mathew Henson";
            this.website = "Mathew Henson's Blog";
            this.url = this.url || "http://mkhenson.com";
            this.twitterAuthor = "@MathewKHenson";
            this.twitterSite = "@WebinateNet";
        }
    }
}