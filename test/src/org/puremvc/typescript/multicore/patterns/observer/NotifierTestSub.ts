///<reference path='../../../../../../../../bin/puremvc-typescript-multicore-1.0.d.ts'/>

module test
{
	"use strict";

	/**
	 * A <code>Notifier</code> utility subclass used by <code>NotifierTest</code>.
	 */
	export class NotifierTestSub
		extends puremvc.Notifier
		implements puremvc.INotifier
	{
		/**
		 * A method to test if <code>Facade</code> instance of the object has well been declared
		 * during its construction.
		 *
		 * @return
		 * 		<code>Facade</code> instance of the object has well been declared during its
		 * 		construction.
		 */
		hasFacade():boolean
		{
			return this.facade() instanceof puremvc.Facade;
		}
	}
}