import { INotification } from "./INotification";
/**
 * `IObserver` The interface definition for a PureMVC `Observer`.
 *
 * In PureMVC, `IObserver` implementors assume these responsibilities:
 *
 * - Encapsulate the notification (callback) method of the interested object.
 *
 * - Encapsulate the notification context (self) of the interested object.
 *
 * - Provide methods for setting the interested object notification method and context.
 *
 * - Provide a method for notifying the interested object.
 *
 * PureMVC does not rely upon underlying event
 * models such as the one provided with Flash,
 * and ActionScript 3 does not have an inherent
 * event model.
 *
 * The `Observer` Pattern as implemented within
 * PureMVC exists to support event driven communication
 * between the application and the actors of the
 * MVC triad.
 *
 * An `Observer` is an object that encapsulates information
 * about an interested object with a notification method that
 * should be called when an `INotification` is broadcast.
 * The Observer then acts as a proxy for notifying the interested object.
 *
 * Observers can receive Notifications by having their
 * `notifyObserver` method invoked, passing
 * in an object implementing the `INotification` interface, such
 * as a subclass of `Notification`.
 *
 * @interface IObserver
 */
export interface IObserver {
    /**
     * The method to be called when a notification is received.
     *
     * @type {((notification: INotification) => void) | null}
     */
    notifyMethod?: ((notification: INotification) => void) | null;
    /**
     * The context in which the notification method should be called.
     *
     * @type {any | null}
     */
    notifyContext?: any | null;
    /**
     * Notify the interested object.
     *
     * @param {INotification} notification - the `INotification` to pass to the interested object's notification method
     * @returns {void}
     */
    notifyObserver(notification: INotification): void;
    /**
     * Compare the given object to the notification context object.
     *
     * @param {any} object - The object to compare with the `notifyContext`.
     * @returns {boolean} `true` if the object is the same as the `notifyContext`, otherwise `false`.
     */
    compareNotifyContext(object: any): boolean;
}
