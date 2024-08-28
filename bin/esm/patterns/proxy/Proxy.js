//
//  Proxy.ts
//  PureMVC TypeScript Multicore
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD-3-Clause License
//
import { Notifier } from "../observer/Notifier";
/**
 * A base `Proxy` implementation.
 *
 * In PureMVC, `Proxy` classes are used to manage parts of the
 * application's data model.
 *
 * A `Proxy` might simply manage a reference to a local data object,
 * in which case interacting with it might involve setting and
 * getting of its data in synchronous fashion.
 *
 * `Proxy` classes are also used to encapsulate the application's
 * interaction with remote services to save or retrieve data, in which case,
 * we adopt an asynchronous idiom; setting data (or calling a method) on the
 * `Proxy` and listening for a `Notification` to be sent
 * when the `Proxy` has retrieved the data from the service.
 *
 * @see {@link Model}
 *
 * @class Proxy
 * @extends Notifier
 */
export class Proxy extends Notifier {
    /**
     * Constructor
     *
     * @param {string} [name] - The name of the proxy. Defaults to `Proxy.NAME` if not provided.
     * @param {any} [data] - The data associated with the proxy. Can be `null`.
     */
    constructor(name, data) {
        super();
        this._name = name || Proxy.NAME;
        this._data = data;
    }
    /**
     * Called by the Model when the Proxy is registered
     *
     * @returns {void}
     */
    onRegister() {
    }
    /**
     * Called by the Model when the Proxy is removed
     *
     * @returns {void}
     */
    onRemove() {
    }
    /**
     * Get the proxy name
     *
     * @returns {string} The name of the proxy.
     */
    get name() {
        return this._name;
    }
    /**
     * Get the data object
     *
     * @returns {any} The current data or `undefined` if no data is set.
     */
    get data() {
        return this._data;
    }
    /**
     * Set the data object
     *
     * @param {any} value - The data to set. Can be `null`.
     */
    set data(value) {
        this._data = value;
    }
}
/**
 * The default name for the Proxy.
 *
 * @type {string}
 */
Proxy.NAME = "Proxy";
