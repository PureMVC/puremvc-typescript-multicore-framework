///<reference path='../../../../../../../test/lib/YUITest.d.ts'/>

module puremvc
{
	"use strict";

	/**
	 * A utility class used by FacadeTest.
	 */
	export class FacadeTestVO
	{
		/**
		 * Constructs a <code>FacadeTestVo</code> instance.
		 *
		 * @param input
		 * 		The number to be fed to the FacadeTestCommand
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