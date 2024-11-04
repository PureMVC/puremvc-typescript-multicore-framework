//
//  Notification.spec.ts
//  PureMVC TypeScript Multicore
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD-3-Clause License
//

import {INotification, Notification} from "../../../src";

/**
 * Test the PureMVC Notification class.
 *
 * @see Notification1
 */
describe("NotificationTest", () => {

    /**
     * Tests setting and getting the name using Notification class accessor methods.
     */
    test("testNameAccessors", () => {
        // Create a new Notification and use accessors to set the note name
        const notification: INotification = new Notification("TestNote");

        // test assertions
        expect(notification.name).toBe("TestNote");
    });

    /**
     * Tests setting and getting the body using Notification class accessor methods.
     */
    test("testBodyAccessors", () => {
        // Create a new Notification and use accessors to set the body
        const notification: INotification = new Notification("TestNote");
        notification.body = 5;

        // test assertions
        expect(notification.body).toBe(5);
    });

    /**
     * Tests setting the name and body using the Notification class Constructor.
     */
    test("testConstructor", () => {
        // Create a new Notification using the Constructor to set the note name and body
        const notification: INotification = new Notification("TestNote", 5, "TestNoteType");

        // test assertions
        expect(notification.name).toBe("TestNote");
        expect(notification.body).toBe(5);
        expect(notification.type).toBe("TestNoteType");
    });

    /**
     * Tests the toString method of the notification
     */
    test("testToString", () => {
        // Create a new Notification and use accessors to set the note name
        const notification: INotification = new Notification("TestNote", [1, 3, 5], "TestType");
        const ts = "Notification Name: TestNote\nBody: 1,3,5\nType: TestType";

        // test assertions
        expect(notification.toString()).toBe(ts);
    });

});
