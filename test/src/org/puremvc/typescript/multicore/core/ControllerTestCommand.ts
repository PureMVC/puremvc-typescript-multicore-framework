///<reference path='../../../../../../../bin/puremvc-typescript-multicore-1.0.d.ts'/>

///<reference path='ControllerTestVO.ts'/>

module test
{
	"use strict";

	/**
	 * A <code>SimpleCommand</code> subclass used by <code>ControllerTest</code>.
	 */
	export class ControllerTestCommand
		extends puremvc.SimpleCommand
		implements puremvc.ICommand
	{
		/**
		 * Fabricate a result by multiplying the input by 2.
		 *
		 * @param notification
		 * 		The notification carrying the ControllerTestVO
		 */
		execute( notification:puremvc.INotification )
		{
			var vo:ControllerTestVO = notification.getBody();

			// Fabricate a result
			vo.result = 2 * vo.input;
		}
	}
}