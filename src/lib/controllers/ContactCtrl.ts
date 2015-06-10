module mkblog
{
	'use strict';

	/**
	 * Controller for the contact us page
	 */
	export class ContactCtrl
	{
		// An array of todo items
		private http: ng.IHttpService;
        private mail: modepress.IMessage;

		// The dependency injector
		public static $inject = ["$http" ];

		/**
		* Creates an instance of the home controller
		*/
		constructor( http: ng.IHttpService )
		{
			this.http = http;
			this.mail = { email: "", name: "", message : "" };
		}

		/*
		* Sends an email to the modepress admin
		*/
		sendMessage()
		{
			var details = this.mail;
			jQuery(".success").hide();
			jQuery(".error").hide();
			jQuery("#contact-form .submit").prop('disabled', true);

			this.http.post("/api/message-admin", details).then((response: ng.IHttpPromiseCallbackArg<any>) =>
			{
				// Check for any errors
				if (response.data.error)
				{
					jQuery(".error").show().text(response.data.message);
					return;
				}
				else
				{
					jQuery(".success").show().text(response.data.message);
				}
			}).catch(function (error: Error)
			{
                jQuery(".error").show().text(`Oh dear, there seems to be an error with our server.
                    Please try again or send us an email and we'll try get back to you as soon as possible`);

			}).finally(function ()
			{
				jQuery("#contact-form .submit").prop('disabled', false);
			});
		}
	}
}