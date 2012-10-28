///<reference path='../../../../../../../test/lib/YUITest.d.ts'/>

///<reference path='../../../../../../../src/org/puremvc/typescript/interfaces/ICommand.ts'/>
///<reference path='../../../../../../../src/org/puremvc/typescript/interfaces/INotification.ts'/>

///<reference path='../../../../../../../src/org/puremvc/typescript/patterns/command/MacroCommand.ts'/>

///<reference path='MacroCommandTestSub1Command.ts'/>
///<reference path='MacroCommandTestSub2Command.ts'/>

module puremvc
{
	"use strict";

	/**
	 * A MacroCommand subclass used by MacroCommandTest.
	 */
	export class MacroCommandTestCommand
		extends MacroCommand
		implements ICommand
	{
		/**
		 * Initialize the MacroCommandTestCommand by adding
		 * its 2 SubCommands.
		 *
		 * @override
		 */
		initializeMacroCommand()
		{
			this.addSubCommand( MacroCommandTestSub1Command );
			this.addSubCommand( MacroCommandTestSub2Command );
		}
	}
}