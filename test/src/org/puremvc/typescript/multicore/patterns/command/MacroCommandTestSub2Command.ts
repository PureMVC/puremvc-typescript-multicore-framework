///<reference path='../../../../../../../test/lib/YUITest.d.ts'/>

///<reference path='../../../../../../../src/org/puremvc/typescript/interfaces/ICommand.ts'/>
///<reference path='../../../../../../../src/org/puremvc/typescript/interfaces/INotification.ts'/>

///<reference path='../../../../../../../src/org/puremvc/typescript/patterns/observer/Notification.ts'/>
///<reference path='../../../../../../../src/org/puremvc/typescript/patterns/command/SimpleCommand.ts'/>

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
		 * Fabricate a result by multiplying the input by 2
		 *
		 * @param note
		 * 		The <code>Notification</code> carrying the <code>MacroCommandTestVO</code>
		 */
		execute( note:INotification )
		{
			var vo:MacroCommandTestVO = note.getBody();

			// Fabricate a result
			vo.result2 = vo.input * vo.input;
		}
	}
}