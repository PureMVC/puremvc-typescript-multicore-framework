///<reference path='../../../../../../../../test/lib/YUITest.d.ts'/>

///<reference path='../../../../../../../../src/org/puremvc/typescript/multicore/interfaces/ICommand.ts'/>
///<reference path='../../../../../../../../src/org/puremvc/typescript/multicore/interfaces/INotification.ts'/>

///<reference path='../../../../../../../../src/org/puremvc/typescript/multicore/patterns/observer/Notification.ts'/>
///<reference path='../../../../../../../../src/org/puremvc/typescript/multicore/patterns/command/SimpleCommand.ts'/>

///<reference path='MacroCommandTestVO.ts'/>

module puremvc
{
	"use strict";

	/**
	 * A SimpleCommand subclass used by MacroCommandTestCommand.
	 */
	export class MacroCommandTestSub2Command
		extends SimpleCommand
		implements ICommand
	{
		/**
		 * Fabricate a result by multiplying the input by 2.
		 *
		 * @param notification
		 * 		The <code>Notification</code> carrying the <code>MacroCommandTestVO</code>.
		 */
		execute( notification:INotification )
		{
			var vo:MacroCommandTestVO = notification.getBody();

			// Fabricate a result
			vo.result2 = vo.input * vo.input;
		}
	}
}