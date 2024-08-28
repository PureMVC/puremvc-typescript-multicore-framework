import { ICommand } from "../../interfaces/ICommand";
import { INotification } from "../../interfaces/INotification";
import { Notifier } from "../observer/Notifier";
/**
 * A base `Command` implementation.
 *
 * Your subclass should override the `execute`
 * method where your business logic will handle the `Notification`.
 *
 * @see {@link Controller}
 * @see {@link Notification}
 * @see {@link MacroCommand}
 *
 * @class SimpleCommand
 * @extends Notifier
 */
export declare class SimpleCommand extends Notifier implements ICommand {
    /**
     * Fulfill the use-case initiated by the given `Notification`.
     *
     * In the Command Pattern, an application use-case typically
     * begins with some user action, which results in a `Notification` being broadcast, which
     * is handled by business logic in the `execute` method of an
     * `Command`.
     *
     * @param {INotification} notification - The notification containing the data or command details to be processed.
     * @returns {void}
     */
    execute(notification: INotification): void;
}
