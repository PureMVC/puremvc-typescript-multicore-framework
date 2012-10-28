///<reference path='../../../../../../../test/lib/YUITest.d.ts'/>

///<reference path='../../../../../../../src/org/puremvc/typescript/interfaces/ICommand.ts'/>
///<reference path='../../../../../../../src/org/puremvc/typescript/interfaces/INotification.ts'/>

///<reference path='../../../../../../../src/org/puremvc/typescript/patterns/command/SimpleCommand.ts'/>

///<reference path='SimpleCommandTestVO.ts'/>

module puremvc
{
	"use strict";

	/**
	 * A SimpleCommand subclass used by SimpleCommandTest.
	 */
	export class SimpleCommandTestCommand
		extends SimpleCommand
		implements ICommand
	{
		/**
		 * Fabricate a result by multiplying the input by 2.
		 *
		 * @param note
		 * 		The <code>Notification</code> carrying the <code>SimpleCommandTestVO</code>.
		 */
		execute( note:INotification )
		{
			var vo:SimpleCommandTestVO = note.getBody();

			// Fabricate a result
			vo.result = 2 * vo.input;
		}
	}
}