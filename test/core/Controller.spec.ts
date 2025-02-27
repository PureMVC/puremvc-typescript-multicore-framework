//
//  Controller.spec.ts
//  PureMVC TypeScript Multicore
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD-3-Clause License
//

import { Controller, IController, View, INotification, Notification } from "../../src";
import {ControllerTestCommand} from "./ControllerTestCommand";
import {ControllerTestVO} from "./ControllerTestVO";
import {ControllerTestCommand2} from "./ControllerTestCommand2";

/**
 * Test the PureMVC Controller class.
 *
 * @see ControllerTestVO
 * @see ControllerTestCommand
 */
describe("ControllerTest", () => {

    /**
     * Tests the Controller Multiton Factory Method
     */
    test("testGetInstance", () => {
        // Test Factory Method
        const controller: IController = Controller.getInstance("ControllerTestKey1", (key: string) => new Controller(key));

        // test assertions
        expect(controller).toBeDefined();
    });

    /**
     * Tests Command registration and execution.
     *
     * This test gets a Multiton Controller instance
     * and registers the ControllerTestCommand class
     * to handle 'ControllerTest' Notifications.
     *
     * It then constructs such a Notification and tells the
     * Controller to execute the associated Command.
     * Success is determined by evaluating a property
     * on an object passed to the Command, which will
     * be modified when the Command executes.
     */
    test("testRegisterAndExecuteCommand", () => {
        // Create the controller, register the ControllerTestCommand to handle 'ControllerTest' notes
        const controller: IController = Controller.getInstance("ControllerTestKey2", (key: string) => new Controller(key));
        controller.registerCommand("ControllerTest", () => new ControllerTestCommand());

        // Create a 'ControllerTest' note
        const vo = new ControllerTestVO(12);
        const notification: INotification = new Notification("ControllerTest", vo);

        // Tell the controller to execute the Command associated with the note
        // the ControllerTestCommand invoked will multiply the vo.input value
        // by 2 and set the result on vo.result
        controller.executeCommand(notification);

        // test assertions
        expect(vo.result).toBe(24);
    });

    /**
     * Tests Command registration and removal.
     *
     * Tests that once a Command is registered and verified
     * working, it can be removed from the Controller.
     */
    test("testRegisterAndRemoveCommand", () => {
        // Create the controller, register the ControllerTestCommand to handle 'ControllerTest' notes
        const controller: IController = Controller.getInstance("ControllerTestKey3", (key: string) => new Controller(key));
        controller.registerCommand("ControllerRemoveTest", () => new ControllerTestCommand());

        // Create a 'ControllerTest' note
        const vo = new ControllerTestVO(12);
        const notification = new Notification("ControllerRemoveTest", vo);

        // Tell the controller to execute the Command associated with the note
        // the ControllerTestCommand invoked will multiply the vo.input value
        // by 2 and set the result on vo.result
        controller.executeCommand(notification);

        // test assertions
        expect(vo.result).toBe(24);

        // Reset result
        vo.result = 0;

        // Remove the Command from the Controller
        controller.removeCommand("ControllerRemoveTest");

        // Tell the controller to execute the Command associated with the
        // note. This time, it should not be registered, and our vo result
        // will not change
        controller.executeCommand(notification);

        // test assertions
        expect(vo.result).toBe(0);
    });

    test("testHasCommand", () => {
        // register the ControllerTestCommand to handle 'hasCommandTest' notes
        const controller: IController = Controller.getInstance("ControllerTestKey4", (key: string) => new Controller(key));
        controller.registerCommand("hasCommandTest", () => new ControllerTestCommand());

        // test that hasCommand returns true for hasCommandTest notifications
        expect(controller.hasCommand("hasCommandTest")).toBeTruthy();

        // Remove the Command from the Controller
        controller.removeCommand("hasCommandTest");

        // test that hasCommand returns false for hasCommandTest notifications
        expect(controller.hasCommand("hasCommandTest")).toBeFalsy();
    });

    /**
     * Tests Removing and Reregistering a Command
     *
     * Tests that when a Command is re-registered that it isn't fired twice.
     * This involves, minimally, registration with the controller but
     * notification via the View, rather than direct execution of
     * the Controller's executeCommand method as is done above in
     * testRegisterAndRemove. The bug under test was fixed in AS3 Standard
     * Version 2.0.2. If you run the unit tests with 2.0.1 this
     * test will fail.
     */
    test("testReregisterAndExecuteCommand", () => {
        const controller: IController = Controller.getInstance("ControllerTestKey5", (key: string) => new Controller(key));
        controller.registerCommand("ControllerTest2", () => new ControllerTestCommand2());

        // Remove the Command from the Controller
        controller.removeCommand("ControllerTest2");

        // Re-register the Command, ensure it's only firing once per notification
        controller.registerCommand("ControllerTest2", () => new ControllerTestCommand2());

        const vo = new ControllerTestVO(12);
        const note = new Notification("ControllerTest2", vo);

        const view = View.getInstance("ControllerTestKey5", (key: string) => new View(key));

        // Sending notification; expecting the command to be executed starting at zero and multiplying input to 24
        view.notifyObservers(note);
        expect(vo.result).toBe(24);

        // Send the notification again; should now evaluate to 48
        view.notifyObservers(note);
        expect(vo.result).toBe(48);
    });

    // Additional test case for constructing Controller with an existing key
    test("testConstructorWithExistingKey", () => {
        const key = "ControllerTestKeyExisting";
        const controller1: IController = Controller.getInstance(key, (key: string) => new Controller(key));
        expect(controller1).toBeDefined();
        expect(() => {
            new Controller(key);
        }).toThrow(Error("Controller instance for this Multiton key already constructed!"));
    });

    // Test for removing a command twice
    test("testRemoveCommandTwice", () => {
        const controller: IController = Controller.getInstance("ControllerTestKeyTwice", k => new Controller(k));

        controller.registerCommand("TestCommand", () => new ControllerTestCommand());

        controller.removeCommand("TestCommand");
        
        // Removing it again should not cause issues and should silently do nothing.
        controller.removeCommand("TestCommand");
    });

});
