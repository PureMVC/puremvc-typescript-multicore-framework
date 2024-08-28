import { INotifier } from "./INotifier";
import { INotification } from "./INotification";
/**
 * `IMediator` The interface definition for a PureMVC `Mediator`.
 *
 * In PureMVC, `IMediator` implementors assume these responsibilities:
 *
 * - Implement a common method which returns a list of all `INotifications` the `IMediator` has interest in.
 *
 * - Implement a notification callback method.
 *
 * - Implement methods that are called when the `IMediator` is registered or removed from the View.
 *
 * Additionally, `IMediators` typically:
 *
 * - Act as an intermediary between one or more view components such as text boxes or list controls, maintaining references and coordinating their behavior.
 *
 * - In Flash-based apps, this is often the place where event listeners are added to view components, and their handlers implemented.
 *
 * - Respond to and generate `INotifications`, interacting with of the rest of the PureMVC app.
 *
 * When an `IMediator` is registered with the `IView`,
 * the `IView` will call the `IMediator`'s
 * `listNotificationInterests` method. The `IMediator` will
 * return an Array of `INotification` names which
 * it wishes to be notified about.
 *
 * The `IView` will then create an `Observer` object
 * encapsulating that `IMediator`'s (`handleNotification`) method
 * and register it as an `Observer` for each `INotification` name returned by
 * `listNotificationInterests`.
 *
 * @interface IMediator
 * @extends {INotifier}
 */
export interface IMediator extends INotifier {
    /**
     * The name of the mediator.
     *
     * @type {string}
     */
    readonly name: string;
    /**
     * The view component associated with the mediator.
     *
     * @type {any}
     */
    viewComponent: any;
    /**
     * Called by the View when the `Mediator` is registered
     *
     * @returns {void}
     */
    onRegister(): void;
    /**
     * Called by the View when the `Mediator` is removed
     *
     * @returns {void}
     */
    onRemove(): void;
    /**
     * List `INotification` interests.
     *
     * @returns {string[]} an Array of the `INotification` names this `IMediator` has an interest in.
     */
    listNotificationInterests(): string[];
    /**
     * Handle an `INotification`.
     *
     * @param {INotification} notification - the `INotification` to be handled
     * @returns {void}
     */
    handleNotification(notification: INotification): void;
}
