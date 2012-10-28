///<reference path='../../../../../../../test/lib/YUITest.d.ts'/>

module puremvc
{
	"use strict";

	/**
	 * A utility class used by MacroCommandTest.
	 */
	export class MacroCommandTestVO
	{
		/**
		 * Constructs a <code>MacroCommandTestVO</code> instance.
		 *
		 * @param input
		 *		A random number to pass to the command.
		 */
		constructor( input:number )
		{
			this.input = input;
		}

		/**
		 * Will be used to store the number to pass to the command.
		 */
		input:number = null;

		/**
		 * Will be used to read the result calculated by the command.
		 */
		result1:number = null;

		/**
		 * Will be used to read the result calculated by the command.
		 */
		result2:number = null;
	}
}