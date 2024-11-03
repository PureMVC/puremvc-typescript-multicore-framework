"use strict";
//
//  Mediator.ts
//  PureMVC TypeScript Multicore
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD-3-Clause License
//
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mediator = void 0;
const Notifier_1 = require("../observer/Notifier");
/**
 * A base `Mediator` implementation.
 *
 * @see {@link View}
 *
 * @class Mediator
 * @extends Notifier
 */
class Mediator extends Notifier_1.Notifier {
    /**
     * Constructor.
     *
     * @param {string} [name] - Optional name for the mediator. Defaults to `Mediator.NAME`.
     * @param {any} [viewComponent] - Optional view component associated with the mediator.
     */
    constructor(name, viewComponent) {
        super();
        this._name = name || Mediator.NAME;
        this._viewComponent = viewComponent;
    }
    /**
     * Called by the View when the Mediator is registered
     *
     * @returns {void}
     */
    onRegister() {
    }
    /**
     * Called by the View when the Mediator is removed
     *
     * @returns {void}
     */
    onRemove() {
    }
    /**
     * List the `Notification` names this
     * `Mediator` is interested in being notified of.
     *
     * @returns {string[]} An array of notification names.
     */
    listNotificationInterests() {
        return [];
    }
    /**
     * Handle `Notification`s.
     *
     * Typically, this will be handled in a switch statement,
     * with one 'case' entry per `Notification`
     * the `Mediator` is interested in.
     *
     * @param {INotification} notification - The notification to handle.
     * @returns {void}
     */
    handleNotification(notification) {
    }
    /**
     * the mediator name
     *
     * @returns {string} The name of the mediator.
     */
    get name() {
        return this._name;
    }
    /**
     * Get the `Mediator`'s view component.
     *
     * Additionally, an implicit getter will usually
     * be defined in the subclass that casts the view
     * object to a type, like this:
     *
     * @returns {any} The view component.
     */
    get viewComponent() {
        return this._viewComponent;
    }
    /**
     * Set the `Mediator`'s view component.
     *
     * @param {any} value - The new view component.
     */
    set viewComponent(value) {
        this._viewComponent = value;
    }
}
exports.Mediator = Mediator;
/** The default name for the mediator.
 * @type {string} */
Mediator.NAME = "Mediator";
