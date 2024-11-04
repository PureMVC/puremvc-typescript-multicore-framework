//
//  Notifier.spec.ts
//  PureMVC TypeScript Multicore
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD-3-Clause License
//

import {Facade, Notifier} from "../../../src";
import {FacadeTestVO} from "../facade/FacadeTestVO";
import {FacadeTestCommand} from "../facade/FacadeTestCommand";

/**
 * Test the PureMVC Notifier class.
 *
 * @see Facade
 */
describe("NotifierTest", () => {

    test("test", () => {
        const facade = Facade.getInstance("notifierTest", (key: string) => new Facade(key));

        expect(Facade.hasCore("notifierTest")).toBeTruthy();

        const vo = new FacadeTestVO(5);
        facade.registerCommand("testCommand", () => new FacadeTestCommand());

        const notifier = new Notifier();
        notifier.initializeNotifier("notifierTest");
        notifier.sendNotification("testCommand", vo);

        // test assertions
        expect(vo.result).toBe(10);
    });

});
