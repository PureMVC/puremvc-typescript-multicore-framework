///<reference path='../../../../org/puremvc/typescript/interfaces/INotification.ts'/>

module puremvc
{
	
	/**
	 * The interface definition for a PureMVC Mediator.
	 *
	 *
	 * In PureMVC, <code>IMediator</code> implementors assume these responsibilities:
	 * <UL>
	 * <LI>Implement a common method which returns a list of all <code>INotification</code>s 
	 * the <code>IMediator</code> has interest in.
	 * <LI>Implement a notification callback method.
	 * <LI>Implement methods that are called when the IMediator is registered or removed from the View.
	 *
	 *
	 * Additionally, <code>IMediator</code>s typically:
	 * <UL>
	 * <LI>Act as an intermediary between one or more view components such as text boxes or 
	 * list controls, maintaining references and coordinating their behavior.
	 * <LI>In a PureMVC application, this the place where event listeners are added to view
	 * components, and their handlers implemented.
	 * <LI>Respond to and generate <code>INotifications</code>, interacting with of the rest of the
	 * PureMVC application.
	 *
	 *
	 * When an <code>IMediator</code> is registered with the <code>IView</code>, 
	 * the <code>IView</code> will call the <code>IMediator</code>'s 
	 * <code>listNotificationInterests</code> method. The <code>IMediator</code> will 
	 * return a list of <code>INotification</code> names which
	 * it wishes to be notified about.
	 * 
	 *
	 * The <code>IView</code> will then create an <code>Observer</code> object 
	 * encapsulating that <code>IMediator</code>'s (<code>handleNotification</code>) method
	 * and register it as an Observer for each <code>INotification</code> name returned by 
	 * <code>listNotificationInterests</code>.
	 */
	export interface IMediator
	{
		/**
		 * Get the <code>IMediator</code> instance name
		 * 
		 * @return
		 * 		The <code>IMediator</code> instance name
		 */
		getMediatorName():string;
		
		/**
		 * Get the <code>Mediator</code>'s view component.
		 *
		 * Additionally, an implicit getter will usually be defined in the subclass that casts the
		 * view object to a type, like this:
		 * 
		 * <code>
		 *		getMenu: function
		 *		{
		 *			return this.viewComponent;
		 *		}
		 * </code>
		 * 
		 * @return
		 * 		The <code>Mediator</code>'s view component.
		 */
		getViewComponent():any;

		/**
		 * Set the <code>IMediator</code>'s view component.
		 * 
		 * @param viewComponent
		 * 		The default view component to set for this <code>Mediator</code>.
		 */
		setViewComponent( viewComponent:any ):void;
		
		/**
		 * List the <code>INotification</code> names this <code>IMediator</code> is interested in
		 * being notified of.
		 *
		 * @return
		 * 		The list of notifications names in which is interested the <code>Mediator</code>.
		 */
		listNotificationInterests( ):string[];
		
		/**
		 * Handle <code>INotification</code>s.
		 * 
		 *
		 * Typically this will be handled in a switch statement, with one 'case' entry per
		 * <code>INotification</code> the <code>Mediator</code> is interested in.
		 *
		 * @param note
		 * 		The notification instance to be handled.
		 */ 
		handleNotification( notification:INotification ):void;
		
		/**
		 * Called by the View when the Mediator is registered. This method has to be overridden
		 * by the subclass to know when the instance is registered.
		 */ 
		onRegister():void;

		/**
		 * Called by the View when the Mediator is removed. This method has to be overridden
		 * by the subclass to know when the instance is removed.
		 */ 
		onRemove():void;
	}
}