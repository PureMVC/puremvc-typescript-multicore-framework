//
//  ViewTestMediator5.spec.ts
//  PureMVC TypeScript Multicore
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD-3-Clause License
//

import {Mediator, INotification} from "../../src"
import {ViewTestNote} from "./ViewTestNote";

/**
 * @class ViewTestMediator5
 * @extends Mediator
 */
export class ViewTestMediator5 extends Mediator {

    public static NAME: string = "ViewTestMediator5";

    /**
     *
     * @param {Object} view
     */
    public constructor(view: any) {
        super(ViewTestMediator5.NAME, view);
    }

    /**
     * @override
     * @returns {[string]}
     */
    public override listNotificationInterests(): string[] {
        return [ViewTestNote.NOTE5];
    }

    /**
     * @override
     * @param {Notification} notification
     */
    public override handleNotification(notification: INotification): void {
        this.viewComponent.counter++;
    }

}
