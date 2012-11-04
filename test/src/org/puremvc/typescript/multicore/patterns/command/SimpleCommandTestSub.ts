///<reference path='../../../../../../../../bin/puremvc-typescript-multicore-1.0.d.ts'/>

///<reference path='SimpleCommandTestVO.ts'/>

module test
{
	"use strict";

	/**
	 * A <code>SimpleCommand</code> utility subclass used by <code>SimpleCommandTest</code>.
	 */
	export class SimpleCommandTestSub
		extends puremvc.SimpleCommand
		implements puremvc.ICommand
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
			return this.facade() instanceof puremvc.Facade;
		}
	}
}