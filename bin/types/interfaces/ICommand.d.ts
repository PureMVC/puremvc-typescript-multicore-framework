import { INotifier } from "./INotifier";
import { INotification } from "./INotification";
/**
 * The interface definition for a PureMVC Command.
 *
 * @see {@link INotification}
 *
 * @interface ICommand
 * @extends {INotifier}
 */
export interface ICommand extends INotifier {
    /**
     * Execute the `ICommand`'s logic to handle a given `INotification`.
     *
     * @param {INotification} notification - The notification carrying the data and type necessary for executing the command.
     * @returns {void}
     */
    execute(notification: INotification): void;
}
