///<reference path='../../../../../../../test/lib/YUITest.d.ts'/>

///<reference path='../../../../../../../src/org/puremvc/typescript/interfaces/ICommand.ts'/>
///<reference path='../../../../../../../src/org/puremvc/typescript/interfaces/INotification.ts'/>

///<reference path='../../../../../../../src/org/puremvc/typescript/patterns/command/SimpleCommand.ts'/>
///<reference path='../../../../../../../src/org/puremvc/typescript/patterns/observer/Notification.ts'/>

///<reference path='FacadeTestVO.ts'/>

module puremvc
{
	"use strict";

	/**
	 * A SimpleCommand subclass used by FacadeTest.
	 */
	export class FacadeTestCommand
		extends SimpleCommand
		implements ICommand
	{
		/**
		 * Fabricate a result by multiplying the input by 2.
		 *
		 * @param note
		 * 		The Notification carrying the FacadeTestVO.
		 */
		execute( note:INotification )
		{
			var vo:FacadeTestVO = <FacadeTestVO> note.getBody();

			// Fabricate a result
			vo.result = 2 * vo.input;
		}
	}
}