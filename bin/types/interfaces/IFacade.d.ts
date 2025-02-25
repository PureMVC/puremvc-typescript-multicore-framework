import { INotifier } from "./INotifier";
import { ICommand } from "./ICommand";
import { IMediator } from "./IMediator";
import { INotification } from "./INotification";
import { IProxy } from "./IProxy";
/**
 * `IFacade` The interface definition for a PureMVC `Facade`.
 *
 * The `Facade` Pattern suggests providing a single
 * class to act as a central point of communication
 * for a subsystem.
 *
 * In PureMVC, the `Facade` acts as an interface between
 * the core MVC actors (`Model`, `View`, `Controller`) and
 * the rest of your application.
 *
 * @interface IFacade
 * @extends {INotifier}
 */
export interface IFacade extends INotifier {
    /**
     * Register an `ICommand` with the `Controller`
     *
     * @param {string} notificationName - the name of the `INotification` to associate the `ICommand` with.
     * @param {() => ICommand} factory - A factory that creates an instance of the `ICommand` to be registered.
     * @returns {void}
     */
    registerCommand(notificationName: string, factory: () => ICommand): void;
    /**
     * Check if a `ICommand` is registered for a given `Notification`
     *
     * @param {string} notificationName - The name of the notification to check.
     * @returns {boolean} `true` if a command is registered for the notification name, `false` otherwise.
     */
    hasCommand(notificationName: string): boolean;
    /**
     * Remove a previously registered `ICommand` to `INotification` mapping from the `Controller`.
     *
     * @param {string} notificationName - the name of the `INotification` to remove the `ICommand` mapping for
     * @returns {void}
     */
    removeCommand(notificationName: string): void;
    /**
     * Register an `IProxy` with the `Model` by name.
     *
     * @param {IProxy} proxy - the IProxy to be registered with the Model.
     * @returns {void}
     */
    registerProxy(proxy: IProxy): void;
    /**
     * Retrieve a `IProxy` from the `Model` by name.
     *
     * @param {string} proxyName - the name of the `IProxy` instance to be retrieved.
     * @returns {IProxy | null} the `IProxy` previously registered by `proxyName` with the `Model`.
     */
    retrieveProxy(proxyName: string): IProxy | null;
    /**
     * Check if a `Proxy` is registered
     *
     * @param {string} proxyName - The name of the proxy to check.
     * @returns {boolean} `true` if a proxy is registered with the name, `false` otherwise.
     */
    hasProxy(proxyName: string): boolean;
    /**
     * Remove an `IProxy` instance from the `Model` by name.
     *
     * @param {string} proxyName - the `IProxy` to remove from the `Model`.
     * @returns {IProxy | null} The removed proxy instance if found, or `null` if no proxy was registered with the given name.
     */
    removeProxy(proxyName: string): IProxy | null;
    /**
     * Register an `IMediator` instance with the `View`.
     *
     * @param {IMediator} mediator - a reference to the `IMediator` instance
     * @returns {void}
     */
    registerMediator(mediator: IMediator): void;
    /**
     * Retrieve an `IMediator` instance from the `View`.
     *
     * @param {string} mediatorName - the name of the `IMediator` instance to retrieve
     * @returns {IMediator | null} The mediator instance if found, or `null` if no mediator is registered with the given name.
     */
    retrieveMediator(mediatorName: string): IMediator | null;
    /**
     * Check if a `Mediator` is registered or not
     *
     * @param {string} mediatorName - The name of the mediator to check.
     * @returns {boolean} `true` if a mediator is registered with the name, `false` otherwise.
     */
    hasMediator(mediatorName: string): boolean;
    /**
     * Remove a `IMediator` instance from the `View`.
     *
     * @param {string} mediatorName - The name of the mediator to remove.
     * @returns {IMediator | null} The removed mediator instance if found, or `null` if no mediator was registered with the given name.
     */
    removeMediator(mediatorName: string): IMediator | null;
    /**
     * Notify Observers.
     *
     * This method is left public mostly for backward
     * compatibility, and to allow you to send custom
     * notification classes using the facade.
     *
     * Usually you should just call `sendNotification`
     * and pass the parameters, never having to
     * construct the notification yourself.
     *
     * @param {INotification} notification - the `INotification` to have the `View` notify `Observers` of.
     * @returns {void}
     */
    notifyObservers(notification: INotification): void;
}
