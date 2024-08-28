//
//  Model.spec.ts
//  PureMVC TypeScript Multicore
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD-3-Clause License
//

import {IModel, Model, IProxy, Proxy} from "../../src"
import {ModelTestProxy} from "./ModelTestProxy";

/**
 * Test the PureMVC Model class.
 */
describe("ModelTest", () => {

    /**
     * Tests the Model Multiton Factory Method
     */
    test("testGetInstance", () => {
        // Test Factory Method
        const model: IModel = Model.getInstance("ModelTestKey1", (key: string) => new Model(key));

        // test assertions
        expect(model).toBeDefined();
    });

    /**
     * Tests the proxy registration and retrieval methods.
     *
     * <P>
     * Tests `registerProxy` and `retrieveProxy` in the same test.
     * These methods cannot currently be tested separately
     * in any meaningful way other than to show that the
     * methods do not throw exception when called. </P>
     */
    test("testRegisterAndRetrieveProxy", () => {
        // register a proxy and retrieve it.
        const model: IModel = Model.getInstance("ModelTestKey2", (key: string) => new Model(key));
        model.registerProxy(new Proxy("colors", ["red", "green", "blue"]));
        let proxy: IProxy | null = model.retrieveProxy("colors");
        expect(proxy).toBeDefined();
        let data = proxy?.data as string[];

        // test assertions
        expect(data).not.toBeNull();
        expect(data).toBeInstanceOf(Array);
        expect(data.length).toBe(3);
        expect(data[0]).toBe("red");
        expect(data[1]).toBe("green");
        expect(data[2]).toBe("blue");
    });

    /**
     * Tests the proxy removal method.
     */
    test("testRegisterAndRemoveProxy", () => {
        // register a proxy, remove it, then try to retrieve it
        const model: IModel = Model.getInstance("ModelTestKey3", (key: string) => new Model(key));
        let proxy: IProxy = new Proxy("sizes", ["7", "13", "21"]);
        model.registerProxy(proxy);

        // remove the proxy
        let removedProxy: IProxy | null = model.removeProxy("sizes");

        // assert that we removed the appropriate proxy
        expect(removedProxy).not.toBeNull();
        expect(removedProxy?.name).toBe("sizes");

        // ensure that the proxy is no longer retrievable from the model
        let proxy1 = model.retrieveProxy("sizes");

        // test assertions
        expect(proxy1).toBeNull();
    });

    /**
     * Tests the hasProxy Method
     */
    test("testHasProxy", () => {
        // register a proxy
        const model: IModel = Model.getInstance("ModelTestKey4", (key: string) => new Model(key));
        let proxy: IProxy = new Proxy("aces", ["clubs", "spades", "hearts", "diamonds"]);
        model.registerProxy(proxy);

        // assert that the model.hasProxy method returns true
        // for that proxy name
        expect(model.hasProxy("aces")).toBeTruthy();

        // remove the proxy
        model.removeProxy("aces");

        // assert that the model.hasProxy method returns false
        // for that proxy name
        expect(model.hasProxy("aces")).toBeFalsy();
    });

    /**
     * Tests that the Model calls the onRegister and onRemove methods
     */
    test("testOnRegisterAndOnRemove", () => {
        // Get a Multiton Model instance
        const model: IModel = Model.getInstance("ModelTestKey5", (key: string) => new Model(key));

        // Create and register the test proxy
        let proxy: IProxy = new ModelTestProxy();
        model.registerProxy(proxy);

        // assert that onRegister was called, and the proxy responded by setting its data accordingly
        expect(proxy.data).toBe(ModelTestProxy.ON_REGISTER_CALLED);

        // Remove the component
        model.removeProxy(ModelTestProxy.NAME);

        // assert that onRemove was called, and the proxy responded by setting its data accordingly
        expect(proxy.data).toBe(ModelTestProxy.ON_REMOVE_CALLED);
    });

});
