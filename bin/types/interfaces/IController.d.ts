import { ICommand } from "./ICommand";
import { INotification } from "./INotification";
/**
 * `IController` The interface definition for a PureMVC `Controller`.
 *
 * In PureMVC, an `IController` implementor
 * follows the 'Command and Controller' strategy, and
 * assumes these responsibilities:
 *
 * - Remembering which `ICommands` are intended to handle which `INotifications`.
 *
 * - Registering itself as an `IObserver` with the View for each `INotification` that it has an `ICommand` mapping for.
 *
 * - Creating a new instance of the proper `ICommand` to handle a given `INotification` when notified by the `View`.
 *
 * - Calling the `ICommand`'s execute method, passing in the `INotification`.
 *
 * @interface IController
 */
export interface IController {
    /**
     * Register a particular `ICommand` class as the handler
     * for a particular INotification.
     *
     * @param {string} notificationName - the name of the `INotification`
     * @param {() => ICommand} factory - A factory that returns `ICommand`
     * @returns {void}
     */
    registerCommand(notificationName: string, factory: () => ICommand): void;
    /**
     * Execute the `ICommand` previously registered as the
     * handler for `INotifications` with the given notification name.
     *
     * @param {INotification} notification - the `INotification` to execute the associated `ICommand` for
     * @returns {void}
     */
    executeCommand(notification: INotification): void;
    /**
     * Check if a `Command` is registered for a given `Notification`
     *
     * @param {string} notificationName - The name of the notification to check.
     * @returns {boolean} `true` if a command is registered for the notification name, `false` otherwise.
     */
    hasCommand(notificationName: string): boolean;
    /**
     * Remove a previously registered `ICommand` to `INotification` mapping.
     *
     * @param {string} notificationName - the name of the INotification to remove the ICommand mapping for
     * @returns {void}
     */
    removeCommand(notificationName: string): void;
}
