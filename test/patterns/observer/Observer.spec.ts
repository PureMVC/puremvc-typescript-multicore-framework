//
//  Observer.spec.ts
//  PureMVC TypeScript Multicore
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD-3-Clause License
//

import {INotification, Notification, Observer} from "../../../src"

/**
 * Tests PureMVC Observer class.
 *
 * <P>Since the Observer encapsulates the interested object's
 * callback information, there are no getters, only setters.
 * It is, in effect write-only memory.</P>
 *
 * <P>Therefore, the only way to test it is to set the
 * notification method and context and call the notifyObserver
 * method.</P>
 */
describe("ObserverTest", () => {

    let observerTestVar: number = -1;

    const observerTestMethod = (notification: INotification): void => {
        observerTestVar = notification.body;
    };

    /**
     * Tests observer class when initialized by accessor methods.
     */
    test("testObserverAccessors", () => {
        // Create observer with null args, then
        // use accessors to set notification method and context
        const observer = new Observer(null, null);
        observer.notifyContext = this;
        observer.notifyMethod = observerTestMethod;

        // create a test event, setting a payload value and notify
        // the observer with it. since the observer is this class
        // and the notification method is observerTestMethod,
        // successful notification will result in our local
        // observerTestVar being set to the value we pass in
        // on the note body.
        let notification: INotification = new Notification("ObserverTestNote", 10);
        observer.notifyObserver(notification);

        // test assertions
        expect(observerTestVar).toBe(10);
    });

    /**
     * Tests observer class when initialized by constructor.
     */
    test("testObserverConstructor", () => {
        // Create observer with null args, then
        // use accessors to set notification method and context
        const observer = new Observer(observerTestMethod, this);

        // create a test note, setting a body value and notify
        // the observer with it. since the observer is this class
        // and the notification method is observerTestMethod,
        // successful notification will result in our local
        // observerTestVar being set to the value we pass in
        // on the note body.
        let notification: INotification = new Notification("ObserverTestNote", 5);
        observer.notifyObserver(notification);

        // test assertions
        expect(observerTestVar).toBe(5);
    });

    /**
     * Tests the compareNotifyContext method of the Observer class
     */
    test("testCompareNotifyContext", () => {
        // Create observer passing in notification method and context
        const observer = new Observer(observerTestMethod, this);
        let negTestObject: Object = {};

        // test assertions
        expect(observer.compareNotifyContext(negTestObject)).toBe(false);
        expect(observer.compareNotifyContext(this)).toBe(true);
    });

});
