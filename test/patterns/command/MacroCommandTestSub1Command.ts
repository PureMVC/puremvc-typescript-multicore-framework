//
//  MacroCommandTestSub1Command.spec.ts
//  PureMVC TypeScript Multicore
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD-3-Clause License
//

import {SimpleCommand, INotification} from "../../../src";
import {MacroCommandTestVO} from "./MacroCommandTestVO";

/**
 * A SimpleCommand subclass used by MacroCommandTestCommand.
 *
 * @see MacroCommandTest
 * @see MacroCommandTestCommand
 * @see MacroCommandTestVO
 *
 * @class MacroCommandTestSub1Command
 * @extends SimpleCommand
 */
export class MacroCommandTestSub1Command extends SimpleCommand {

    /**
     * Fabricate a result by multiplying the input by 2
     *
     * @param {Notification} notification event the `IEvent` carrying the `MacroCommandTestVO`
     */
    public override execute(notification: INotification) {
        const vo = notification.body as MacroCommandTestVO;

        // Fabricate a result
        vo.result1 = 2 * vo.input;
    }

}
