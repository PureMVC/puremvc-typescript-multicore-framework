///<reference path='../../../../org/puremvc/typescript/interfaces/INotifier.ts'/>
///<reference path='../../../../org/puremvc/typescript/interfaces/IProxy.ts'/>
///<reference path='../../../../org/puremvc/typescript/interfaces/IMediator.ts'/>
///<reference path='../../../../org/puremvc/typescript/interfaces/INotification.ts'/>

module puremvc
{
	/**
	 * The interface definition for a PureMVC Facade.
	 *
	 *
	 * The Facade Pattern suggests providing a single class to act as a central point of
	 * communication for a subsystem.
	 * 
	 *
	 * In PureMVC, the Facade acts as an interface between the core MVC actors (Model, View,
	 * Controller) and the rest of your application.
	 */
	export interface IFacade
		extends INotifier
	{
		/**
		 * Register an <code>ICommand</code> with the <code>IController</code> associating it to a
		 * <code>INotification</code> name.
		 * 
		 * @param notificationName
		 *		The name of the <code>INotification</code> to associate the <code>ICommand</code>
		 *		with.
		 *
		 * @param commandClassRef
		 * 		A reference to the constructor of the <code>ICommand</code>.
		 */
		registerCommand( notificationName:string, commandClassRef:Function ):void;
		
		/**
		 * Remove a previously registered <code>ICommand</code> to <code>INotification</code>
		 * mapping from the <code>Controller</code>.
		 *
		 * @param notificationName
		 *		The name of the <code>INotification</code> to remove the <code>ICommand</code>
		 *		mapping for.
		 */
		removeCommand( notificationName:string ): void;

		/**
		 * Check if an <code>ICommand</code> is registered for a given <code>Notification</code>.
		 * 
		 * @param notificationName
		 * 		The name of the <code>INotification</code> to verify for the existence of a
		 * 		<code>ICommand</code> mapping for.
		 *
		 * @return
		 * 		A <code>Command</code> is currently registered for the given
		 *		<code>notificationName</code>.
		 */
		hasCommand( notificationName:string ):bool;

		/**
		 * Register an <code>IProxy</code> with the <code>Model</code> by name.
		 *
		 * @param proxy
		 *		The <code>IProxy</code> to be registered with the <code>Model</code>.
		 */
		registerProxy( proxy:IProxy ):void;

		/**
		 * Retrieve an <code>IProxy</code> from the <code>Model</code> by name.
		 * 
		 * @param proxyName
		 * 		The name of the <code>IProxy</code> to be retrieved.
		 *
		 * @return
		 * 		The <code>IProxy</code> previously registered with the given <code>proxyName</code>.
		 */
		retrieveProxy( proxyName:string ):IProxy;
		
		/**
		 * Remove an <code>IProxy</code> from the <code>Model</code> by name.
		 *
		 * @param proxyName
		 *		The <code>IProxy</code> to remove from the <code>Model</code>.
		 *
		 * @return
		 *		The <code>IProxy</code> that was removed from the <code>Model</code>
		 */
		removeProxy( proxyName:string ):IProxy;

		/**
		 * Check if a <code>Proxy</code> is registered.
		 * 
		 * @param proxyName
		 * 		The <code>IProxy</code> to verify the existence of a registration with the
		 *		<code>IModel</code>.
		 *
		 * @return
		 * 		A <code>Proxy</code> is currently registered with the given	<code>proxyName</code>.
		 */
		hasProxy( proxyName:string ):bool;

		/**
		 * Register a <code>IMediator</code> with the <code>IView</code>.
		 *
		 * @param mediator
		 		A reference to the <code>IMediator</code>.
		 */
		registerMediator( mediator:IMediator ):void;

		/**
		 * Retrieve an <code>IMediator</code> from the <code>IView</code>.
		 * 
		 * @param mediatorName
		 * 		The name of the registered <code>Mediator</code> to retrieve.
		 *
		 * @return
		 *		The <code>IMediator</code> previously registered with the given
		 *		<code>mediatorName</code>.
		 */
		retrieveMediator( mediatorName:string ):IMediator;

		/**
		 * Remove an <code>IMediator</code> from the <code>IView</code>.
		 * 
		 * @param mediatorName
		 * 		Name of the <code>IMediator</code> to be removed.
		 *
		 * @return
		 *		The <code>IMediator</code> that was removed from the <code>IView</code>
		 */
		removeMediator( mediatorName:string ):IMediator;
		
		/**
		 * Check if a Mediator is registered or not
		 * 
		 * @param mediatorName
		 * 		The name of the <code>IMediator</code> to verify the existence of a registration
		 *		for.
		 *
		 * @return
		 * 		An <code>IMediator</code> is registered with the given <code>mediatorName</code>.
		 */
		hasMediator( mediatorName:string ):bool;

		/**
		 * Notify the <code>IObservers</code> for a particular <code>INotification</code>.
		 *
		 *
		 * This method is left public mostly for backward compatibility, and to allow you to send
		 * custom notification classes using the facade.
		 *
		 * Usually you should just call sendNotification and pass the parameters, never having to
		 * construct the notification yourself.
		 * 
		 * @param notification
		 * 		The <code>INotification</code> to have the <code>IView</code> notify
		 *		<code>IObserver</code>s	of.
		 */
		notifyObservers( note:INotification ):void;
	}
}