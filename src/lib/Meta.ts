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
            this.description = "Mathew Henson's blog page, dublin based web developer";
            this.title = "Mathew Henson's blog"
            this.brief = "Mat's blog of game, server and app development based in Dublin";
            this.smallImage = "";
            this.bigImage = "";
            this.author = "Mathew Henson";
            this.website = "Mathew Henson's Blog";
            this.url = "http://mkhenson.com";
            this.twitterAuthor = "@MathewKHenson";
            this.twitterSite = "@WebinateNet";
        }
    }
}