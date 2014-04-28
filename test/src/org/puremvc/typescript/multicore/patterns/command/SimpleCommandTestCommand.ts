///<reference path='../../../../../../../../bin/puremvc-typescript-multicore-1.1.d.ts'/>

///<reference path='SimpleCommandTestVO.ts'/>

module test
{
	"use strict";

	/**
	 * A <code>SimpleCommand</code> subclass used by <code>SimpleCommandTest</code>.
	 */
	export class SimpleCommandTestCommand
		extends puremvc.SimpleCommand
		implements puremvc.ICommand
	{
		/**
		 * Fabricate a result by multiplying the input by 2.
		 *
		 * @param notification
		 * 		The <code>Notification</code> carrying the <code>SimpleCommandTestVO</code>.
		 */
		execute( notification:puremvc.INotification )
		{
			var vo:SimpleCommandTestVO = notification.getBody();

			// Fabricate a result
			vo.result = 2 * vo.input;
		}
	}
}