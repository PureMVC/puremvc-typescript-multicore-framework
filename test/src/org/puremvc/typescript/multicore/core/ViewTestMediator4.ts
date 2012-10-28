///<reference path='../../../../../../test/lib/YUITest.d.ts'/>

///<reference path='../../../../../../src/org/puremvc/typescript/interfaces/IMediator.ts'/>

///<reference path='../../../../../../src/org/puremvc/typescript/patterns/mediator/Mediator.ts'/>

///<reference path='ViewTest.ts'/>

module puremvc
{
	"use strict";

	/**
	 * A Mediator class used by ViewTest.
	 */
	export class ViewTestMediator4
		extends Mediator
		implements IMediator
	{
		/**
		 * Constructs a <code>Mediator</code> subclass instance.
		 *
		 * @param view
		 *		The view component handled by this <code>Mediator</code>.
		 */
		constructor( view:any )
		{
			super( ViewTestMediator4.NAME, view );
		}

		/**
		 * Standard getter to return the view handled by the
		 * <code>Mediator</code>.
		 *
		 * @return
		 * 		The view handled by the <code>Mediator</code>.
		 */
		getViewTest():any
		{
			return this.viewComponent;
		}

		/**
		 * @override
		 */
		onRegister()
		{
			this.getViewTest().onRegisterCalled = true;
		}

		/**
		 * @override
		 */
		onRemove()
		{
			this.getViewTest().onRemoveCalled = true;
		}

		/**
		 * The Mediator name.
		 *
		 * @constant
		 */
		private static NAME:string = 'ViewTestMediator4';
	}
}