///<reference path='../../../../../../../../test/lib/YUITest.d.ts'/>

///<reference path='../../../../../../../../src/org/puremvc/typescript/multicore/interfaces/ICommand.ts'/>
///<reference path='../../../../../../../../src/org/puremvc/typescript/multicore/interfaces/INotification.ts'/>

///<reference path='../../../../../../../../src/org/puremvc/typescript/multicore/patterns/command/SimpleCommand.ts'/>
///<reference path='../../../../../../../../src/org/puremvc/typescript/multicore/patterns/observer/Notification.ts'/>

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
		 * @param notification
		 * 		The <code>Notification</code> carrying the FacadeTestVO.
		 */
		execute( notification:INotification )
		{
			var vo:FacadeTestVO = <FacadeTestVO> notification.getBody();

			// Fabricate a result
			vo.result = 2 * vo.input;
		}
	}
}