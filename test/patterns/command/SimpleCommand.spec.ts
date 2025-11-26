//
//  SimpleCommand.spec.ts
//  PureMVC TypeScript Multicore
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD-3-Clause License
//

import { Notification } from "../../../src";
import { SimpleCommandTestVO } from "./SimpleCommandTestVO";
import { SimpleCommandTestCommand } from "./SimpleCommandTestCommand";

/**
 * Test the PureMVC SimpleCommand class.
 *
 * @see SimpleCommandTestVO
 * @see SimpleCommandTestCommand
 */
describe("SimpleCommandTest", () => {
  /**
   * Tests the `execute` method of a `SimpleCommand`.
   *
   * This test creates a new `Notification`, adding a
   * `SimpleCommandTestVO` as the body.
   * It then creates a `SimpleCommandTestCommand` and invokes
   * its `execute` method, passing in the note.
   *
   * Success is determined by evaluating a property on the
   * object that was passed on the Notification body, which will
   * be modified by the SimpleCommand.
   */
  test("testSimpleCommandExecute", () => {
    // Create the VO
    const vo = new SimpleCommandTestVO(5);

    // Create the Notification (note)
    const notification = new Notification("SimpleCommandTestNote", vo);

    // Create the SimpleCommand
    const command = new SimpleCommandTestCommand();

    // Execute the SimpleCommand
    command.execute(notification);

    // test assertions
    expect(vo.result).toBe(10);
  });
});
