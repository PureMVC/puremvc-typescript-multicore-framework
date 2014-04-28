///<reference path='../../../../../../org/puremvc/typescript/multicore/interfaces/IProxy.ts'/>
///<reference path='../../../../../../org/puremvc/typescript/multicore/interfaces/INotifier.ts'/>

///<reference path='../../../../../../org/puremvc/typescript/multicore/patterns/observer/Notifier.ts'/>

module puremvc
{
	"use strict";
	
	/**
	 * A base <code>IProxy</code> implementation. 
	 *
	 * In PureMVC, <code>IProxy</code> implementors assume these responsibilities:
	 * <UL>
	 * <LI>Implement a common method which returns the name of the <code>Proxy</code>.
	 * <LI>Provide methods for setting and getting the data object.
	 *
	 * Additionally, <code>IProxy</code> typically:
	 * <UL>
	 * <LI>Maintain references to one or more pieces of model data.
	 * <LI>Provide methods for manipulating that data.
	 * <LI>Generate <code>INotification</code>s when their model data changes.
	 * <LI>Expose their name as a <code>constant</code> called <code>NAME</code>, if they are not
	 * instantiated multiple times.
	 * <LI>Encapsulate interaction with local or remote services used to fetch and persist model
	 * data.
	 */
	export class Proxy
		extends Notifier
		implements IProxy, INotifier
	{
		/**
		 * The name of the <code>Proxy</code>.
		 *
		 * @protected
		 */
		proxyName:string = null;

		/**
		 * The data object controlled by the <code>Proxy</code>.
		 *
		 * @protected
		 */
		data:any = null;

		/**
		 * Constructs a <code>Proxy</code> instance.
		 *
		 * @param proxyName
		 * 		The name of the <code>Proxy</code> instance.
		 *
		 * @param data
		 * 		An initial data object to be held by the <code>Proxy</code>.
		 */
		constructor( proxyName:string=null, data:any=null )
		{
			super();

			this.proxyName = (proxyName != null) ? proxyName : Proxy.NAME;

			if( data != null )
				this.setData(data);
		}

		/**
		 * Get the name of the <code>Proxy></code> instance.
		 *
		 * @return
		 * 		The name of the <code>Proxy></code> instance.
		 */
		getProxyName():string
		{
			return this.proxyName;
		}		

		/**
		 * Set the data of the <code>Proxy></code> instance.
		 *
		 * @param data
		 * 		The data to set for the <code>Proxy></code> instance.
		 */
		setData( data:any ):void
		{
			this.data = data;
		}

		/**
		 * Get the data of the <code>Proxy></code> instance.
		 *
		 * @return
		 * 		The data held in the <code>Proxy</code> instance.
		 */
		getData():any
		{
			return this.data;
		}

		/**
		 * Called by the Model when the <code>Proxy</code> is registered. This method has to be
		 * overridden by the subclass to know when the instance is registered.
		 */
		onRegister():void
		{

		}

		/**
		 * Called by the Model when the <code>Proxy</code> is removed. This method has to be
		 * overridden by the subclass to know when the instance is removed.
		 */
		onRemove():void
		{

		}

		/**
		 * The default name of the <code>Proxy</code>
		 * 
		 * @type
		 * @constant
		 */
		 static NAME:string = "Proxy";
	}
}