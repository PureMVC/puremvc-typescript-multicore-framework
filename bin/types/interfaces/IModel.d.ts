import { IProxy } from "./IProxy";
/**
 * `IModel` The interface definition for a PureMVC `Model`.
 *
 * In PureMVC, `IModel` implementors provide
 * access to `IProxy` objects by named lookup.
 *
 * An `IModel` assumes these responsibilities:
 *
 * - Maintain a cache of `IProxy` instances
 *
 * - Provide methods for registering, retrieving, and removing `IProxy` instances
 *
 * @interface IModel
 */
export interface IModel {
    /**
     * Register an `IProxy` instance with the `Model`.
     *
     * @param {IProxy} proxy - an object reference to be held by the `Model`.
     * @returns {void}
     */
    registerProxy(proxy: IProxy): void;
    /**
     * Retrieve an `IProxy` instance from the `Model`.
     *
     * @param {string} proxyName - The name of the proxy to retrieve.
     * @returns {IProxy | null} The `IProxy` if registered, otherwise null.
     */
    retrieveProxy(proxyName: string): IProxy | null;
    /**
     * Check if a `Proxy` is registered
     *
     * @param {string} proxyName - The name of the proxy to check.
     * @returns {boolean} True if the `IProxy` is registered, otherwise false.
     */
    hasProxy(proxyName: string): boolean;
    /**
     * Remove an `IProxy` instance from the `Model`.
     *
     * @param {string} proxyName - The name of the proxy to remove.
     * @returns {IProxy | null} The removed `IProxy` if found, otherwise null.
     */
    removeProxy(proxyName: string): IProxy | null;
}
