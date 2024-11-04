//
//  ViewTestMediator4.spec.ts
//  PureMVC TypeScript Multicore
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD-3-Clause License
//

import {Mediator} from "../../src";

/**
 * @class ViewTestMediator4
 * @extends Mediator
 */
export class ViewTestMediator4 extends Mediator {

    public static NAME: string = "ViewTestMediator4";

    /**
     * Constructor
     * @param {Object} view
     */
    public constructor(view: any) {
        super(ViewTestMediator4.NAME, view);
    }

    /**
     * @override
     */
    public onRegister() {
        this.viewComponent.onRegisterCalled = true;
    }

    /**
     * @override
     */
    public onRemove() {
        this.viewComponent.onRemoveCalled = true;
    }

}
