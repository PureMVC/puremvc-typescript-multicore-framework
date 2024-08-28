import { INotifier } from "./INotifier";
/**
 * `IProxy` The interface definition for a PureMVC `Proxy`.
 *
 * In PureMVC, `IProxy` implementors assume these responsibilities:
 *
 * - Implement a common method which returns the name of the Proxy.
 *
 * - Provide methods for setting and getting the data object.
 *
 * Additionally, `IProxy`ies typically:
 *
 * - Maintain references to one or more pieces of model data.
 *
 * - Provide methods for manipulating that data.
 *
 * - Generate `INotifications` when their model data changes.
 *
 * - Expose their name as a public static const called `NAME`, if they are not instantiated multiple times.
 *
 * - Encapsulate interaction with local or remote services used to fetch and persist model data.
 *
 * @interface IProxy
 * @extends INotifier
 */
export interface IProxy extends INotifier {
    /**
     * The name of the proxy.
     *
     * @type {string}
     */
    readonly name: string;
    /**
     * The data associated with the proxy.
     *
     * @type {any}
     */
    data?: any;
    /**
     * Called by the Model when the Proxy is registered
     *
     * @returns {void}
     */
    onRegister(): void;
    /**
     * Called by the Model when the Proxy is removed
     *
     * @returns {void}
     */
    onRemove(): void;
}
