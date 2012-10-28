///<reference path='../../../../../../../test/lib/YUITest.d.ts'/>

///<reference path='../../../../../../../src/org/puremvc/typescript/interfaces/ICommand.ts'/>

///<reference path='../../../../../../../src/org/puremvc/typescript/patterns/command/SimpleCommand.ts'/>

///<reference path='SimpleCommandTestVO.ts'/>

module puremvc
{
	"use strict";

	/**
	 * A <code>SimpleCommand</code> utility subclass used by <code>SimpleCommandTest</code>.
	 */
	export class SimpleCommandTestSub
		extends SimpleCommand
		implements ICommand
	{
		/**
		 * A method to test if <code>Facade</code> instance of the object has well been declared
		 * during its construction.
		 *
		 * @return
		 * 		<code>Facade</code> instance of the object has well been declared during its
		 * 		construction.
		 */
		hasFacade():bool
		{
			return this.facade instanceof Facade;
		}
	}
}