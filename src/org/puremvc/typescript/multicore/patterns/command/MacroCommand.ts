///<reference path='../../../../../org/puremvc/typescript/interfaces/ICommand.ts'/>
///<reference path='../../../../../org/puremvc/typescript/interfaces/INotifier.ts'/>
///<reference path='../../../../../org/puremvc/typescript/interfaces/INotification.ts'/>
///<reference path='../../../../../org/puremvc/typescript/patterns/observer/Notifier.ts'/>

module puremvc
{
	"use strict";
	
	/**
	 * A base <code>ICommand</code> implementation that executes other <code>ICommand</code>s.
	 *
	 * A <code>MacroCommand</code> maintains an list of <code>ICommand</code> constructor references
	 * called <i>SubCommand</i>s.
	 *
	 * When <code>execute</code> is called, the <code>MacroCommand</code> instantiates and calls
	 * <code>execute</code> on each of its <i>SubCommands</i> turn. Each <i>SubCommand</i> will be
	 * passed a reference to the original <code>INotification</code> that was passed to the
	 * <code>MacroCommand</code>'s <code>execute</code> method.
	 *
	 * Unlike <code>SimpleCommand</code>, your subclass should not override <code>execute</code>,
	 * but instead, should override the <code>initializeMacroCommand</code> method, calling
	 * <code>addSubCommand</code> once for each <i>SubCommand</i> to be executed.
	 *
	 */
	export class MacroCommand
		extends Notifier
		implements ICommand, INotifier
	{
		/**
		 * An array of <code>ICommand</code>s.
		 *
		 * @protected
		 */
		subCommands:Function[];
		
		/**
		 * Constructs a <code>MacroCommand</code> instance.
		 *
		 * You should not need to define a constructor in your subclasses, instead, override the
		 * <code>initializeMacroCommand</code> method.
		 * 
		 *
		 * If your subclass does define a constructor, be  sure to call <code>super()</code>.
		 */
		constructor()
		{
			super();

			this.subCommands = new Function[]();
			this.initializeMacroCommand();
		}

		/**
		 * Initialize the <code>MacroCommand</code>.
		 * 
		 * In your subclass, override this method to  initialize the <code>MacroCommand</code>'s
		 * <i>SubCommand</i> list with <code>ICommand</code> class references like this:
		 * 
		 * <pre>
		 *		// Initialize MyMacroCommand
		 *		public initializeMacroCommand():void
		 *		{
		 *			this.addSubCommand( FirstCommand );
		 *			this.addSubCommand( SecondCommand );
		 *			this.addSubCommand( ThirdCommand );
		 *		}
		 * </pre>
		 * 
		 * Note that <i>subCommand</i>s may be any <code>ICommand</code> implementor so
		 * <code>MacroCommand</code>s or <code>SimpleCommand</code>s are both acceptable.
		 */
		public initializeMacroCommand():void
		{
		
		}

		/**
		 * Add an entry to the <i>subCommands</i> list.
		 * 
		 * The <i>subCommands</i> will be called in First In/First Out (FIFO) order.
		 * 
		 * @param commandClassRef
		 *		A reference to the constructor of the <code>ICommand</code>.
		 */
		public addSubCommand( commandClassRef:Function ):void
		{
			this.subCommands.push(commandClassRef);
		}

		/** 
		 * Execute this <code>MacroCommand</code>'s <i>SubCommands</i>.
		 *
		 * The <i>SubCommands</i> will be called in First In/First Out (FIFO)
		 * order. 
		 * 
		 * @param notification
		 *		The <code>INotification</code> object to be passed to each <i>SubCommand</i> of
		 *		the list.
		 *
		 * @final
		 */
		public execute( notification:INotification ):void
		{
			var	subCommands:Function[] = this.subCommands.slice(0);
			var	len:number = this.subCommands.length;
			for( var i:number=0; i<len; i++ )
			{
				//TODO Any ?
				var commandClassRef:any = subCommands[i];
				var commandInstance:ICommand = new commandClassRef();
				commandInstance.execute( notification );
			}
			
			this.subCommands.splice(0);
		}
	}
}