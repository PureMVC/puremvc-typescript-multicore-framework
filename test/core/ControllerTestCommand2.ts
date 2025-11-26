//
//  ControllerTestCommand.spec.ts
//  PureMVC TypeScript Multicore
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD-3-Clause License
//

import { SimpleCommand, INotification } from "../../src";
import { ControllerTestVO } from "./ControllerTestVO";

/**
 * A SimpleCommand subclass used by ControllerTest.
 *
 * @see ControllerTest
 * @see ControllerTestVO
 *
 * @class ControllerTestCommand2
 * @extends SimpleCommand
 */
export class ControllerTestCommand2 extends SimpleCommand {
  /**
   * Fabricate a result by multiplying the input by 2 and adding to the existing result
   *
   * @param {Notification} notification
   */
  public override execute(notification: INotification): void {
    const vo = notification.body as ControllerTestVO;

    // Fabricate a result
    vo.result = vo.result + 2 * vo.input;
  }
}
