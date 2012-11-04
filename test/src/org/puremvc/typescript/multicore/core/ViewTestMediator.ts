///<reference path='../../../../../../../test/lib/puremvc-typescript-multicore-1.0.d.ts'/>

module test
{
	"use strict";

	/**
	 * A Mediator class used by ViewTest.
	 */
	export class ViewTestMediator
		extends puremvc.Mediator
		implements puremvc.IMediator
	{
		/**
		 * Constructs a <code>Mediator</code> subclass instance.
		 *
		 * @param view
		 *		The view component handled by this <code>Mediator</code>.
		 */
		constructor( view:any )
		{
			super( ViewTestMediator.NAME, view );
		}

		/**
		 * @override
		 *
		 * @return
		 * 		The list of notifications names in which is interested the <code>Mediator</code>.
		 */
		listNotificationInterests():string[]
		{
			// Be sure that the mediator has some Observers created in order to test removeMediator.
			return [ 'ABC', 'DEF', 'GHI' ];
		}

		/**
		 * The Mediator name.
		 *
		 * @constant
		 */
		private static NAME:string = "ViewTestMediator";
	}
}