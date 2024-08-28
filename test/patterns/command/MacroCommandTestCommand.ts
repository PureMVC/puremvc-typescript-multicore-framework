//
//  MacroCommandTestCommand.spec.ts
//  PureMVC TypeScript Multicore
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD-3-Clause License
//

import {MacroCommand} from "../../../src"
import {MacroCommandTestSub1Command} from "./MacroCommandTestSub1Command";
import {MacroCommandTestSub2Command} from "./MacroCommandTestSub2Command";

/**
 * A MacroCommand subclass used by MacroCommandTest.
 *
 * @see MacroCommandTest
 * @see MacroCommandTestSub1Command
 * @see MacroCommandTestSub2Command
 * @see MacroCommandTestVO
 *
 * @class MacroCommandTestCommand
 * @extends MacroCommand
 */
export class MacroCommandTestCommand extends MacroCommand {

    /**
     * Initialize the MacroCommandTestCommand by adding
     * its 2 SubCommands.
     */
    public override initializeMacroCommand() {
        this.addSubCommand(() => new MacroCommandTestSub1Command());
        this.addSubCommand(() => new MacroCommandTestSub2Command());
    }

}
