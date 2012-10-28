///<reference path='../../../../org/puremvc/typescript/interfaces/IProxy.ts'/>

module puremvc
{
	/**
	 * The interface definition for a PureMVC Model.
	 *
	 * In PureMVC, the <code>IModel</code> class provides access to model objects
	 * <code>Proxie</code>s by named lookup.
	 *
	 * The <code>Model</code> assumes these responsibilities:
	 * <UL>
	 * <LI>Maintain a cache of <code>IProxy</code> instances.
	 * <LI>Provide methods for registering, retrieving, and removing <code>Proxy</code> instances.
	 *
	 * Your application must register <code>IProxy</code> instances with the <code>Model</code>.
	 * Typically, you use an <code>ICommand</code> to create and register <code>Proxy</code> instances
	 * once the <code>Facade</code> has initialized the Core actors.
	 */
	export interface IModel
	{
		/**
		 * Register an <code>IProxy</code> with the <code>Model</code>.
		 * 
		 * @param proxy
		 *		An <code>IProxy</code> to be held by the <code>Model</code>.
		 */
		registerProxy( proxy:IProxy ):void;

		/**
		 * Remove an <code>IProxy</code> from the <code>Model</code>.
		 *
		 * @param proxyName
		 *		The name of the <code>Proxy</code> instance to be removed.
		 *
		 * @return
		 *		The <code>IProxy</code> that was removed from the <code>Model</code> or an
		 *		explicit <code>null</null> if the <code>IProxy</code> didn't exist.
		 */
		removeProxy( proxyName:string ):IProxy;

		/**
		 * Retrieve an <code>IProxy</code> from the <code>Model</code>.
		 * 
		 * @param proxyName
		 *		 The <code>IProxy</code> name to retrieve from the <code>Model</code>.
		 *
		 * @return
		 *		The <code>IProxy</code> instance previously registered with the given
		 *		<code>proxyName</code> or an explicit <code>null</code> if it doesn't exists.
		 */
		retrieveProxy( proxyName:string ):IProxy;

		/**
		 * Check if a Proxy is registered
		 * 
		 * @param proxyName
		 *		The name of the <code>IProxy</code> to verify the existence of its registration.
		 *
		 * @return
		 *		A Proxy is currently registered with the given <code>proxyName</code>.
		 */
		hasProxy( proxyName:string ):bool;
	}
}