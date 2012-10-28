module puremvc
{
	/**
	 * The interface definition for a PureMVC Proxy.
	 *
	 * In PureMVC, <code>IProxy</code> implementors assume these responsibilities:
	 * <UL>
	 * <LI>Implement a common method which returns the name of the Proxy.
	 * <LI>Provide methods for setting and getting the data object.
	 *
	 * Additionally, <code>IProxy</code>s typically:
	 * <UL>
	 * <LI>Maintain references to one or more pieces of model data.
	 * <LI>Provide methods for manipulating that data.
	 * <LI>Generate <code>INotifications</code> when their model data changes.
	 * <LI>Expose their name as a <code>public static const</code> called <code>NAME</code>, if they are not instantiated multiple times.
	 * <LI>Encapsulate interaction with local or remote services used to fetch and persist model data.
	 *
	 */
	export interface IProxy
	{
		/**
		 * Get the name of the <code>IProxy></code> instance.
		 *
		 * @return
		 * 		The name of the <code>IProxy></code> instance.
		 */
		getProxyName():string;

		/**
		 * Set the data of the <code>IProxy></code> instance.
		 *
		 * @param data
		 * 		The data to set for the <code>IProxy></code> instance.
		 */
		setData( data:any ):void;

		/**
		 * Get the data of the <code>IProxy></code> instance.
		 *
		 * @return
		 * 		The data held in the <code>IProxy</code> instance.
		 */
		getData():any;

		/**
		 * Called by the Model when the <code>IProxy</code> is registered. This method has to be
		 * overridden by the subclass to know when the instance is registered.
		 */
		onRegister( ):void;

		/**
		 * Called by the Model when the <code>IProxy</code> is removed. This method has to be
		 * overridden by the subclass to know when the instance is removed.
		 */
		onRemove( ):void;
	}
}