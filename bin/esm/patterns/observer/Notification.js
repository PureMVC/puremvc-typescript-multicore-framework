//
//  Notification.ts
//  PureMVC TypeScript Multicore
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD-3-Clause License
//
/**
 * A base `Notification` implementation.
 *
 * PureMVC does not rely upon underlying event models such
 * as the one provided with Flash, and ActionScript 3 does
 * not have an inherent event model.
 *
 * The Observer Pattern as implemented within PureMVC exists
 * to support event-driven communication between the
 * application and the actors of the MVC triad.
 *
 * Notifications are not meant to be a replacement for Events
 * in Flex/Flash/Apollo. Generally, `Mediator` implementors
 * place event listeners on their view components, which they
 * then handle in the usual way. This may lead to the broadcast of `Notification`s to
 * trigger `Command`s or to communicate with other `Mediators`. `Proxy` and `Command`
 * instances communicate with each other and `Mediator`s
 * by broadcasting `Notification`s.
 *
 * A key difference between Flash `Event`s and PureMVC
 * `Notification`s is that `Event`s follow the
 * 'Chain of Responsibility' pattern, 'bubbling' up the display hierarchy
 * until some parent component handles the `Event`, while
 * PureMVC `Notification`s follow a 'Publish/Subscribe'
 * pattern. PureMVC classes need not be related to each other in a
 * parent/child relationship in order to communicate with one another
 * using `Notification`s.
 *
 * @class Notification
 */
export class Notification {
    /**
     * Constructor.
     *
     * @param {string} name - The name of the notification.
     * @param {any} [body] - Optional data to be included with the notification.
     * @param {string} [type] - Optional type of the notification.
     */
    constructor(name, body, type) {
        this._name = name;
        this._body = body;
        this._type = type;
    }
    /**
     * Get the name of the `Notification` instance.
     *
     * @returns {string} The name of the notification.
     */
    get name() {
        return this._name;
    }
    /**
     * Get the body of the `Notification` instance.
     *
     * @returns {any} The body of the notification.
     */
    get body() {
        return this._body;
    }
    /**
     * Set the body of the `Notification` instance.
     *
     * @param {any} value - The new body to be set for the notification.
     */
    set body(value) {
        this._body = value;
    }
    /**
     * Get the type of the `Notification` instance.
     *
     * @returns {string | undefined} The type of the notification, or `undefined` if not set.
     */
    get type() {
        return this._type;
    }
    /**
     * Set the type of the `Notification` instance.
     *
     * @param {string | undefined} value - The new type to be set for the notification.
     */
    set type(value) {
        this._type = value;
    }
    /**
     * Get the string representation of the `Notification` instance.
     *
     * @returns {string} A string representation of the notification.
     */
    toString() {
        var _a;
        let msg = `Notification Name: ${this.name}`;
        msg += `\nBody: ${this.body ? this.body : "null"}`;
        msg += `\nType: ${(_a = this.type) !== null && _a !== void 0 ? _a : "null"}`;
        return msg;
    }
}
