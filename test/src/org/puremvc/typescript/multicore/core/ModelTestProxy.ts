///<reference path='../../../../../../test/lib/YUITest.d.ts'/>

///<reference path='../../../../../../src/org/puremvc/typescript/interfaces/IProxy.ts'/>

///<reference path='../../../../../../src/org/puremvc/typescript/patterns/proxy/Proxy.ts'/>

module puremvc
{
	"use strict";

	/**
	 * A <code>Proxy</code> subclass used by <code>ModelTest</code> testCase.
	 */
	export class ModelTestProxy
		extends Proxy
		implements IProxy
	{
		/**
		 * Constructs a <code>ModelTestProxy</code> instance passing super its default name and
		 * an empty string initializer.
		 */
		constructor()
		{
			super( ModelTestProxy.NAME, '' );
		}

		/**
		 * @override.
		 */
		onRegister():void
		{
			this.setData( ModelTestProxy.ON_REGISTER_CALLED );
		}

		/**
		 * @override.
		 */
		onRemove():void
		{
			this.setData( ModelTestProxy.ON_REMOVE_CALLED );
		}

		/**
		 * @constant
		 */
		private static NAME:string = 'ModelTestProxy';

		/**
		 * @constant
		 */
		private static ON_REGISTER_CALLED:string = 'onRegister Called';

		/**
		 * @constant
		 */
		private static ON_REMOVE_CALLED:string = 'onRemove Called';
	}
}