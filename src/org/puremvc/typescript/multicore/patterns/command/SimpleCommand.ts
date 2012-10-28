///<reference path='../../../../../org/puremvc/typescript/interfaces/ICommand.ts'/>
///<reference path='../../../../../org/puremvc/typescript/interfaces/INotifier.ts'/>
///<reference path='../../../../../org/puremvc/typescript/interfaces/INotification.ts'/>
///<reference path='../../../../../org/puremvc/typescript/patterns/observer/Notifier.ts'/>

module puremvc
{
	"use strict";

	/**
	 * A base <code>ICommand</code> implementation.
	 * 
	 * Your subclass should override the <code>execute</code> method where your business logic will
	 * handle the <code>INotification</code>.
	 */
	export class SimpleCommand
		extends Notifier
		implements ICommand, INotifier
	{
		/**
		 * Fulfill the use-case initiated by the given <code>INotification</code>.
		 * 
		 * In the Command Pattern, an application use-case typically begins with some user action,
		 * which results in an <code>INotification</code> being broadcast, which is handled by
		 * business logic in the <code>execute</code> method of an <code>ICommand</code>.
		 * 
		 * @param notification
		 * 		The <code>INotification</code> to handle.
		 */
		public execute( notification:INotification ):void
		{

		}
	}
}