import { IMediator } from "../../interfaces/IMediator";
import { INotification } from "../../interfaces/INotification";
import { Notifier } from "../observer/Notifier";
/**
 * A base `Mediator` implementation.
 *
 * @see {@link View}
 *
 * @class Mediator
 * @extends Notifier
 */
export declare class Mediator extends Notifier implements IMediator {
    /** The default name for the mediator.
     * @type {string} */
    static NAME: string;
    /** the mediator name
    @type {string} */
    protected readonly _name: string;
    /** The view component
     * @type {any} */
    protected _viewComponent?: any;
    /**
     * Constructor.
     *
     * @param {string} [name] - Optional name for the mediator. Defaults to `Mediator.NAME`.
     * @param {any} [viewComponent] - Optional view component associated with the mediator.
     */
    constructor(name?: string, viewComponent?: any);
    /**
     * Called by the View when the Mediator is registered
     *
     * @returns {void}
     */
    onRegister(): void;
    /**
     * Called by the View when the Mediator is removed
     *
     * @returns {void}
     */
    onRemove(): void;
    /**
     * List the `Notification` names this
     * `Mediator` is interested in being notified of.
     *
     * @returns {string[]} An array of notification names.
     */
    listNotificationInterests(): string[];
    /**
     * Handle `Notification`s.
     *
     * Typically, this will be handled in a switch statement,
     * with one 'case' entry per `Notification`
     * the `Mediator` is interested in.
     *
     * @param {INotification} notification - The notification to handle.
     * @returns {void}
     */
    handleNotification(notification: INotification): void;
    /**
     * the mediator name
     *
     * @returns {string} The name of the mediator.
     */
    get name(): string;
    /**
     * Get the `Mediator`'s view component.
     *
     * Additionally, an implicit getter will usually
     * be defined in the subclass that casts the view
     * object to a type, like this:
     *
     * @returns {any} The view component.
     */
    get viewComponent(): any;
    /**
     * Set the `Mediator`'s view component.
     *
     * @param {any} value - The new view component.
     */
    set viewComponent(value: any);
}
