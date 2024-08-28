/**
 * `INotification` The interface definition for a PureMVC `Notification`.
 *
 * PureMVC does not rely upon underlying event models such
 * as the one provided with Flash, and ActionScript 3 does
 * not have an inherent event model.
 *
 * The `Observer` Pattern as implemented within PureMVC exists
 * to support event-driven communication between the
 * application and the actors of the MVC triad.
 *
 * `Notifications` are not meant to be a replacement for Events
 * in Flex/Flash/AIR. Generally, `IMediator` implementors
 * place event listeners on their view components, which they
 * then handle in the usual way. This may lead to the broadcast of `Notifications` to
 * trigger `ICommands` or to communicate with other `IMediators`. `IProxy` and `ICommand`
 * instances communicate with each other and `IMediators`
 * by broadcasting `INotifications`.
 *
 * A key difference between Flash Events and PureMVC
 * `Notifications` is that Events follow the
 * 'Chain of Responsibility' pattern, 'bubbling' up the display hierarchy
 * until some parent component handles the Event, while
 * PureMVC `Notifications` follow a 'Publish/Subscribe'
 * pattern. PureMVC classes need not be related to each other in a
 * parent/child relationship in order to communicate with one another
 * using `Notifications`.
 *
 * @interface INotification
 */
export interface INotification {
    /**
     * The name of the notification.
     *
     * @type {string}
     */
    readonly name: string;
    /**
     * The body of the notification.
     *
     * @type {any}
     */
    body?: any;
    /**
     * The type of the notification.
     *
     * @type {string}
     */
    type?: string;
    /**
     * Get the string representation of the `INotification` instance
     *
     * @returns {string} A string representation of the notification.
     */
    toString(): string;
}
