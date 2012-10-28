///<reference path='../../../../../../../../test/lib/YUITest.d.ts'/>

///<reference path='../../../../../../../../src/org/puremvc/typescript/multicore/interfaces/ICommand.ts'/>
///<reference path='../../../../../../../../src/org/puremvc/typescript/multicore/interfaces/INotification.ts'/>

///<reference path='../../../../../../../../src/org/puremvc/typescript/multicore/patterns/command/SimpleCommand.ts'/>

///<reference path='NotifierTestVO.ts'/>

module puremvc
{
	"use strict";

	/**
	 * A SimpleCommand subclass used by NotifierTest.
	 */
	export class NotifierTestCommand
		extends SimpleCommand
		implements ICommand
	{
		/**
		 * Fabricate a result by multiplying the input by 2
		 *
		 * @param notification
		 * 		The Notification carrying the NotifierTestVO
		 */
		execute( notification:INotification )
		{
			var vo:NotifierTestVO = notification.getBody();

			// Fabricate a result
			vo.result = 2 * vo.input;
		}
	}
}