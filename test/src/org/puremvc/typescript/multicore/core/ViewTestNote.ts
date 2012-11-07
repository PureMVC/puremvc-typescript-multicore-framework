///<reference path='../../../../../../../bin/puremvc-typescript-multicore-1.0.d.ts'/>

module test
{
	"use strict";

	/**
	 * A <code>INotification</code> implementor used by <code>ViewTest</code>.
	 */
	export class ViewTestNote
		extends puremvc.Notification
		implements puremvc.INotification
	{
		/**
		 * Constructs a <code>Notification</code> subclass instance.
		 *
		 * @param name
		 *		Ignored and forced to NAME.
		 *
		 * @param body
		 *		The body of the Notification to be constructed.
		 */
		constructor( name:string, body:any )
		{
			super( ViewTestNote.NAME, body );
		}

		/**
		 * The name of this Notification.
		 */
		private static NAME:string = "ViewTestNote";

		/**
		 * Factory method.
		 *
		 * This method creates new instances of the ViewTestNote class,
		 * automatically setting the notification name so you don't have to. Use
		 * this as an alternative to the constructor.
		 *
		 * @param body
		 * 		The body of the Notification to be constructed.
		 *
		 * @return
		 *		The created <code>Notification</code>
		 */
		static create( body:any ):puremvc.INotification
		{
			return new ViewTestNote( ViewTestNote.NAME, body );
		}
	}
}