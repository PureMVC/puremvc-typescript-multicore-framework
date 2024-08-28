//
//  SimpleCommandTestCommand.spec.ts
//  PureMVC TypeScript Multicore
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD-3-Clause License
//

import {SimpleCommand, INotification} from "../../../src"
import {SimpleCommandTestVO} from "./SimpleCommandTestVO";

/**
 * A SimpleCommand subclass used by SimpleCommandTest.
 *
 * @class SimpleCommandTestCommand
 * @extends SimpleCommand
 */
export class SimpleCommandTestCommand extends SimpleCommand {

    /**
     * Fabricate a result by multiplying the input by 2
     *
     * @param {Notification} notification event the `INotification` carrying the `SimpleCommandTestVO`
     */
    execute(notification: INotification): void {
        let vo: SimpleCommandTestVO = notification.body as SimpleCommandTestVO;

        // Fabricate a result
        vo.result = vo.input * 2;
    }

}
