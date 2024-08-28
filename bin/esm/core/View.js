//
//  View.ts
//  PureMVC TypeScript Multicore
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD-3-Clause License
//
import { Observer } from "../patterns/observer/Observer";
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
export class View {
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
    constructor(key) {
        if (View.instanceMap[key] != null)
            throw Error(View.MULTITON_MSG);
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
    initializeView() {
    }
    /**
     * View Multiton factory method.
     *
     * @param {string} key - The key used to identify the view instance.
     * @param {(key: string) => IView} factory - A factory function that creates a new instance of the view if one does not already exist for the specified key.
     * @returns {IView} The view instance associated with the given key.
     */
    static getInstance(key, factory) {
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
    registerObserver(notificationName, observer) {
        if (this.observerMap[notificationName] != null) {
            this.observerMap[notificationName].push(observer);
        }
        else {
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
    notifyObservers(notification) {
        if (this.observerMap[notification.name] == null)
            return;
        // Get a reference to the observer list for this notification name
        // Copy observers from reference array to a working array,
        // since the reference array may change during the notification loop
        const observers = this.observerMap[notification.name].slice();
        // Notify Observers from the working array
        for (let i = 0; i < observers.length; i++) {
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
    removeObserver(notificationName, notifyContext) {
        // the observer list for the notification under inspection
        const observers = this.observerMap[notificationName];
        // find the observer for the notifyContext
        for (let i = 0; i < observers.length; i++) {
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
    registerMediator(mediator) {
        // do not allow re-registration (you must to removeMediator fist)
        if (this.mediatorMap[mediator.name] != null)
            return;
        mediator.initializeNotifier(this.multitonKey);
        // Register the Mediator for retrieval by name
        this.mediatorMap[mediator.name] = mediator;
        // Get Notification interests, if any.
        const interests = mediator.listNotificationInterests();
        // Register Mediator as an observer for each notification of interests
        if (interests.length > 0) {
            // Create Observer referencing this mediator's handleNotification method
            const observer = new Observer(mediator.handleNotification, mediator);
            // Register Mediator as Observer for its list of Notification interests
            for (let i = 0; i < interests.length; i++) {
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
    retrieveMediator(mediatorName) {
        return this.mediatorMap[mediatorName] || null;
    }
    /**
     * Check if a Mediator is registered or not
     *
     * @param {string} mediatorName - The name of the mediator to check.
     * @returns {boolean} `true` if a mediator with the specified name is registered; otherwise, `false`.
     */
    hasMediator(mediatorName) {
        return this.mediatorMap[mediatorName] != null;
    }
    /**
     * Remove a `Mediator` from the `View`.
     *
     * @param {string} mediatorName - The name of the mediator to be removed.
     * @returns {IMediator | null} The removed mediator instance, or `null` if no mediator with the given name was found.
     */
    removeMediator(mediatorName) {
        // Retrieve the named mediator
        const mediator = this.mediatorMap[mediatorName];
        if (mediator == null)
            return null;
        // for every notification this mediator is interested in...
        const interests = mediator.listNotificationInterests();
        for (let i = 0; i < interests.length; i++) {
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
    static removeView(key) {
        delete View.instanceMap[key];
    }
}
/** Message Constants
 * @type {string} */
View.MULTITON_MSG = "View instance for this Multiton key already constructed!";
/** Multiton Instances
 * @type {{ [key: string]: IView }} */
View.instanceMap = {};
