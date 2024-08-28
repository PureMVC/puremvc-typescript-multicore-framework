import { IMediator } from "./IMediator";
import { INotification } from "./INotification";
import { IObserver } from "./IObserver";
/**
 * `IView` The interface definition for a PureMVC `View`.
 *
 * In PureMVC, the View class assumes these responsibilities:
 *
 * - Maintain a cache of `IMediator` instances.
 *
 * - Provide methods for registering, retrieving, and removing `IMediators`.
 *
 * - Managing the observer lists for each `INotification` in the application.
 *
 * - Providing a method for attaching `IObservers` to an `INotification`'s observer list.
 *
 * - Providing a method for broadcasting an `INotification`.
 *
 * - Notifying the `IObservers` of a given `INotification` when it is broadcast.
 *
 * @interface IView
 */
export interface IView {
    /**
     * Register an `IObserver` to be notified
     * of `INotifications` with a given name.
     *
     * @param {string} notificationName - The name of the notification to register the observer for.
     * @param {IObserver} observer - The observer to be registered.
     * @returns {void}
     */
    registerObserver(notificationName: string, observer: IObserver): void;
    /**
     * Notify the `IObservers` for a particular `INotification`.
     *
     * All previously attached `IObservers` for this `INotification`'s
     * list are notified and are passed a reference to the `INotification` in
     * the order in which they were registered.
     *
     * @param {INotification} notification - the `INotification` to notify `IObservers` of.
     * @returns {void}
     */
    notifyObservers(notification: INotification): void;
    /**
     * Remove a group of observers from the observer list for a given Notification name.
     *
     * @param {string} notificationName - which observer list to remove from
     * @param {any} notifyContext - removed the observers with this object as their `notifyContext`
     * @returns {void}
     */
    removeObserver(notificationName: string, notifyContext: any): void;
    /**
     *  Register an `IMediator` instance with the View.
     *
     *  Registers the `IMediator` so that it can be retrieved by name,
     *  and further interrogates the `IMediator` for its
     *  `INotification` interests.
     *
     *  If the `IMediator` returns any `INotification`
     *  names to be notified about, an `Observer` is created encapsulating
     *  the `IMediator` instance's `handleNotification` method
     *  and registering it as an `Observer` for all `INotifications` the
     *  `IMediator` is interested in.
     *
     * @param {IMediator} mediator - The `IMediator` to be registered.
     * @returns {void}
     */
    registerMediator(mediator: IMediator): void;
    /**
     * Retrieve an `IMediator` from the View.
     *
     * @param {string} mediatorName - the name of the `IMediator` instance to retrieve.
     * @returns {IMediator | null} The `IMediator` associated with the given name, or `null` if not found.
     */
    retrieveMediator(mediatorName: string): IMediator | null;
    /**
     * Check if a `IMediator` is registered or not
     *
     * @param {string} mediatorName - The name of the `IMediator` to check.
     * @returns {boolean} `true` if the `IMediator` is registered, otherwise `false`.
     */
    hasMediator(mediatorName: string): boolean;
    /**
     * Remove an `IMediator` from the View.
     *
     * @param {string} mediatorName - name of the `IMediator` instance to be removed.
     * @returns {IMediator | null} The removed `IMediator`, or `null` if not found.
     */
    removeMediator(mediatorName: string): IMediator | null;
}
