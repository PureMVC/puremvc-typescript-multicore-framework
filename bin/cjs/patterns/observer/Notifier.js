"use strict";
//
//  Notifier.ts
//  PureMVC TypeScript Multicore
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD-3-Clause License
//
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notifier = void 0;
const Facade_1 = require("../facade/Facade");
/**
 * A Base `Notifier` implementation.
 *
 * `MacroCommand, Command, Mediator` and `Proxy`
 * all have a need to send `Notifications`.
 *
 * The `Notifier` interface provides a common method called
 * `sendNotification` that relieves implementation code of
 * the necessity to actually construct `Notifications`.
 *
 * The `Notifier` class, which all the above-mentioned classes
 * extend, provides an initialized reference to the `Facade`
 * Multiton, which is required for the convenience method
 * for sending `Notifications`, but also eases implementation as these
 * classes have frequent `Facade` interactions and usually require
 * access to the facade anyway.
 *
 * NOTE: In the MultiCore version of the framework, there is one caveat to
 * notifiers, they cannot send notifications or reach the facade until they
 * have a valid multitonKey.
 *
 * The multitonKey is set:
 *   - on a Command when it is executed by the Controller
 *   - on a Mediator is registered with the View
 *   - on a Proxy is registered with the Model.
 *
 * @see {@link Proxy}
 * @see {@link Facade}
 * @see {@link Mediator}
 * @see {@link MacroCommand}
 * @see {@link SimpleCommand}
 *
 * @class Notifier
 */
class Notifier {
    /**
     * Initialize this Notifier instance.
     *
     * This is how a Notifier gets its multitonKey.
     * Calls to sendNotification or to access the
     * facade will fail until after this method
     * has been called.
     *
     * Mediators, Commands or Proxies may override
     * this method in order to send notifications
     * or access the Multiton Facade instance as
     * soon as possible. They CANNOT access the facade
     * in their constructors, since this method will not
     * yet have been called.
     *
     * @param {string} key the multitonKey for this Notifier to use
     * @returns {void}
     */
    initializeNotifier(key) {
        this.multitonKey = key;
    }
    /**
     * Create and send an `Notification`.
     *
     * Keeps us from having to construct new Notification
     * instances in our implementation code.
     *
     * @param {string} notificationName - The name of the notification to be sent.
     * @param {any} [body] - Optional data to be included with the notification.
     * @param {string} [type] - Optional type of the notification.
     * @returns {void}
     */
    sendNotification(notificationName, body, type) {
        this.facade.sendNotification(notificationName, body, type);
    }
    /**
     * Return the Multiton Facade instance
     *
     * @returns {IFacade} The facade instance.
     * @throws {Error} If the multiton key is not initialized.
     */
    get facade() {
        if (this.multitonKey == null)
            throw Error(Notifier.MULTITON_MSG);
        return Facade_1.Facade.getInstance(this.multitonKey, (key) => new Facade_1.Facade(key));
    }
}
exports.Notifier = Notifier;
/** Message Constants
 * @type {string} */
Notifier.MULTITON_MSG = "multitonKey for this Notifier not yet initialized!";
