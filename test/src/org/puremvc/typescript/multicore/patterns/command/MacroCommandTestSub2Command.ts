///<reference path='../../../../../../../../bin/puremvc-typescript-multicore-1.1.d.ts'/>

///<reference path='MacroCommandTestVO.ts'/>

module test
{
	"use strict";

	/**
	 * A <code>SimpleCommand</code> subclass used by <code>MacroCommandTestCommand</code>.
	 */
	export class MacroCommandTestSub2Command
		extends puremvc.SimpleCommand
		implements puremvc.ICommand
	{
		/**
		 * Fabricate a result by multiplying the input by 2
		 *
		 * @param notification
		 * 		The <code>Notification</code> carrying the <code>MacroCommandTestVO</code>.
		 */
		execute( notification:puremvc.INotification )
		{
			var vo:MacroCommandTestVO = notification.getBody();

			// Fabricate a result
			vo.result2 = vo.input * vo.input;
		}
	}
}