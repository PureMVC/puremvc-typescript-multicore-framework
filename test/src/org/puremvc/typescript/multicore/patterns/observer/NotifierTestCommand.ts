///<reference path='../../../../../../../../bin/puremvc-typescript-multicore-1.0.d.ts'/>

///<reference path='NotifierTestVO.ts'/>

module test
{
	"use strict";

	/**
	 * A <code>SimpleCommand</code> subclass used by <code>NotifierTest</code>.
	 */
	export class NotifierTestCommand
		extends puremvc.SimpleCommand
		implements puremvc.ICommand
	{
		/**
		 * Fabricate a result by multiplying the input by 2
		 *
		 * @param notification
		 * 		The Notification carrying the NotifierTestVO
		 */
		execute( notification:puremvc.INotification )
		{
			var vo:NotifierTestVO = notification.getBody();

			// Fabricate a result
			vo.result = 2 * vo.input;
		}
	}
}