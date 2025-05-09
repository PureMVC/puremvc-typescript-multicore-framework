"use strict";
//
//  Facade.ts
//  PureMVC TypeScript Multicore
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD-3-Clause License
//
Object.defineProperty(exports, "__esModule", { value: true });
exports.Facade = void 0;
const Controller_1 = require("../../core/Controller");
const Model_1 = require("../../core/Model");
const View_1 = require("../../core/View");
const Notification_1 = require("../observer/Notification");
/**
 * A base Multiton `Facade` implementation.
 *
 * @see {@link Model}
 * @see {@link View}
 * @see {@link Controller}
 *
 * @class Facade
 */
class Facade {
    /**
     * Constructor.
     *
     * This `Facade` implementation is a Multiton,
     * so you should not call the constructor
     * directly, but instead call the static Factory method,
     * passing the unique key for this instance
     * `Facade.getInstance(multitonKey)`
     *
     * @param {string} key
     *
     * @throws {Error} Error if instance for this Multiton key has already been constructed
     */
    constructor(key) {
        if (Facade.instanceMap[key] != null)
            throw Error(Facade.MULTITON_MSG);
        this.initializeNotifier(key);
        Facade.instanceMap[key] = this;
        this.initializeFacade();
    }
    /**
     * Initialize the Multiton `Facade` instance.
     *
     * Called automatically by the constructor. Override in your
     * subclass to do any subclass specific initializations. Be
     * sure to call `super.initializeFacade()`, though.
     *
     * @returns {void}
     */
    initializeFacade() {
        this.initializeModel();
        this.initializeController();
        this.initializeView();
    }
    /**
     * Facade Multiton Factory method
     *
     * @param {string} key - The unique key associated with the instance of the facade.
     * @param {(key: string) => IFacade} factory - A factory function that creates a new instance of the facade. It takes the key as a parameter and returns an `IFacade` instance.
     * @returns {IFacade} the Multiton instance of the Facade
     */
    static getInstance(key, factory) {
        if (Facade.instanceMap[key] == null)
            Facade.instanceMap[key] = factory(key);
        return Facade.instanceMap[key];
    }
    /**
     * Initialize the `Model`.
     *
     * Called by the `initializeFacade` method.
     * Override this method in your subclass of `Facade`
     * if one or both of the following are true:
     *
     * - You wish to initialize a different `Model`.
     * - You have `Proxy`s to register with the Model that do not
     * retrieve a reference to the Facade at construction time.`
     *
     * If you don't want to initialize a different `Model`,
     * call `super.initializeModel()` at the beginning of your
     * method, then register `Proxy`s.
     *
     * Note: This method is <i>rarely</i> overridden; in practice you are more
     * likely to use a `Command` to create and register `Proxy`s
     * with the `Model`, since `Proxy`s with mutable data will likely
     * need to send `Notification`s and thus will likely want to fetch a reference to
     * the `Facade` during their construction.
     *
     * @returns {void}
     */
    initializeModel() {
        this.model = Model_1.Model.getInstance(this.multitonKey, (key) => new Model_1.Model(key));
    }
    /**
     * Initialize the `Controller`.
     *
     * Called by the `initializeFacade` method.
     * Override this method in your subclass of `Facade`
     * if one or both of the following are true:
     *
     * - You wish to initialize a different `Controller`.
     * - You have `Commands` to register with the `Controller` at startup.`.
     *
     * If you don't want to initialize a different `Controller`,
     * call `super.initializeController()` at the beginning of your
     * method, then register `Command`s.
     *
     * @returns {void}
     */
    initializeController() {
        this.controller = Controller_1.Controller.getInstance(this.multitonKey, (key) => new Controller_1.Controller(key));
    }
    /**
     * Initialize the `View`.
     *
     * Called by the `initializeFacade` method.
     * Override this method in your subclass of `Facade`
     * if one or both of the following are true:
     *
     * - You wish to initialize a different `View`.
     * - You have `Observers` to register with the `View`
     *
     * If you don't want to initialize a different `View`,
     * call `super.initializeView()` at the beginning of your
     * method, then register `Mediator` instances.
     *
     * Note: This method is <i>rarely</i> overridden; in practice you are more
     * likely to use a `Command` to create and register `Mediator`s
     * with the `View`, since `Mediator` instances will need to send
     * `Notification`s and thus will likely want to fetch a reference
     * to the `Facade` during their construction.
     *
     * @returns {void}
     */
    initializeView() {
        this.view = View_1.View.getInstance(this.multitonKey, (key) => new View_1.View(key));
    }
    /**
     * Register a `Command` with the `Controller` by Notification name.     *
     *
     * @param {string} notificationName - The name of the notification to associate with the command.
     * @param {() => ICommand} factory - A factory function that returns an instance of ICommand. This function is used to create the command.
     * @returns {void}
     */
    registerCommand(notificationName, factory) {
        var _a;
        (_a = this.controller) === null || _a === void 0 ? void 0 : _a.registerCommand(notificationName, factory);
    }
    /**
     * Check if a Command is registered for a given Notification
     *
     * @param {string} notificationName - The name of the notification to check.
     * @returns {boolean} `true` if a command is registered for the notification; otherwise, `false`.
     */
    hasCommand(notificationName) {
        var _a, _b;
        return (_b = (_a = this.controller) === null || _a === void 0 ? void 0 : _a.hasCommand(notificationName)) !== null && _b !== void 0 ? _b : false;
    }
    /**
     * Remove a previously registered `Command` to `Notification` mapping from the Controller.
     *
     * @param {string} notificationName - The name of the notification for which the command should be removed.
     * @returns {void}
     */
    removeCommand(notificationName) {
        var _a;
        (_a = this.controller) === null || _a === void 0 ? void 0 : _a.removeCommand(notificationName);
    }
    /**
     * Register a `Proxy` with the `Model` by name.
     *
     * @param {IProxy} proxy - The proxy instance to be registered.
     * @returns {void}
     */
    registerProxy(proxy) {
        var _a;
        (_a = this.model) === null || _a === void 0 ? void 0 : _a.registerProxy(proxy);
    }
    /**
     * Retrieve a `Proxy` from the `Model` by name.
     *
     * @param {string} proxyName - The name of the proxy to retrieve.
     * @returns {IProxy | null} The proxy instance associated with the given name, or `null` if no such proxy exists.
     */
    retrieveProxy(proxyName) {
        var _a, _b;
        return (_b = (_a = this.model) === null || _a === void 0 ? void 0 : _a.retrieveProxy(proxyName)) !== null && _b !== void 0 ? _b : null;
    }
    /**
     * Check if a `Proxy` is registered
     *
     * @param {string} proxyName - The name of the proxy to check.
     * @returns {boolean} `true` if a proxy is registered for the name; otherwise, `false`.
     */
    hasProxy(proxyName) {
        var _a, _b;
        return (_b = (_a = this.model) === null || _a === void 0 ? void 0 : _a.hasProxy(proxyName)) !== null && _b !== void 0 ? _b : false;
    }
    /**
     * Remove a `Proxy` from the `Model` by name.
     *
     * @param {string} proxyName - The name of the proxy to remove.
     * @returns {IProxy | null} The removed proxy instance, or `null` if no such proxy exists.
     */
    removeProxy(proxyName) {
        var _a, _b;
        return (_b = (_a = this.model) === null || _a === void 0 ? void 0 : _a.removeProxy(proxyName)) !== null && _b !== void 0 ? _b : null;
    }
    /**
     * Register a `Mediator` with the `View`.
     *
     * @param {IMediator} mediator - The mediator instance to be registered.
     * @returns {void}
     */
    registerMediator(mediator) {
        var _a;
        (_a = this.view) === null || _a === void 0 ? void 0 : _a.registerMediator(mediator);
    }
    /**
     * Retrieve a `Proxy` from the `Model` by name.
     *
     * @param {string} mediatorName - The name of the mediator to retrieve.
     * @returns {IMediator | null} The mediator instance associated with the given name, or `null` if no such mediator exists.
     */
    retrieveMediator(mediatorName) {
        var _a, _b;
        return (_b = (_a = this.view) === null || _a === void 0 ? void 0 : _a.retrieveMediator(mediatorName)) !== null && _b !== void 0 ? _b : null;
    }
    /**
     * Check if a `Mediator` is registered or not
     *
     * @param {string} mediatorName - The name of the mediator to check.
     * @returns {boolean} `true` if a mediator is registered for the name; otherwise, `false`.
     */
    hasMediator(mediatorName) {
        var _a, _b;
        return (_b = (_a = this.view) === null || _a === void 0 ? void 0 : _a.hasMediator(mediatorName)) !== null && _b !== void 0 ? _b : false;
    }
    /**
     * Remove a `Mediator` from the `View`.
     *
     * @param {string} mediatorName - The name of the mediator to remove.
     * @returns {IMediator | null} The removed mediator instance, or `null` if no such mediator exists.
     */
    removeMediator(mediatorName) {
        var _a, _b;
        return (_b = (_a = this.view) === null || _a === void 0 ? void 0 : _a.removeMediator(mediatorName)) !== null && _b !== void 0 ? _b : null;
    }
    /**
     * Notify `Observer`s.
     *
     * This method is left public mostly for backward
     * compatibility, and to allow you to send custom
     * notification classes using the facade.
     *
     * Usually you should just call `sendNotification`
     * and pass the parameters, never having to
     * construct the notification yourself.
     *
     * @param {INotification} notification - The notification to be sent to observers.
     * @returns {void}
     */
    notifyObservers(notification) {
        var _a;
        (_a = this.view) === null || _a === void 0 ? void 0 : _a.notifyObservers(notification);
    }
    /**
     * Create and send an `Notification`.
     *
     * Keeps us from having to construct new notification
     * instances in our implementation code.
     *
     * @param {string} notificationName - The name of the notification to be sent.
     * @param {any} [body] - Optional data to be included with the notification.
     * @param {string} [type] - Optional type of the notification.
     * @returns {void}
     */
    sendNotification(notificationName, body, type) {
        this.notifyObservers(new Notification_1.Notification(notificationName, body, type));
    }
    /**
     * Set the Multiton key for this facade instance.
     *
     * Not called directly, but instead from the
     * constructor when getInstance is invoked.
     * It is necessary to be public in order to
     * implement Notifier.
     *
     * @param {string} key - The unique key to identify this instance of the notifier.
     * @returns {void}
     */
    initializeNotifier(key) {
        this.multitonKey = key;
    }
    /**
     * Check if a Core is registered or not
     *
     * @param {string} key - The unique key to check for an existing facade instance.
     * @returns {boolean} `true` if a facade instance exists for the key; otherwise, `false`.
     */
    static hasCore(key) {
        return this.instanceMap[key] != null;
    }
    /**
     * Remove a Core.
     *
     * Remove the Model, View, Controller and Facade
     * instances for the given key.
     *
     * @param {string} key - The unique key associated with the facade instance to be removed.
     * @returns {void}
     */
    static removeCore(key) {
        if (this.instanceMap[key] == null)
            return;
        Model_1.Model.removeModel(key);
        View_1.View.removeView(key);
        Controller_1.Controller.removeController(key);
        delete this.instanceMap[key];
    }
}
exports.Facade = Facade;
/** Message Constants
 * @type {string} */
Facade.MULTITON_MSG = "Facade instance for this Multiton key already constructed!";
/** Multiton Instances
 * @type {{ [key: string]: IFacade }} */
Facade.instanceMap = {};
