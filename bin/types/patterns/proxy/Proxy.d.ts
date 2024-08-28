import { IProxy } from "../../interfaces/IProxy";
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
export declare class Proxy extends Notifier implements IProxy {
    /**
     * The default name for the Proxy.
     *
     * @type {string}
     */
    static NAME: string;
    /** the proxy name
     * @type {string} _name */
    protected readonly _name: string;
    /** the data object
     * @type {any} _data */
    protected _data?: any;
    /**
     * Constructor
     *
     * @param {string} [name] - The name of the proxy. Defaults to `Proxy.NAME` if not provided.
     * @param {any} [data] - The data associated with the proxy. Can be `null`.
     */
    constructor(name?: string, data?: any);
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
    /**
     * Get the proxy name
     *
     * @returns {string} The name of the proxy.
     */
    get name(): string;
    /**
     * Get the data object
     *
     * @returns {any} The current data or `undefined` if no data is set.
     */
    get data(): any;
    /**
     * Set the data object
     *
     * @param {any} value - The data to set. Can be `null`.
     */
    set data(value: any);
}
