///<reference path='../../../../../../org/puremvc/typescript/multicore/interfaces/IMediator.ts'/>
///<reference path='../../../../../../org/puremvc/typescript/multicore/interfaces/INotifier.ts'/>
///<reference path='../../../../../../org/puremvc/typescript/multicore/interfaces/INotification.ts'/>
///<reference path='../../../../../../org/puremvc/typescript/multicore/patterns/observer/Notifier.ts'/>

module puremvc
{
	"use strict";

	/**
	 * A base <code>IMediator</code> implementation. 
	 * 
	 * Typically, a <code>Mediator</code> will be written to serve one specific control or group
	 * controls and so, will not have a need to be dynamically named.
	 */
	export class Mediator
		extends Notifier
		implements IMediator, INotifier
	{
		/**
		 * The name of the <code>Mediator</code>.
		 *
		 * @protected
		 */
		mediatorName:string = null;

		/**
		 * The <code>Mediator</code>'s view component.
		 *
		 * @protected
		 */
		viewComponent:any = null;

		/**
		 * Constructs a <code>Mediator</code> instance.
		 *
		 * @param mediatorName
		 * 		The name of the <code>Mediator</code>.
		 *
		 * @param viewComponent
		 * 		The view component handled by this <code>Mediator</code>.
		 */
		constructor( mediatorName:string=null, viewComponent:any=null )
		{
			super();

			this.mediatorName = (mediatorName != null) ? mediatorName : Mediator.NAME;
			this.viewComponent = viewComponent;	
		}

		/**
		 * Get the <code>Mediator</code> instance name.
		 *
		 * @return
		 * 		The <code>Mediator</code> instance name
		 */		
		getMediatorName():string
		{	
			return this.mediatorName;
		}

		/**
		 * Get the <code>Mediator</code>'s view component.
		 *
		 * Additionally, an implicit getter will usually be defined in the subclass that casts the
		 * view object to a type, like this:
		 * 
		 * <code>
		 *		getMenu():Menu
		 *		{
		 *			return <Menu> this.viewComponent;
		 *		}
		 * </code>
		 * 
		 * @return
		 * 		The <code>Mediator</code>'s default view component.
		 */
		getViewComponent():any
		{	
			return this.viewComponent;
		}

		/**
		 * Set the <code>IMediator</code>'s view component.
		 * 
		 * @param viewComponent
		 * 		The default view component to set for this <code>Mediator</code>.
		 */
		setViewComponent( viewComponent:any ):void
		{
			this.viewComponent = viewComponent;
		}

		/**
		 * List the <code>INotification</code> names this <code>IMediator</code> is interested in
		 * being notified of.
		 *
		 * @return
		 * 		The list of notifications names in which is interested the <code>Mediator</code>.
		 */
		listNotificationInterests():string[]
		{
			return new Array<string>();
		}

		/**
		 * Handle <code>INotification</code>s.
		 * 
		 *
		 * Typically this will be handled in a switch statement, with one 'case' entry per
		 * <code>INotification</code> the <code>Mediator</code> is interested in.
		 *
		 * @param notification
		 * 		The notification instance to be handled.
		 */ 
		handleNotification( notification:INotification ):void
		{

		}

		/**
		 * Called by the View when the Mediator is registered. This method has to be overridden
		 * by the subclass to know when the instance is registered.
		 */ 
		onRegister():void
		{

		}

		/**
		 * Called by the View when the Mediator is removed. This method has to be overridden
		 * by the subclass to know when the instance is removed.
		 */ 
		onRemove():void
		{

		}

		/**
		 * Default name of the <code>Mediator</code>.
		 *
		 * @constant
		 */
		static NAME:string = 'Mediator';
	}
}