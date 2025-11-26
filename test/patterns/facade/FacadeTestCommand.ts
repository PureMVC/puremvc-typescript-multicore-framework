//
//  FacadeTestCommand.spec.ts
//  PureMVC TypeScript Multicore
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD-3-Clause License
//

import { SimpleCommand, INotification } from "../../../src";
import { FacadeTestVO } from "./FacadeTestVO";

/**
 * A SimpleCommand subclass used by FacadeTest.
 *
 * @see FacadeTest
 * @see FacadeTestVO
 *
 * @class FacadeTestCommand
 * @extends SimpleCommand
 */
export class FacadeTestCommand extends SimpleCommand {
  /**
   * Fabricate a result by multiplying the input by 2
   *
   * @param {Notification} notification the Notification carrying the FacadeTestVO
   */
  public override execute(notification: INotification): void {
    const vo: FacadeTestVO = notification.body as FacadeTestVO;

    // Fabricate a result
    vo.result = vo.input * 2;
  }
}
