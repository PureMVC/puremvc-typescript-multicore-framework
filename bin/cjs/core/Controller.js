"use strict";
//
//  Controller.ts
//  PureMVC TypeScript Multicore
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD-3-Clause License
//
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const View_1 = require("./View");
const Observer_1 = require("../patterns/observer/Observer");
/**
 * A Multiton `Controller` implementation.
 *
 * In PureMVC, the `Controller` class follows the
 * 'Command and Controller' strategy, and assumes these
 * responsibilities:
 *
 *
 * - Remembering which `Command`s
 * are intended to handle which `Notifications`.
 * - Registering itself as an `Observer` with
 * the `View` for each `Notification`
 * that it has a `Command` mapping for.
 * - Creating a new instance of the proper `Command`
 * to handle a given `Notification` when notified by the `View`.
 * - Calling the `Command`'s `execute`
 * method, passing in the `Notification`.
 *
 *
 * Your application must register `Commands` with the
 * Controller.
 *
 * The simplest way is to subclass `Facade`,
 * and use its `initializeController` method to add your
 * registrations.
 *
 * @see {@link View}
 * @see {@link Observer}
 * @see {@link Notification}
 * @see {@link SimpleCommand}
 * @see {@link MacroCommand}
 *
 * @class Controller
 */
class Controller {
    /**
     * Constructor.
     *
     * This `Controller` implementation is a Multiton,
     * so you should not call the constructor
     * directly, but instead call the static Factory method,
     * passing the unique key for this instance
     * `Controller.getInstance(multitonKey)`
     *
     * @param {string} key
     *
     * @throws {Error} Error if instance for this Multiton key has already been constructed
     */
    constructor(key) {
        if (Controller.instanceMap[key] != null) {
            throw Error(Controller.MULTITON_MSG);
        }
        this.multitonKey = key;
        Controller.instanceMap[key] = this;
        this.commandMap = {};
        this.initializeController();
    }
    /**
     * Initialize the Multiton `Controller` instance.
     *
     * Called automatically by the constructor.
     *
     * Note that if you are using a subclass of `View`
     * in your application, you should <i>also</i> subclass `Controller`
     * and override the `initializeController` method in the
     * following way:
     *
     * ```ts
     * // ensure that the Controller is talking to my View implementation
     * initializeController() {
     *   this.view = MyView.getInstance("ViewTestKey1", (key: string) => new View(key));
     * }
     * ```
     * @returns {void}
     */
    initializeController() {
        this.view = View_1.View.getInstance(this.multitonKey, (key) => new View_1.View(key));
    }
    /**
     * `Controller` Multiton Factory method.
     *
     * @param {string} key - The key used to identify the controller instance.
     * @param {(key: string) => IController} factory - A factory function that creates a new instance of the controller if one does not already exist for the specified key.
     * @returns {IController} The controller instance associated with the given key.
     */
    static getInstance(key, factory) {
        if (Controller.instanceMap[key] == null)
            Controller.instanceMap[key] = factory(key);
        return Controller.instanceMap[key];
    }
    /**
     * Register a particular `Command` class as the handler
     * for a particular `Notification`.
     *
     * If an `Command` has already been registered to
     * handle `Notification`s with this name, it is no longer
     * used, the new `Command` is used instead.
     *
     * The Observer for the new Command is only created if this the
     * first time a Command has been registered for this Notification name.
     *
     * @param {string} notificationName - The name of the notification to associate with the command.
     * @param {() => ICommand} factory - A factory function that returns an instance of the command.
     * @returns {void}
     */
    registerCommand(notificationName, factory) {
        var _a;
        if (this.commandMap[notificationName] == null) {
            (_a = this.view) === null || _a === void 0 ? void 0 : _a.registerObserver(notificationName, new Observer_1.Observer(this.executeCommand, this));
        }
        this.commandMap[notificationName] = factory;
    }
    /**
     * If a `Command` has previously been registered
     * to handle the given `Notification`, then it is executed.
     *
     * @param {INotification} notification - The notification containing the data or command details needed for execution.
     * @returns {void}
     */
    executeCommand(notification) {
        const factory = this.commandMap[notification.name];
        if (factory == null)
            return;
        const command = factory();
        command.initializeNotifier(this.multitonKey);
        command.execute(notification);
    }
    /**
     * Check if a Command is registered for a given Notification
     *
     * @param {string} notificationName - The name of the notification to check for a registered command.
     * @returns {boolean} `true` if a command is registered for the specified notification name; otherwise, `false`.
     */
    hasCommand(notificationName) {
        return this.commandMap[notificationName] != null;
    }
    /**
     * Remove a previously registered `Command` to `Notification` mapping.
     *
     * @param {string} notificationName - The name of the notification for which the associated command should be removed.
     * @returns {void}
     */
    removeCommand(notificationName) {
        var _a;
        // if the Command is registered...
        if (this.hasCommand(notificationName)) {
            // remove the observer
            (_a = this.view) === null || _a === void 0 ? void 0 : _a.removeObserver(notificationName, this);
            // remove the command
            delete this.commandMap[notificationName];
        }
    }
    /**
     * Remove a Controller instance
     *
     * @param {string} key - The key used to identify the controller instance to be removed.
     * @returns {void}
     */
    static removeController(key) {
        delete Controller.instanceMap[key];
    }
}
exports.Controller = Controller;
/** Message Constants
 * @type {string} */
Controller.MULTITON_MSG = "Controller instance for this Multiton key already constructed!";
/** Multiton Instances
 * @type {{ [key: string]: IController }} */
Controller.instanceMap = {};
