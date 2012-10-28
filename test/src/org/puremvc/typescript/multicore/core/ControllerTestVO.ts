///<reference path='../../../../../../test/lib/YUITest.d.ts'/>

module puremvc
{
	"use strict";

	/**
	 * A utility class used by ControllerTest.
	 */
	export class ControllerTestVO
	{
		/**
		 * Constructs a <code>ControllerTestVO</code> instance.
		 *
		 * @param input
		 *		The number to be fed to the <code>ControllerTestCommand</code>.
		 */
		constructor( input:number )
		{
			this.input = input;
		}

		/**
		 * Will be used to store the number to pass to the command.
		 */
		input:number = 0;

		/**
		 * Will be used to read the result calculated by the command.
		 */
		result:number = 0;
	}
}