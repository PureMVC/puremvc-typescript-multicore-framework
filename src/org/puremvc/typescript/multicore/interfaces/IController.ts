///<reference path='../../../../org/puremvc/typescript/interfaces/INotification.ts'/>

module puremvc
{
	/**
	 * The interface definition for a PureMVC Controller.
	 *
	 * In PureMVC, an <code>IController</code> implementor follows the 'Command and Controller'
	 * strategy, and assumes these responsibilities:
	 * <UL>
	 * <LI>Remembering which <code>ICommand</code>s are intended to handle which
	 * <code>INotification</code>s.
	 * <LI>Registering itself as an <code>IObserver</code> with the <code>View</code> for each
	 * <code>INotification</code> that it has an <code>ICommand</code> mapping for.
	 * <LI>Creating a new instance of the proper <code>ICommand</code> to handle a given
	 * <code>INotification</code> when notified by the <code>View</code>.
	 * <LI>Calling the <code>ICommand</code>'s <code>execute</code> method, passing in the
	 * <code>INotification</code>.
	 *
	 * Your application must register <code>ICommand</code>s with the <code>Controller</code>.
	 *
 	 * The simplest way is to subclass </code>Facade</code>, and use its
	 * <code>initializeController</code> method to add your registrations.
	 */
	export interface IController
	{
		/**
		 * If an <code>ICommand</code> has previously been registered to handle the given
		 * <code>INotification</code>, then it is executed.
		 * 
		 * @param notification
		 * 		The <code>INotification</code> the command will receive as parameter.
		 */
		executeCommand( notification:INotification ):void;
		
		/**
		 * Register a particular <code>ICommand</code> class as the handler for a particular
		 * <code>INotification</code>.
		 *
		 * If an <code>ICommand</code> has already been registered to handle
		 * <code>INotification</code>s with this name, it is no longer used, the new
		 * <code>ICommand</code> is used instead.
		 * 
		 * The <code>Observer</code> for the new <code>ICommand</code> is only created if this the
		 * first time an <code>ICommand</code> has been registered for this
		 * <code>Notification</code> name.
		 * 
		 * @param notificationName
		 * 		The name of the <code>INotification</code>.
		 *
		 * @param commandClassRef
		 * 		The constructor of the <code>ICommand</code>.
		 */
		//FIXME There is probably a special syntax to pass class / constructor reference or we may use at least callback: () => void if best
		registerCommand( notificationName:string, commandClassRef:Function ):void;
		
		/**
		 * Check if an <code>ICommand</code> is registered for a given <code>Notification</code>.
		 * 
		 * @param notificationName
		 * 		Name of the <code>Notification</code> to check wheter an <code>ICommand</code> is
		 * 		registered for.
		 *
		 * @return
		 * 		An <code>ICommand</code> is currently registered for the given
		 *		<code>notificationName</code>.
		 */
		hasCommand( notificationName:string ):bool;

		/**
		 * Remove a previously registered <code>ICommand</code> to <code>INotification</code>
		 * mapping.
		 *
		 * @param notificationName
		 * 		The name of the <code>INotification</code> to remove the <code>ICommand</code>
		 * 		mapping for.
		 */
		removeCommand( notificationName:string ):void;
	}
}