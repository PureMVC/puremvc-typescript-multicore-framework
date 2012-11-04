module test
{
	"use strict";

	/**
	 * A utility class used by SimpleCommandTest.
	 */
	export class SimpleCommandTestVO
	{
		/**
		 * Constructs a <code>SimpleCommandTestVO</code> instance.
		 *
		 * @param input
		 * 		The number to be fed to the	<code>SimpleCommandTestCommand</code>.
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
		result:number = null;
	}
}