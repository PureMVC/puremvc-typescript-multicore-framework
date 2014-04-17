///<reference path='../../../../../../../../bin/puremvc-typescript-multicore-1.0.d.ts'/>

module test
{
	"use strict";

	/**
	 * A <code>Proxy</code> utility subclass used by <code>ProxyTest</code>.
	 */
	export class ProxyTestSub
		extends puremvc.Proxy
		implements puremvc.IProxy
	{
		/**
		 * A method to test if <code>Facade</code> instance of the object has well been declared
		 * during its construction.
		 *
		 * @return
		 *		<code>Facade</code> instance of the object has well been declared during its
		 *		construction.
		 */
		hasFacade():boolean
		{
			return this.facade() instanceof puremvc.Facade;
		}
	}
}