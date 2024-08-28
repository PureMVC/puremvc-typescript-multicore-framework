//
//  ViewTestMediator.spec.ts
//  PureMVC TypeScript Multicore
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD-3-Clause License
//

import {Mediator} from "../../src"

/**
 * A Mediator class used by ViewTest.
 *
 * @class ViewTestMediator
 * @extends Mediator
 */
export class ViewTestMediator extends Mediator {

    public static NAME = "ViewTestMediator";

    /**
     * @param {any} view
     */
    public constructor(view: any) {
        super(ViewTestMediator.NAME, view);
    }

    public override listNotificationInterests(): string[] {
        // be sure that the mediator has some Observers created
        // in order to test removeMediator
        return ["ABC", "DEF", "GHI"];
    }

}
