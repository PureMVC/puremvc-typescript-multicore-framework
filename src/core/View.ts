//
//  View.ts
//  PureMVC TypeScript Multicore
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD-3-Clause License
//

import {IView} from "../interfaces/IView";
import {IMediator} from "../interfaces/IMediator";
import {IObserver} from "../interfaces/IObserver";
import {Observer} from "../patterns/observer/Observer";
import {INotification} from "../interfaces/INotification";

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
export class View implements IView {

    /** Message Constants
     * @type {string} */
    protected static MULTITON_MSG: string = "View instance for this Multiton key already constructed!";

    /** Multiton Instances
     * @type {{ [key: string]: IView }} */
    protected static instanceMap: { [key: string]: IView } = {};

    /** The Multiton Key for this Core
     * @type {string} */
    protected multitonKey: string;

    /** Mapping of Mediator names to Mediator instances
     * @type {{ [key: string]: IMediator }} */
    protected mediatorMap: { [key: string]: IMediator };

    /** Mapping of Notification names to Observer lists
     * @type {{ [key: string]: IObserver[] }} */
    protected observerMap: { [key: string]: IObserver[] };

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
    constructor(key: string) {
        if (View.instanceMap[key] != null) throw Error(View.MULTITON_MSG);
        this.multitonKey = key;
        View.instanceMap[key] = this;
        this.mediatorMap = {};
        this.observerMap = {};
        this.initializeView();
    }

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
    private initializeView(): void {

    }

    /**
     * View Multiton factory method.
     *
     * @param {string} key - The key used to identify the view instance.
     * @param {(key: string) => IView} factory - A factory function that creates a new instance of the view if one does not already exist for the specified key.
     * @returns {IView} The view instance associated with the given key.
     */
    public static getInstance(key: string, factory: (key: string) => IView): IView {
        if (View.instanceMap[key] == null)
            View.instanceMap[key] = factory(key);
        return View.instanceMap[key];
    }

    /**
     * Register an `Observer` to be notified
     * of `Notifications` with a given name.
     *
     * @param {string} notificationName - The name of the notification to which the observer should be registered.
     * @param {IObserver} observer - The observer instance to be registered.
     * @returns {void}
     */
    public registerObserver(notificationName: string, observer: IObserver): void {
        if (this.observerMap[notificationName] != null) {
            this.observerMap[notificationName].push(observer);
        } else {
            this.observerMap[notificationName] = [observer];
        }
    }

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
    public notifyObservers(notification: INotification): void {
        if (this.observerMap[notification.name] == null) return;

        // Get a reference to the observer list for this notification name
        // Copy observers from reference array to a working array,
        // since the reference array may change during the notification loop
        const observers: IObserver[] = this.observerMap[notification.name].slice();

        // Notify Observers from the working array
        for (let i: number = 0; i < observers.length; i++) {
            observers[i].notifyObserver(notification);
        }
    }

    /**
     * Remove the observer for a given notifyContext from an observer list for a given Notification name.
     *
     * @param {string} notificationName - The name of the notification for which the observer should be removed.
     * @param {any} notifyContext - The context of the observer to be removed.
     * @returns {void}
     */
    public removeObserver(notificationName: string, notifyContext: any): void {
        // the observer list for the notification under inspection
        const observers: IObserver[] = this.observerMap[notificationName];

        // find the observer for the notifyContext
        for (let i: number = 0; i < observers.length; i++) {
            if (observers[i].compareNotifyContext(notifyContext)) {
                // there can only be one Observer for a given notifyContext
                // in any given Observer list, so remove it and break
                observers.splice(i, 1);
                break;
            }
        }

        // Also, when a Notification's Observer list length falls to
        // zero, delete the notification key from the observer map
        if (observers.length == 0) {
            delete this.observerMap[notificationName];
        }
    }

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
    public registerMediator(mediator: IMediator): void {
        // do not allow re-registration (you must to removeMediator fist)
        if (this.mediatorMap[mediator.name] != null) return;

        mediator.initializeNotifier(this.multitonKey);

        // Register the Mediator for retrieval by name
        this.mediatorMap[mediator.name] = mediator;

        // Get Notification interests, if any.
        const interests: string[] = mediator.listNotificationInterests();

        // Register Mediator as an observer for each notification of interests
        if (interests.length > 0) {
            // Create Observer referencing this mediator's handleNotification method
            const observer: IObserver = new Observer(mediator.handleNotification, mediator);

            // Register Mediator as Observer for its list of Notification interests
            for (let i: number = 0; i < interests.length; i++) {
                this.registerObserver(interests[i], observer);
            }
        }

        // alert the mediator that it has been registered
        mediator.onRegister();
    }

    /**
     * Retrieve a `Mediator` from the `View`.
     *
     * @param {string} mediatorName - The name of the mediator to retrieve.
     * @returns {IMediator | null} The mediator instance associated with the given name, or `null` if no such mediator exists.
     */
    public retrieveMediator(mediatorName: string): IMediator | null {
        return this.mediatorMap[mediatorName] || null;
    }

    /**
     * Check if a Mediator is registered or not
     *
     * @param {string} mediatorName - The name of the mediator to check.
     * @returns {boolean} `true` if a mediator with the specified name is registered; otherwise, `false`.
     */
    public hasMediator(mediatorName: string): boolean {
        return this.mediatorMap[mediatorName] != null;
    }

    /**
     * Remove a `Mediator` from the `View`.
     *
     * @param {string} mediatorName - The name of the mediator to be removed.
     * @returns {IMediator | null} The removed mediator instance, or `null` if no mediator with the given name was found.
     */
    public removeMediator(mediatorName: string): IMediator | null {
        // Retrieve the named mediator
        const mediator: IMediator = this.mediatorMap[mediatorName];
        if (mediator == null) return null;

        // for every notification this mediator is interested in...
        const interests: string[] = mediator.listNotificationInterests();
        for (let i: number = 0; i < interests.length; i++) {
            // remove the observer linking the mediator
            // to the notification interest
            this.removeObserver(interests[i], mediator);
        }

        // remove the mediator from the map
        delete this.mediatorMap[mediatorName];

        // alert the mediator that it has been removed
        mediator.onRemove();

        return mediator;
    }

    /**
     * Remove an IView instance
     *
     * @param {string} key - multitonKey of IView instance to remove
     * @returns {void}
     */
    public static removeView(key: string): void {
        delete View.instanceMap[key];
    }

}
