///<reference path='../../../../../../../../test/lib/puremvc-typescript-multicore-1.0.d.ts'/>

///<reference path='FacadeTestVO.ts'/>

module test
{
	"use strict";

	/**
	 * A <code>SimpleCommand</code> subclass used by FacadeTest.
	 */
	export class FacadeTestCommand
		extends puremvc.SimpleCommand
		implements puremvc.ICommand
	{
		/**
		 * Fabricate a result by multiplying the input by 2.
		 *
		 * @param notification
		 * 		The <code>Notification</code> carrying the FacadeTestVO.
		 */
		execute( notification:puremvc.INotification )
		{
			var vo:FacadeTestVO = <FacadeTestVO> notification.getBody();

			// Fabricate a result
			vo.result = 2 * vo.input;
		}
	}
}