///<reference path='../../../../../../../test/lib/YUITest.d.ts'/>

///<reference path='../../../../../../../src/org/puremvc/typescript/interfaces/INotification.ts'/>
///<reference path='../../../../../../../src/org/puremvc/typescript/interfaces/IMediator.ts'/>

///<reference path='../../../../../../../src/org/puremvc/typescript/patterns/facade/Facade.ts'/>
///<reference path='../../../../../../../src/org/puremvc/typescript/patterns/mediator/Mediator.ts'/>

module puremvc
{
	"use strict";

	/**
	 * A <code>Mediator</code> utility subclass used by <code>MediatorTest</code>.
	 */
	export class MediatorTestSub
		extends Mediator
		implements IMediator
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