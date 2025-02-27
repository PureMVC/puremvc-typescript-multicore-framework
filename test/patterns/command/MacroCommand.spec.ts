//
//  MacroCommand.spec.ts
//  PureMVC TypeScript Multicore
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD-3-Clause License
//

import { MacroCommand } from "../../../src/patterns/command/MacroCommand";
import { Notification } from "../../../src/patterns/observer/Notification";

/**
 * Test the PureMVC MacroCommand class.
 *
 * @see MacroCommand
 */
describe("MacroCommandTest", () => {

    test("testExecuteWithUndefinedSubCommand", () => {
        class TestMacroCommand extends MacroCommand {
            public initializeMacroCommand(): void {
                this.addSubCommand(undefined as any); // intentionally adding undefined
            }
        }

        const macroCommand = new TestMacroCommand();
        const notification = new Notification("TestNotification");
        
        // Call execute and ensure it handles the undefined command gracefully
        expect(() => macroCommand.execute(notification)).not.toThrow();

        // Since the subcommand was undefined, no ICommand should be executed, thus, nothing to assert on command effects
        // Additional assertions might include verifying that no state was changed
    });

});
