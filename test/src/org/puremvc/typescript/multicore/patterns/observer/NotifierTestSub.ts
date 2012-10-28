///<reference path='../../../../../../../test/lib/YUITest.d.ts'/>

///<reference path='../../../../../../../src/org/puremvc/typescript/interfaces/INotifier.ts'/>
///<reference path='../../../../../../../src/org/puremvc/typescript/patterns/facade/Facade.ts'/>

///<reference path='../../../../../../../src/org/puremvc/typescript/patterns/observer/Notifier.ts'/>

module puremvc
{
	"use strict";

	/**
	 * A <code>Notifier</code> utility subclass used by <code>NotifierTest</code>.
	 */
	export class NotifierTestSub
		extends Notifier
		implements INotifier
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