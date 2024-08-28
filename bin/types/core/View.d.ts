import { IView } from "../interfaces/IView";
import { IMediator } from "../interfaces/IMediator";
import { IObserver } from "../interfaces/IObserver";
import { INotification } from "../interfaces/INotification";
/**
 * A Multiton `View` implementation.
 *
 * In PureMVC, the `View` class assumes these responsibilities:
 *
 * - Maintain a cache of `Mediator` instances.
 * - Provide methods for registering, retrieving, and removing `Mediators`.
 * - Notifying `Mediators` when they are registered or removed.
 * - Managing the observer lists for each `Notification` in the application.
 * - Providing a method for attaching `Observers` to a `Notification`'s observer list.
 * - Providing a method for broadcasting a `Notification`.
 * - Notifying the `Observers` of a given `Notification` when it broadcast.
 *
 * @see {@link Mediator}
 * @see {@link Observer}
 * @see {@link Notification}
 *
 * @class View
 */
export declare class View implements IView {
    /** Message Constants
     * @type {string} */
    protected static MULTITON_MSG: string;
    /** Multiton Instances
     * @type {{ [key: string]: IView }} */
    protected static instanceMap: {
        [key: string]: IView;
    };
    /** The Multiton Key for this Core
     * @type {string} */
    protected multitonKey: string;
    /** Mapping of Mediator names to Mediator instances
     * @type {{ [key: string]: IMediator }} */
    protected mediatorMap: {
        [key: string]: IMediator;
    };
    /** Mapping of Notification names to Observer lists
     * @type {{ [key: string]: IObserver[] }} */
    protected observerMap: {
        [key: string]: IObserver[];
    };
    /**
     * Constructor.
     *
     * This `View` implementation is a Multiton,
     * so you should not call the constructor
     * directly, but instead call the static Multiton
     * Factory method `View.getInstance(multitonKey)`
     *
     * @param {string} key
     *
     * @throws {Error} Error if instance for this Multiton key has already been constructed
     */
    constructor(key: string);
    /**
     * Initialize the Multiton View instance.
     *
     * Called automatically by the constructor, this
     * is your opportunity to initialize the Multiton
     * instance in your subclass without overriding the
     * constructor.
     *
     * @returns {void}
     */
    private initializeView;
    /**
     * View Multiton factory method.
     *
     * @param {string} key - The key used to identify the view instance.
     * @param {(key: string) => IView} factory - A factory function that creates a new instance of the view if one does not already exist for the specified key.
     * @returns {IView} The view instance associated with the given key.
     */
    static getInstance(key: string, factory: (key: string) => IView): IView;
    /**
     * Register an `Observer` to be notified
     * of `Notifications` with a given name.
     *
     * @param {string} notificationName - The name of the notification to which the observer should be registered.
     * @param {IObserver} observer - The observer instance to be registered.
     * @returns {void}
     */
    registerObserver(notificationName: string, observer: IObserver): void;
    /**
     * Notify the `Observers` for a particular `Notification`.
     *
     * All previously attached `Observers` for this `Notification`'s
     * list are notified and are passed a reference to the `Notification` in
     * the order in which they were registered.
     *
     * @param {INotification} notification - The notification containing the data or command details to be sent to observers.
     * @returns {void}
     */
    notifyObservers(notification: INotification): void;
    /**
     * Remove the observer for a given notifyContext from an observer list for a given Notification name.
     *
     * @param {string} notificationName - The name of the notification for which the observer should be removed.
     * @param {any} notifyContext - The context of the observer to be removed.
     * @returns {void}
     */
    removeObserver(notificationName: string, notifyContext: any): void;
    /**
     * Register a `Mediator` instance with the `View`.
     *
     * Registers the `Mediator` so that it can be retrieved by name,
     * and further interrogates the `Mediator` for its
     * `Notification` interests.
     *
     * If the `Mediator` returns any `Notification`
     * names to be notified about, an `Observer` is created encapsulating
     * the `Mediator` instance's `handleNotification` method
     * and registering it as an `Observer` for all `Notifications` the
     * `Mediator` is interested in.
     *
     * @param {IMediator} mediator - The mediator instance to be registered.
     * @returns {void}
     */
    registerMediator(mediator: IMediator): void;
    /**
     * Retrieve a `Mediator` from the `View`.
     *
     * @param {string} mediatorName - The name of the mediator to retrieve.
     * @returns {IMediator | null} The mediator instance associated with the given name, or `null` if no such mediator exists.
     */
    retrieveMediator(mediatorName: string): IMediator | null;
    /**
     * Check if a Mediator is registered or not
     *
     * @param {string} mediatorName - The name of the mediator to check.
     * @returns {boolean} `true` if a mediator with the specified name is registered; otherwise, `false`.
     */
    hasMediator(mediatorName: string): boolean;
    /**
     * Remove a `Mediator` from the `View`.
     *
     * @param {string} mediatorName - The name of the mediator to be removed.
     * @returns {IMediator | null} The removed mediator instance, or `null` if no mediator with the given name was found.
     */
    removeMediator(mediatorName: string): IMediator | null;
    /**
     * Remove an IView instance
     *
     * @param {string} key - multitonKey of IView instance to remove
     * @returns {void}
     */
    static removeView(key: string): void;
}
