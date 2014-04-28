///<reference path='../../../../../../../../bin/puremvc-typescript-multicore-1.1.d.ts'/>

module test
{
	"use strict";

	/**
	 * A <code>MacroCommand</code> utility subclass used by <code>MacroCommandTest</code>.
	 */
	export class MacroCommandTestSub
		extends puremvc.MacroCommand
		implements puremvc.ICommand
	{
		/**
		 * A method to test if <code>Facade</code> instance of the object has
		 * well been declared during its construction.
		 *
		 * @return
		 * 		<code>Facade</code> instance of the object has well been declared
		 * 		during its construction.
		 */
		hasFacade():boolean
		{
			return this.facade() instanceof puremvc.Facade;
		}
	}
}