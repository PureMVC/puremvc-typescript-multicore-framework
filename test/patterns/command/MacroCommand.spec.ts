//
//  MacroCommand.spec.ts
//  PureMVC TypeScript Multicore
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD-3-Clause License
//

import {Notification} from "../../../src";
import {MacroCommandTestVO} from "./MacroCommandTestVO";
import {MacroCommandTestCommand} from "./MacroCommandTestCommand";

/**
 * Test the PureMVC SimpleCommand class.
 *
 * @see MacroCommandTestVO
 * @see MacroCommandTestCommand
 */
describe("MacroCommandTest", () => {

    /**
     * Tests operation of a `MacroCommand`.
     *
     * This test creates a new `Notification`, adding a
     * `MacroCommandTestVO` as the body.
     * It then creates a `MacroCommandTestCommand` and invokes
     * its `execute` method, passing in the
     * `Notification`.
     *
     * The `MacroCommandTestCommand` has defined an
     * `initializeMacroCommand` method, which is
     * called automatically by its constructor. In this method
     * the `MacroCommandTestCommand` adds 2 SubCommands
     * to itself, `MacroCommandTestSub1Command` and
     * `MacroCommandTestSub2Command`.
     *
     * The `MacroCommandTestVO` has 2 result properties,
     * one is set by `MacroCommandTestSub1Command` by
     * multiplying the input property by 2, and the other is set
     * by `MacroCommandTestSub2Command` by multiplying
     * the input property by itself.
     *
     * Success is determined by evaluating the 2 result properties
     * on the `MacroCommandTestVO` that was passed to
     * the `MacroCommandTestCommand` on the Notification
     * body.
     */
    test("testMacroCommandExecute", () => {
        // Create the VO
        const vo: MacroCommandTestVO = new MacroCommandTestVO(5);

        // Create the Notification
        const notification = new Notification("MacroCommandTest", vo);

        // Create the SimpleCommand
        const command: MacroCommandTestCommand = new MacroCommandTestCommand();

        // Execute the SimpleCommand
        command.execute(notification);

        // test assertions
        expect(vo.result1).toBe(10);
        expect(vo.result2).toBe(25);
    });

});
