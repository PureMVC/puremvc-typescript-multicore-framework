//
//  Facade.ts
//  PureMVC TypeScript Multicore
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD-3-Clause License
//

import {IController} from "../../interfaces/IController";
import {IModel} from "../../interfaces/IModel";
import {IView} from "../../interfaces/IView";
import {ICommand} from "../../interfaces/ICommand";
import {IFacade} from "../../interfaces/IFacade";
import {IMediator} from "../../interfaces/IMediator";
import {INotification} from "../../interfaces/INotification";
import {IProxy} from "../../interfaces/IProxy";
import {Controller} from "../../core/Controller";
import {Model} from "../../core/Model";
import {View} from "../../core/View";
import {Notification} from "../observer/Notification";

/**
 * A base Multiton `Facade` implementation.
 *
 * @see {@link Model}
 * @see {@link View}
 * @see {@link Controller}
 *
 * @class Facade
 */
export class Facade implements IFacade {

    /** Message Constants
     * @type {string} */
    protected static MULTITON_MSG: string = "Facade instance for this Multiton key already constructed!";

    /** Multiton Instances
     * @type {{ [key: string]: IFacade }} */
    protected static instanceMap: { [key: string]: IFacade } = {};

    /** The Multiton Key for this Core
     * @type {string} */
    protected multitonKey!: string;

    /** Reference to Controller
     * @type {IController | undefined} */
    protected controller?: IController;

    /** Reference to Model
     * @type {IModel | undefined} */
    protected model?: IModel;

    /** Reference to View
     * @type {IView | undefined} */
    protected view?: IView;

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
    public constructor(key: string) {
        if (Facade.instanceMap[key] != null) throw Error(Facade.MULTITON_MSG);
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
    protected initializeFacade(): void {
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
    public static getInstance(key: string, factory: (key: string) => IFacade): IFacade {
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
    protected initializeModel(): void {
        this.model = Model.getInstance(this.multitonKey, (key: string) => new Model(key));
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
    protected initializeController(): void {
        this.controller = Controller.getInstance(this.multitonKey, (key: string) => new Controller(key));
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
    protected initializeView(): void {
        this.view = View.getInstance(this.multitonKey, (key: string) => new View(key));
    }

    /**
     * Register a `Command` with the `Controller` by Notification name.     *
     *
     * @param {string} notificationName - The name of the notification to associate with the command.
     * @param {() => ICommand} factory - A factory function that returns an instance of ICommand. This function is used to create the command.
     * @returns {void}
     */
    public registerCommand(notificationName: string, factory: () => ICommand): void {
        this.controller?.registerCommand(notificationName, factory);
    }

    /**
     * Check if a Command is registered for a given Notification
     *
     * @param {string} notificationName - The name of the notification to check.
     * @returns {boolean} `true` if a command is registered for the notification; otherwise, `false`.
     */
    public hasCommand(notificationName: string): boolean {
        return this.controller?.hasCommand(notificationName) ?? false;
    }

    /**
     * Remove a previously registered `Command` to `Notification` mapping from the Controller.
     *
     * @param {string} notificationName - The name of the notification for which the command should be removed.
     * @returns {void}
     */
    public removeCommand(notificationName: string): void {
        this.controller?.removeCommand(notificationName);
    }

    /**
     * Register a `Proxy` with the `Model` by name.
     *
     * @param {IProxy} proxy - The proxy instance to be registered.
     * @returns {void}
     */
    public registerProxy(proxy: IProxy): void {
        this.model?.registerProxy(proxy);
    }

    /**
     * Retrieve a `Proxy` from the `Model` by name.
     *
     * @param {string} proxyName - The name of the proxy to retrieve.
     * @returns {IProxy | null} The proxy instance associated with the given name, or `null` if no such proxy exists.
     */
    public retrieveProxy(proxyName: string): IProxy | null {
        return this.model?.retrieveProxy(proxyName) ?? null;
    }

    /**
     * Check if a `Proxy` is registered
     *
     * @param {string} proxyName - The name of the proxy to check.
     * @returns {boolean} `true` if a proxy is registered for the name; otherwise, `false`.
     */
    public hasProxy(proxyName: string): boolean {
        return this.model?.hasProxy(proxyName) ?? false;
    }

    /**
     * Remove a `Proxy` from the `Model` by name.
     *
     * @param {string} proxyName - The name of the proxy to remove.
     * @returns {IProxy | null} The removed proxy instance, or `null` if no such proxy exists.
     */
    public removeProxy(proxyName: string): IProxy | null {
        return this.model?.removeProxy(proxyName) ?? null;
    }

    /**
     * Register a `Mediator` with the `View`.
     *
     * @param {IMediator} mediator - The mediator instance to be registered.
     * @returns {void}
     */
    public registerMediator(mediator: IMediator): void {
        this.view?.registerMediator(mediator);
    }

    /**
     * Retrieve a `Proxy` from the `Model` by name.
     *
     * @param {string} mediatorName - The name of the mediator to retrieve.
     * @returns {IMediator | null} The mediator instance associated with the given name, or `null` if no such mediator exists.
     */
    public retrieveMediator(mediatorName: string): IMediator | null {
        return this.view?.retrieveMediator(mediatorName) ?? null;
    }

    /**
     * Check if a `Mediator` is registered or not
     *
     * @param {string} mediatorName - The name of the mediator to check.
     * @returns {boolean} `true` if a mediator is registered for the name; otherwise, `false`.
     */
    public hasMediator(mediatorName: string): boolean {
        return this.view?.hasMediator(mediatorName) ?? false;
    }

    /**
     * Remove a `Mediator` from the `View`.
     *
     * @param {string} mediatorName - The name of the mediator to remove.
     * @returns {IMediator | null} The removed mediator instance, or `null` if no such mediator exists.
     */
    public removeMediator(mediatorName: string): IMediator | null {
        return this.view?.removeMediator(mediatorName) ?? null;
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
    public notifyObservers(notification: INotification): void {
        this.view?.notifyObservers(notification);
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
    public sendNotification(notificationName: string, body?: any, type?: string): void {
        this.notifyObservers(new Notification(notificationName, body, type));
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
    public initializeNotifier(key: string): void {
        this.multitonKey = key;
    }

    /**
     * Check if a Core is registered or not
     *
     * @param {string} key - The unique key to check for an existing facade instance.
     * @returns {boolean} `true` if a facade instance exists for the key; otherwise, `false`.
     */
    public static hasCore(key: string): boolean {
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
    public static removeCore(key: string): void {
        if (this.instanceMap[key] == null) return;
        Model.removeModel(key);
        View.removeView(key);
        Controller.removeController(key);
        delete this.instanceMap[key];
    }

}
