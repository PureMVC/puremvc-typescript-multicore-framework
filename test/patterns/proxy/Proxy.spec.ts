//
//  Proxy.spec.ts
//  PureMVC TypeScript Multicore
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD-3-Clause License
//

import {IProxy, Proxy} from "../../../src";

/**
 * Test the PureMVC Proxy class.
 *
 * @see IProxy
 * @see Proxy
 */
describe("ProxyTest", () => {

    /**
     * Tests getting the name using Proxy class accessor method. Setting can only be done in constructor.
     */
    test("testNameAccessor", () => {
        // Create a new Proxy and use accessors to set the proxy name
        const proxy: IProxy = new Proxy("TestProxy");

        // test assertions
        expect(proxy.name).toBe("TestProxy");

        const proxy2 = new Proxy();

        // test assertions
        expect(proxy2.name).toBe(Proxy.NAME);
    });

    /**
     * Tests setting and getting the data using Proxy class accessor methods.
     */
    test("testDataAccessors", () => {
        // Create a new Proxy and use accessors to set the data
        const proxy = new Proxy("colors");
        proxy.data = ["red", "green", "blue"];
        const data = proxy.data;

        // test assertions
        expect(data.length).toBe(3);
        expect(data[0]).toBe("red");
        expect(data[1]).toBe("green");
        expect(data[2]).toBe("blue");
    });

    /**
     * Tests setting the name and body using the Notification class Constructor.
     */
    test("testConstructor", () => {
        // Create a new Proxy using the Constructor to set the name and data
        const proxy = new Proxy("colors", ["red", "green", "blue"]);
        const data = proxy.data;

        // test assertions
        expect(data.length).toBe(3);
        expect(data[0]).toBe("red");
        expect(data[1]).toBe("green");
        expect(data[2]).toBe("blue");
    });

});
