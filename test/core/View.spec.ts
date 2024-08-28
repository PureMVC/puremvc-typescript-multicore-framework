//
//  View.spec.ts
//  PureMVC TypeScript Multicore
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD-3-Clause License
//

import {IView, View, IMediator, Mediator, INotification, Notification, IObserver, Observer} from "../../src"
import {ViewTestNote} from "./ViewTestNote";
import {ViewTestMediator} from "./ViewTestMediator";
import {ViewTestMediator2} from "./ViewTestMediator2";
import {ViewTestMediator3} from "./ViewTestMediator3";
import {ViewTestMediator4} from "./ViewTestMediator4";
import {ViewTestMediator5} from "./ViewTestMediator5";
import {ViewTestMediator6} from "./ViewTestMediator6";

/**
 * Test the PureMVC View class.
 */
describe("ViewTest", () => {

    /**
     * Tests the View Multiton Factory Method
     */
    test("testGetInstance", () => {
        // Test Factory Method
        const view: IView = View.getInstance("ViewTestKey1", (key: string) => new View(key));

        // test assertions
        expect(view).not.toBeNull();
    });

    /**
     * Tests registration and notification of Observers.
     *
     * <P>An Observer is created to callback the viewTestMethod of
     * this ViewTest instance. This Observer is registered with
     * the View to be notified of 'ViewTestEvent' events. Such
     * an event is created, and a value set on its payload. Then
     * the View is told to notify interested observers of this
     * Event.</P>
     *
     * <P>The View calls the Observer's notifyObserver method
     * which calls the viewTestMethod on this instance
     * of the ViewTest class. The viewTestMethod method will set
     * an instance variable to the value passed in on the Event
     * payload. We evaluate the instance variable to be sure
     * it is the same as that passed out as the payload of the
     * original 'ViewTestEvent'.</P>
     */
    test("testRegisterAndNotifyObserver", () => {
        // Get the Multiton View instance
        const view: IView = View.getInstance("ViewTestKey2", (key: string) => new View(key));

        let viewTestVar: number = 0;
        let handleNotification = (notification: INotification) => {
            viewTestVar = notification.body;
        };

        // Create observer, passing in notification method and context
        let observer: IObserver = new Observer(handleNotification, this);

        // Register Observer's interest in a particular Notification with the View
        view.registerObserver(ViewTestNote.NAME, observer);

        // Create a ViewTestNote, setting
        // a body value, and tell the View to notify
        // Observers. Since the Observer is this class
        // and the notification method is viewTestMethod,
        // successful notification will result in our local
        // viewTestVar being set to the value we pass in
        // on the note body.
        let note: Notification = ViewTestNote.create(10);
        view.notifyObservers(note);

        // test assertions
        expect(viewTestVar).toBe(10);
    });

    /**
     * Tests registering and retrieving a mediator with
     * the View.
     */
    test("testRegisterAndRetrieveMediator", () => {
        // Get the Multiton View instance
        const view: IView = View.getInstance("ViewTestKey3", (key: string) => new View(key));

        // Create and register the test mediator
        let viewTestMediator = new ViewTestMediator(this);
        view.registerMediator(viewTestMediator);

        // Retrieve the component
        let mediator : IMediator | null = view.retrieveMediator(ViewTestMediator.NAME);

        // test assertions
        expect(mediator).toBe(viewTestMediator);
    });

    /**
     * Tests the hasMediator Method
     */
    test("testHasMediator", () => {
        // Get the Multiton View instance
        const view: IView = View.getInstance("ViewTestKey4", (key: string) => new View(key));

        // Create and register the test mediator
        let mediator = new Mediator("hasMediatorTest", this);
        view.registerMediator(mediator);

        // assert that the view.hasMediator method returns true
        // for that mediator name
        expect(view.hasMediator("hasMediatorTest")).toBeTruthy();

        view.removeMediator("hasMediatorTest");

        // assert that the view.hasMediator method returns false
        // for that mediator name
        expect(view.hasMediator("hasMediatorTest")).toBeFalsy();
    });

    /**
     * Tests registering and removing a mediator
     */
    test("testRegisterAndRemoveMediator", () => {
        // Get the Multiton View instance
        const view = View.getInstance("ViewTestKey5", (key: string) => new View(key));

        // Create and register the test mediator
        let mediator: IMediator = new Mediator("testing", this);
        view.registerMediator(mediator);

        // Remove the component
        let removedMediator = view.removeMediator("testing");

        // assert that we have removed the appropriate mediator
        expect(removedMediator?.name).toBe("testing");

        // assert that the mediator is no longer retrievable
        expect(view.retrieveMediator("testing")).toBeFalsy();
    });

    /**
     * Tests that the View called the onRegister and onRemove methods
     */
    test("testOnRegisterAndOnRemove", () => {
        // Get the Multiton View instance
        const view = View.getInstance("ViewTestKey6", (key: string) => new View(key));

        // Create and register the test mediator
        let obj = {onRegisterCalled: false, onRemoveCalled: false};
        let mediator = new ViewTestMediator4(obj);
        view.registerMediator(mediator);

        // assert that onRegister was called, and the mediator responded by setting our boolean
        expect(obj.onRegisterCalled).toBeTruthy();

        // Remove the component
        view.removeMediator(ViewTestMediator4.NAME);

        // assert that the mediator is no longer retrievable
        expect(obj.onRemoveCalled).toBeTruthy();
    });

    /**
     * Tests successive register and remove of same mediator.
     */
    test("testSuccessiveRegisterAndRemoveMediator", () => {
        // Get the Multiton View instance
        const view = View.getInstance("ViewTestKey7", (key: string) => new View(key));

        // Create and register the test mediator,
        // but not so we have a reference to it
        view.registerMediator(new ViewTestMediator(this));

        // test that we can retrieve it
        expect(view.retrieveMediator(ViewTestMediator.NAME)).toBeInstanceOf(ViewTestMediator);

        // Remove the Mediator
        view.removeMediator(ViewTestMediator.NAME);

        // test that retrieving it now returns null
        expect(view.retrieveMediator(ViewTestMediator.NAME)).toBeNull();

        // test that removing the mediator again once its gone doesn't cause crash
        expect(view.retrieveMediator(ViewTestMediator.NAME)).toBeNull();

        // Create and register another instance of the test mediator,
        view.registerMediator(new ViewTestMediator(this));

        expect(view.retrieveMediator(ViewTestMediator.NAME)).toBeInstanceOf(ViewTestMediator);

        // Remove the Mediator
        view.removeMediator(ViewTestMediator.NAME);

        // test that retrieving it now returns null
        expect(view.retrieveMediator(ViewTestMediator.NAME)).toBeNull();
    });

    /**
     * Tests registering a Mediator for 2 different notifications, removing the
     * Mediator from the View, and seeing that neither notification causes the
     * Mediator to be notified. Added for the fix deployed in version 1.7
     */
    test("testRemoveMediatorAndSubsequentNotify", () => {
        // Get the Multiton View instance
        const view = View.getInstance("ViewTestKey8", (key: string) => new View(key));

        let obj = {lastNotification: ""};

        // Create and register the test mediator to be removed.
        view.registerMediator(new ViewTestMediator2(obj));

        // test that notifications work
        view.notifyObservers(new Notification(ViewTestNote.NOTE1));
        expect(obj.lastNotification).toBe(ViewTestNote.NOTE1);

        view.notifyObservers(new Notification(ViewTestNote.NOTE2));
        expect(obj.lastNotification).toBe(ViewTestNote.NOTE2);

        // Remove the Mediator
        view.removeMediator(ViewTestMediator2.NAME);

        // test that retrieving it now returns null
        expect(view.retrieveMediator(ViewTestMediator2.NAME)).toBeNull();

        // test that notifications no longer work
        // (ViewTestMediator2 is the one that sets lastNotification
        // on this component, and ViewTestMediator)
        obj.lastNotification = "";

        view.notifyObservers(new Notification(ViewTestNote.NOTE1));
        expect(obj.lastNotification).not.toBe(ViewTestNote.NOTE1);

        view.notifyObservers(new Notification(ViewTestNote.NOTE2));
        expect(obj.lastNotification).not.toBe(ViewTestNote.NOTE2);
    });

    test("testRemoveOneOfTwoMediatorsAndSubsequentNotify", () => {
        // Get the Multiton View instance
        const view = View.getInstance("ViewTestKey9", (key: string) => new View(key));

        let obj = {lastNotification: ""};

        // Create and register that responds to notifications 1 and 2
        view.registerMediator(new ViewTestMediator2(obj));

        // Create and register that responds to notification 3
        view.registerMediator(new ViewTestMediator3(obj));

        // test that all notifications work
        view.notifyObservers(new Notification(ViewTestNote.NOTE1));
        expect(obj.lastNotification).toBe(ViewTestNote.NOTE1);

        view.notifyObservers(new Notification(ViewTestNote.NOTE2));
        expect(obj.lastNotification).toBe(ViewTestNote.NOTE2);

        view.notifyObservers(new Notification(ViewTestNote.NOTE3));
        expect(obj.lastNotification).toBe(ViewTestNote.NOTE3);

        // Remove the Mediator that responds to 1 and 2
        view.removeMediator(ViewTestMediator2.NAME);

        // test that retrieving it now returns null
        expect(view.retrieveMediator(ViewTestMediator2.NAME)).toBeNull();

        // test that notifications no longer work
        // for notifications 1 and 2, but still work for 3
        obj.lastNotification = "";

        view.notifyObservers(new Notification(ViewTestNote.NOTE1));
        expect(obj.lastNotification).not.toBe(ViewTestNote.NOTE1);

        view.notifyObservers(new Notification(ViewTestNote.NOTE2));
        expect(obj.lastNotification).not.toBe(ViewTestNote.NOTE2);

        view.notifyObservers(new Notification(ViewTestNote.NOTE3));
        expect(obj.lastNotification).toBe(ViewTestNote.NOTE3);
    });

    /**
     * Tests registering the same mediator twice.
     * A subsequent notification should only illicit
     * one response. Also, since reregistration
     * was causing 2 observers to be created, ensure
     * that after removal of the mediator there will
     * be no further response.
     */
    test("testMediatorReregistration", () => {
        // Get the Multiton View instance
        const view = View.getInstance("ViewTestKey10", (key: string) => new View(key));
        let obj = {counter: 0};

        // Create and register that responds to notification 5
        view.registerMediator(new ViewTestMediator5(obj));

        // try to register another instance of that mediator (uses the same NAME constant).
        view.registerMediator(new ViewTestMediator5(obj));

        // test that the counter is only incremented once (mediator 5's response)
        view.notifyObservers(new Notification(ViewTestNote.NOTE5));
        expect(obj.counter).toBe(1);

        // Remove the Mediator
        view.removeMediator(ViewTestMediator5.NAME);

        // test that retrieving it now returns null
        expect(view.retrieveMediator(ViewTestMediator5.NAME)).toBeNull();

        // test that the counter is no longer incremented
        obj.counter = 0;
        view.notifyObservers(new Notification(ViewTestNote.NOTE5));
        expect(obj.counter).toBe(0);
    });

    /**
     * Tests the ability for the observer list to
     * be modified during the process of notification,
     * and all observers be properly notified. This
     * happens most often when multiple Mediators
     * respond to the same notification by removing
     * themselves.
     */
    test("testModifyObserverListDuringNotification", () => {
        const view = View.getInstance("ViewTestKey11", (key: string) => new View(key));
        let obj = {counter: 0};

        // Create and register several mediator instances that respond to notification 6
        // by removing themselves, which will cause the observer list for that notification
        // to change. versions prior to MultiCore Version 2.0.5 will see every other mediator
        // fails to be notified.
        view.registerMediator(new ViewTestMediator6(ViewTestMediator6.NAME + "/1", obj));
        view.registerMediator(new ViewTestMediator6(ViewTestMediator6.NAME + "/2", obj));
        view.registerMediator(new ViewTestMediator6(ViewTestMediator6.NAME + "/3", obj));
        view.registerMediator(new ViewTestMediator6(ViewTestMediator6.NAME + "/4", obj));
        view.registerMediator(new ViewTestMediator6(ViewTestMediator6.NAME + "/5", obj));
        view.registerMediator(new ViewTestMediator6(ViewTestMediator6.NAME + "/6", obj));
        view.registerMediator(new ViewTestMediator6(ViewTestMediator6.NAME + "/7", obj));
        view.registerMediator(new ViewTestMediator6(ViewTestMediator6.NAME + "/8", obj));

        // send the notification. each of the above mediators will respond by removing
        // themselves and incrementing the counter by 1. This should leave us with a
        // count of 8, since 8 mediators will respond.
        view.notifyObservers(new Notification(ViewTestNote.NOTE6));

        // verify the count is correct
        expect(obj.counter).toBe(8);

        // clear the counter
        obj.counter = 0;
        view.notifyObservers(new Notification(ViewTestNote.NOTE6));

        // verify the count is 0
        expect(obj.counter).toBe(0);
    });

});
