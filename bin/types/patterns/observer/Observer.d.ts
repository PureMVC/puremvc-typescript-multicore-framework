import { IObserver } from "../../interfaces/IObserver";
import { INotification } from "../../interfaces/INotification";
/**
 * A base `Observer` implementation.
 *
 * An `Observer` is an object that encapsulates information
 * about an interested object with a method that should
 * be called when a particular `Notification` is broadcast.
 *
 * In PureMVC, the `Observer` class assumes these responsibilities:
 *
 * - Encapsulate the notification (callback) method of the interested object.
 * - Encapsulate the notification context (this) of the interested object.
 * - Provide methods for setting the notification method and context.
 * - Provide a method for notifying the interested object.
 *
 * @class Observer
 */
export declare class Observer implements IObserver {
    private _notifyMethod?;
    private _notifyContext?;
    /**
     * Constructor.
     *
     * The notification method on the interested object should take
     * one parameter of type `Notification`
     *
     * @param {((notification: INotification) => void) | null} notify - The method to be called when a notification is received. Can be `null`.
     * @param {any | null} context - The context in which to call the `notifyMethod`. Can be `null`.
     */
    constructor(notify?: ((notification: INotification) => void) | null, context?: any | null);
    /**
     * Get the notification method.
     *
     * @returns {((notification: INotification) => void) | null} The current method or `null` if no method is set.
     */
    get notifyMethod(): ((notification: INotification) => void) | null | undefined;
    /**
     * Set the notification method.
     *
     * The notification method should take one parameter of type `Notification`.
     *
     * @param {((notification: INotification) => void) | null} value - The method to set for handling notifications. Can be `null`.
     */
    set notifyMethod(value: ((notification: INotification) => void) | null);
    /**
     * Get the notifyContext
     *
     * @returns {any | null} The current context or `null` if no context is set.
     */
    get notifyContext(): any | null;
    /**
     * Set the notification context.
     *
     * @param {any | null} value - The context to set. Can be `null`.
     */
    set notifyContext(value: any | null);
    /**
     * Notify the interested object.
     *
     * @param {INotification} notification - The notification to send to the observer.
     * @returns {void}
     */
    notifyObserver(notification: INotification): void;
    /**
     * Compare an object to the notification context.
     *
     * @param {any} object - The object to compare with the observer's context.
     * @returns {boolean} `true` if the context is the same, otherwise `false`.
     */
    compareNotifyContext(object: any): boolean;
}
