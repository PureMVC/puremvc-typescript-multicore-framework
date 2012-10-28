///<reference path='../../../../../../../test/lib/YUITest.d.ts'/>

///<reference path='../../../../../../../src/org/puremvc/typescript/interfaces/IProxy.ts'/>

///<reference path='../../../../../../../src/org/puremvc/typescript/patterns/proxy/Proxy.ts'/>
///<reference path='../../../../../../../src/org/puremvc/typescript/patterns/facade/Facade.ts'/>

module puremvc
{
	"use strict";

	import YUITest = module("YUITest");

	/**
	 * A <code>Proxy</code> utility subclass used by <code>ProxyTest</code>.
	 */
	export class ProxyTestSub
		extends Proxy
		implements IProxy
	{
		/**
		 * A method to test if <code>Facade</code> instance of the object has well been declared
		 * during its construction.
		 *
		 * @return
		 *		<code>Facade</code> instance of the object has well been declared during its
		 *		construction.
		 */
		hasFacade():bool
		{
			return this.facade instanceof Facade;
		}
	}
}