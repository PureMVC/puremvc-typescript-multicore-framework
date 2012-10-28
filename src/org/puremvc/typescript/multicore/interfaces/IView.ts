///<reference path='../../../../org/puremvc/typescript/interfaces/IObserver.ts'/>
///<reference path='../../../../org/puremvc/typescript/interfaces/IMediator.ts'/>
///<reference path='../../../../org/puremvc/typescript/interfaces/INotification.ts'/>
module puremvc
{
	/**
	 * The interface definition for a PureMVC view.
	 *
	 * In PureMVC, <code>IView</code> implementors assume these responsibilities:
	 *
	 * In PureMVC, the <code>View</code> class assumes these responsibilities:
	 * <UL>
	 * <LI>Maintain a cache of <code>IMediator</code> instances.
	 * <LI>Provide methods for registering, retrieving, and removing <code>IMediator</code>s.
	 * <LI>Notifiying <code>IMediator</code>s when they are registered or removed.
	 * <LI>Managing the <code>Observer</code> lists for each <code>INotification</code> in the
	 * application.
	 * <LI>Providing a method for attaching <code>IObservers</code> to an
	 * <code>INotification</code>'s <code>Observer</code> list.
	 * <LI>Providing a method for broadcasting an <code>INotification</code>.
	 * <LI>Notifying the <code>IObserver</code>s of a given <code>INotification</code> when it
	 * broadcasts.
	 */
	export interface IView
	{
		/**
		 * Register an <code>IObserver</code> to be notified of <code>INotifications</code> with a
		 * given name.
		 * 
		 * @param notificationName
		 * 		The name of the <code>INotifications</code> to notify this <code>IObserver</code>
		 * 		of.
		 *
		 * @param observer
		 * 		The <code>IObserver</code> to register.
		 */
		registerObserver( notificationName:string, observer:IObserver ):void;

		/**
		 * Remove a list of <code>Observer</code>s for a given <code>notifyContext</code> from an
		 * <code>Observer</code> list for a given <code>INotification</code> name.
		 *
		 * @param notificationName
		 * 		Which <code>IObserver</code> list to remove from.
		 *
		 * @param notifyContext
		 * 		Remove the <code>IObserver</code> with this object as its
		 *		<code>notifyContext</code>.
		 */
		removeObserver( notificationName:string, notifyContext:any ):void;

		/**
		 * Notify the <code>IObserver</code>s for a particular <code>INotification</code>.
		 *
		 * All previously attached <code>IObserver</code>s for this <code>INotification</code>'s
		 * list are notified and are passed a reference to the <code>INotification</code> in the
		 * order in which they were registered.
		 * 
		 * @param notification
		 * 		The <code>INotification</code> to notify <code>IObserver</code>s of.
		 */
		notifyObservers( note:INotification ):void;

		/**
		 * Register an <code>IMediator</code> instance with the <code>View</code>.
		 *
		 * Registers the <code>IMediator</code> so that it can be retrieved by name, and further
		 * interrogates the <code>IMediator</code> for its <code>INotification</code> interests.
		 *
		 * If the <code>IMediator</code> returns any <code>INotification</code> names to be
		 * notified about, an <code>Observer</code> is created to encapsulate the
		 * <code>IMediator</code> instance's <code>handleNotification</code> method and register
		 * it as an <code>Observer</code> for all <code>INotification</code>s the
		 * <code>IMediator</code> is interested in.
		 *
		 * @param mediator
		 * 		A reference to an <code>IMediator</code> implementation instance.
		 */
		registerMediator( mediator:IMediator ):void;

		/**
		 * Retrieve an <code>IMediator</code> from the <code>View</code>.
		 * 
		 * @param mediatorName
		 * 		The name of the <code>IMediator</code> instance to retrieve.
		 *
		 * @return
		 * 		The <code>IMediator</code> instance previously registered with the given
		 *		<code>mediatorName</code> or an explicit <code>null</code> if it doesn't exists.
		 */
		retrieveMediator( mediatorName:string ):IMediator;

		/**
		 * Remove an <code>IMediator</code> from the <code>View</code>.
		 * 
		 * @param mediatorName
		 * 		Name of the <code>IMediator</code> instance to be removed.
		 *
		 * @return
		 *		The <code>IMediator</code> that was removed from the <code>View</code> or a
		 *		strict <code>null</null> if the <code>Mediator</code> didn't exist.
		 */
		removeMediator( mediatorName:string ):IMediator;
		
		/**
		 * Check if a <code>IMediator</code> is registered or not.
		 * 
		 * @param mediatorName
		 * 		The <code>IMediator</code> name to check whether it is registered.
		 *
		 * @return
		 *		A <code>Mediator</code> is registered with the given <code>mediatorName</code>.
		 */
		hasMediator( mediatorName:string ):bool;
	}
}