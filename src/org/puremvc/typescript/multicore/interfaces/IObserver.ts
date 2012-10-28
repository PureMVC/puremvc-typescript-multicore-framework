///<reference path='../../../../org/puremvc/typescript/interfaces/INotification.ts'/>

module puremvc
{
	/**
	 * The interface definition for a PureMVC Observer.
	 *
	 * In PureMVC, <code>IObserver</code> implementors assumes these responsibilities:
	 * <UL>
	 * <LI>Encapsulate the notification (callback) method of the interested object.
	 * <LI>Encapsulate the notification context (this) of the interested object.
	 * <LI>Provide methods for setting the interested object notification method and context.
	 * <LI>Provide a method for notifying the interested object.
	 *
	 * PureMVC does not rely upon underlying event models such as the one provided in JavaScript DOM API,
	 * and JavaScript does not have an inherent event model.
	 *
	 * The Observer Pattern as implemented within PureMVC exists to support event driven
	 * communication between the application and the actors of the MVC triad (Model, View, Controller).
	 *
	 * An Observer is an object that encapsulates information about an interested object with a
	 * notification method that should be called when an </code>INotification</code> is broadcast.
	 * The Observer then acts as a proxy for notifying the interested object.
	 *
	 * Observers can receive <code>Notification</code>s by having their <code>notifyObserver</code>
	 * method invoked, passing in an object implementing the <code>INotification</code> interface,
	 * such as a subclass of <code>Notification</code>.
	 * 
	 * @see puremvc.IView IView
	 * @see puremvc.INotification INotification
	 */
	export interface IObserver
	{
		/**
		 * Set the notification method.
		 *
		 * The notification method should take one parameter of type <code>INotification</code>.
		 * 
		 * @param notifyMethod
		 * 		The notification (callback) method of the interested object.
		 */
		setNotifyMethod( notifyMethod:Function ):void;
		
		/**
		/**
		 * Set the notification context.
		 * 
		 * @param notifyContext
		 * 		The notification context (this) of the interested object.
		 */
		setNotifyContext( notifyContext:any ):void;
		
		/**
		 * Notify the interested object.
		 * 
		 * @param note
		 * 		The <code>INotification</code> to pass to the interested object's notification
		 * 		method.
		 */
		notifyObserver( notification:INotification ):void;
		
		/**
		 * Compare an object to the notification context.
		 *
		 * @param object
		 * 		The object to compare.
		 *
		 * @return
		 * 		The object and the notification context are the same.
		 */
		compareNotifyContext( object:any ):bool;
	}
}