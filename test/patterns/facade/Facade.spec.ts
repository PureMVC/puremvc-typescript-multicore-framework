//
//  Facade.spec.ts
//  PureMVC TypeScript Multicore
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD-3-Clause License
//

import {Facade, IProxy, Proxy, Mediator} from "../../../src"
import {FacadeTestCommand} from "./FacadeTestCommand";
import {FacadeTestVO} from "./FacadeTestVO";

/**
 * Test the PureMVC Facade class.
 *
 * @see FacadeTestVO
 * @see FacadeTestCommand
 */
describe("FacadeTest", () => {

    /**
     * Tests the Facade Multiton Factory Method
     */
    test("testGetInstance", () => {
        // Test Factory Method
        const facade = Facade.getInstance("FacadeTestKey1", (key: string) => new Facade(key));

        // test assertions
        expect(facade).not.toBeNull();
    });

    /**
     * Tests Command registration and execution via the Facade.
     *
     * <P>This test gets a Multiton Facade instance
     * and registers the FacadeTestCommand class
     * to handle 'FacadeTest' Notifications.<P>
     *
     * <P>It then sends a notification using the Facade.
     * Success is determined by evaluating
     * a property on an object placed in the body of
     * the Notification, which will be modified by the Command.</P>
     */
    test("testRegisterCommandAndSendNotification", () => {
        // Create the Facade, register the FacadeTestCommand to
        // handle 'FacadeTest' notifications
        const facade = Facade.getInstance("FacadeTestKey2", (key: string) => new Facade(key));
        facade.registerCommand("FacadeTestNote", () => new FacadeTestCommand());

        // Send notification. The Command associated with the event
        // (FacadeTestCommand) will be invoked, and will multiply
        // the vo.input value by 2 and set the result on vo.result
        let vo = new FacadeTestVO(32);
        facade.sendNotification("FacadeTestNote", vo);

        // test assertions
        expect(vo.result).toBe(64);
    });

    /**
     * Tests Command removal via the Facade.
     *
     * <P>This test gets a Multiton Facade instance
     * and registers the FacadeTestCommand class
     * to handle 'FacadeTest' Notifications. Then it removes the command.<P>
     *
     * <P>It then sends a Notification using the Facade.
     * Success is determined by evaluating
     * a property on an object placed in the body of
     * the Notification, which will NOT be modified by the Command.</P>
     */
    test("testRegisterAndRemoveCommandAndSendNotification", () => {
        // Create the Facade, register the FacadeTestCommand to
        // handle 'FacadeTest' events
        const facade = Facade.getInstance("FacadeTestKey3", (key: string) => new Facade(key));
        facade.registerCommand("FacadeTestNote", () => new FacadeTestCommand());
        facade.removeCommand("FacadeTestNote");

        // Send notification. The Command associated with the event
        // (FacadeTestCommand) will NOT be invoked, and will NOT multiply
        // the vo.input value by 2
        let vo = new FacadeTestVO(32);
        facade.sendNotification("FacadeTestNote", vo);

        // test assertions
        expect(vo.result).not.toBe(64);
    });

    /**
     * Tests the regsitering and retrieving Model proxies via the Facade.
     *
     * <P>Tests `registerProxy` and `retrieveProxy` in the same test.
     * These methods cannot currently be tested separately
     * in any meaningful way other than to show that the
     * methods do not throw exception when called.</P>
     */
    test("testRegisterAndRetrieveProxy", () => {
        // register a proxy and retrieve it.
        const facade = Facade.getInstance("FacadeTestKey4", (key: string) => new Facade(key));
        facade.registerProxy(new Proxy("colors", ["red", "green", "blue"]));
        let proxy = facade.retrieveProxy("colors");

        // test assertions
        expect(proxy).toBeInstanceOf(Proxy);

        // retrieve data from proxy
        let data = proxy?.data as string[];

        // test assertions
        expect(data).not.toBeNull();
        expect(data.length).toBe(3);
        expect(data[0]).toBe("red");
        expect(data[1]).toBe("green");
        expect(data[2]).toBe("blue");
    });

    /**
     * Tests the removing Proxies via the Facade.
     */
    test("testRegisterAndRemoveProxy", () => {
        // register a proxy, remove it, then try to retrieve it
        const facade = Facade.getInstance("FacadeTestKey5", (key: string) => new Facade(key));
        let proxy: IProxy = new Proxy("sizes", ["7", "13", "21"]);
        facade.registerProxy(proxy);

        // remove the proxy
        let removedProxy: IProxy | null = facade.removeProxy("sizes");

        // assert that we removed the appropriate proxy
        expect(proxy.name).toBe("sizes");

        // make sure we can no longer retrieve the proxy from the model
        let proxy1 = facade.retrieveProxy("sizes");

        // test assertions
        expect(proxy1).toBeNull();
    });

    /**
     * Tests registering, retrieving and removing Mediators via the Facade.
     */
    test("testRegisterRetrieveAndRemoveMediator", () => {
        // register a mediator, remove it, then try to retrieve it
        const facade = Facade.getInstance("FacadeTestKey6", (key: string) => new Facade(key));
        facade.registerMediator(new Mediator(Mediator.NAME, {}));

        // retrieve the mediator
        expect(facade.retrieveMediator(Mediator.NAME)).not.toBeNull();

        // remove the mediator
        let removedMediator = facade.removeMediator(Mediator.NAME);

        // assert that we have removed the appropriate mediator
        expect(removedMediator?.name).toBe(Mediator.NAME);

        // assert that the mediator is no longer retrievable
        expect(facade.retrieveMediator(Mediator.NAME)).toBeNull();
    });

    /**
     * Tests the hasProxy Method
     */
    test("testHasProxy", () => {
        // register a Proxy
        const facade = Facade.getInstance("FacadeTestKey7", (key: string) => new Facade(key));
        facade.registerProxy(new Proxy("hasProxyTest", [1, 2, 3]));

        // assert that the model.hasProxy method returns true
        // for that proxy name
        expect(facade.hasProxy("hasProxyTest")).toBeTruthy();
    });

    /**
     * Tests the hasMediator Method
     */
    test("testHasMediator", () => {
        // register a Mediator
        const facade = Facade.getInstance("FacadeTestKey8", (key: string) => new Facade(key));
        facade.registerMediator(new Mediator("facadeHasMediatorTest", {}));

        // assert that the facade.hasMediator method returns true
        // for that mediator name
        expect(facade.hasMediator("facadeHasMediatorTest")).toBeTruthy();

        facade.removeMediator("facadeHasMediatorTest");

        // assert that the facade.hasMediator method returns false
        // for that mediator name
        expect(facade.hasMediator("facadeHasMediatorTest")).toBeFalsy();
    });

    /**
     * Test hasCommand method.
     */
    test("testHasCommand", () => {
        // register the ControllerTestCommand to handle 'hasCommandTest' notes
        const facade = Facade.getInstance("FacadeTestKey9", (key: string) => new Facade(key));
        facade.registerCommand("facadeHasCommandTest", () => new FacadeTestCommand());

        // test that hasCommand returns true for hasCommandTest notifications
        expect(facade.hasCommand("facadeHasCommandTest")).toBeTruthy();

        // Remove the Command from the Controller
        facade.removeCommand("facadeHasCommandTest");

        // test that hasCommand returns false for hasCommandTest notifications
        expect(facade.hasCommand("facadeHasCommandTest")).toBeFalsy();
    });

    /**
     * Tests the hasCore and removeCore methods
     */
    test("testHasCoreAndRemoveCore", () => {
        // assert that the Facade.hasCore method returns false first
        expect(Facade.hasCore("FacadeTestKey10")).toBeFalsy();

        // register a Core
        const facade = Facade.getInstance("FacadeTestKey10", (key: string) => new Facade(key));

        // assert that the Facade.hasCore method returns true now that a Core is registered
        expect(Facade.hasCore("FacadeTestKey10")).toBeTruthy();

        // remove the Core
        Facade.removeCore("FacadeTestKey10");

        // assert that the Facade.hasCore method returns false now that the core has been removed.
        expect(Facade.hasCore("FacadeTestKey10")).toBeFalsy();
    });

});
