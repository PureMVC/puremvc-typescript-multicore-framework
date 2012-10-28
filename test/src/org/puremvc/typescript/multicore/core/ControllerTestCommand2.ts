///<reference path='../../../../../../test/lib/YUITest.d.ts'/>

///<reference path='../../../../../../src/org/puremvc/typescript/interfaces/INotification.ts'/>
///<reference path='../../../../../../src/org/puremvc/typescript/interfaces/ICommand.ts'/>

///<reference path='../../../../../../src/org/puremvc/typescript/patterns/command/SimpleCommand.ts'/>

///<reference path='ControllerTestVO.ts'/>

module puremvc
{
	"use strict";

	import YUITest = module("YUITest");

	/**
	 * A SimpleCommand subclass used by ControllerTest.
	 */
	export class ControllerTestCommand2
		extends SimpleCommand
		implements ICommand
	{
		/**
		 * Fabricate a result by multiplying the input by 2 and adding to the existing result.
		 *
		 * This tests accumulation effect that would show if the command were executed more than
		 * once.
		 *
		 * @param note
		 * 		The note carrying the ControllerTestVO.
		 */
		execute( note:INotification )
		{
			var vo:ControllerTestVO = note.getBody();

			// Fabricate a result
			vo.result = vo.result+(2 * vo.input);
		}
	}
}