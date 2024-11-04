//
//  ViewTestMediator6.spec.ts
//  PureMVC TypeScript Multicore
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD-3-Clause License
//

import {Mediator, INotification} from "../../src";
import {ViewTestNote} from "./ViewTestNote";

/**
 * @class ViewTestMediator6
 * @extends Mediator
 */
export class ViewTestMediator6 extends Mediator {

    public static NAME: string = "ViewTestMediator6";

    public constructor(name: string, view: any) {
        super(name, view);
    }

    public override listNotificationInterests(): string[] {
        return [ViewTestNote.NOTE6];
    }

    public handleNotification(notification: INotification) {
        this.facade.removeMediator(this.name);
    }

    public override onRemove() {
        this.viewComponent.counter++;
    }

}
