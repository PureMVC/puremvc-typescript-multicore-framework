//
//  Model.ts
//  PureMVC TypeScript Multicore
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD-3-Clause License
//

import { IModel } from "../interfaces/IModel";
import { IProxy } from "../interfaces/IProxy";

/**
 * A Multiton `Model` implementation.
 *
 * In PureMVC, the `Model` class provides
 * access to model objects (Proxies) by named lookup.
 *
 * The `Model` assumes these responsibilities:
 *
 * - Maintain a cache of `Proxy` instances.
 * - Provide methods for registering, retrieving, and removing
 * `Proxy` instances.
 *
 * Your application must register `Proxy` instances
 * with the `Model`. Typically, you use an
 * `Command` to create and register `Proxy`
 * instances once the `Facade` has initialized the Core
 * actors.
 *
 * @see {@link Proxy}
 *
 * @class Model
 */
export class Model implements IModel {
  /** Message Constants
   * @type {string} */
  protected static MULTITON_MSG: string =
    "Model instance for this Multiton key already constructed!";

  /** Multiton Instances
   * @type {{ [key: string]: IModel }} */
  protected static instanceMap: { [key: string]: IModel } = {};

  /** The Multiton Key for this Core
   * @type {string} */
  protected multitonKey: string;

  /** Mapping of proxyNames to IProxy instances
   * @type {{ [key: string]: IProxy }} */
  protected proxyMap: { [key: string]: IProxy };

  /**
   * Constructor.
   *
   * This `Model` implementation is a Multiton,
   * so you should not call the constructor
   * directly, but instead call the static Multiton
   * Factory method `Model.getInstance(multitonKey)`
   *
   * @param {string} key
   *
   * @throws {Error} Error if instance for this Multiton key instance has already been constructed
   */
  public constructor(key: string) {
    if (Model.instanceMap[key] != null) throw Error(Model.MULTITON_MSG);
    this.multitonKey = key;
    Model.instanceMap[key] = this;
    this.proxyMap = {};
    this.initializeModel();
  }

  /**
   * Initialize the `Model` instance.
   *
   * Called automatically by the constructor, this
   * is your opportunity to initialize the Multiton
   * instance in your subclass without overriding the
   * constructor.
   *
   * @returns {void}
   */
  protected initializeModel(): void {}

  /**
   * `Model` Multiton Factory method.
   *
   * @param {string} key - The key used to identify the model instance.
   * @param {(key: string) => IModel} factory - A factory function that creates a new instance of the model if one does not already exist for the specified key.
   * @returns {IModel} The model instance associated with the given key.
   */
  public static getInstance(
    key: string,
    factory: (key: string) => IModel,
  ): IModel {
    if (Model.instanceMap[key] == null) Model.instanceMap[key] = factory(key);
    return Model.instanceMap[key];
  }

  /**
   * Register a `Proxy` with the `Model`.
   *
   * @param {IProxy} proxy - The proxy instance to be registered.
   * @returns {void}
   */
  public registerProxy(proxy: IProxy): void {
    proxy.initializeNotifier(this.multitonKey);
    this.proxyMap[proxy.name] = proxy;
    proxy.onRegister();
  }

  /**
   * Retrieve a `Proxy` from the `Model`.
   *
   * @param {string} proxyName - The name of the proxy to retrieve.
   * @returns {IProxy | null} The proxy instance associated with the given name, or `null` if no such proxy exists.
   */
  public retrieveProxy(proxyName: string): IProxy | null {
    return this.proxyMap[proxyName] || null;
  }

  /**
   * Check if a Proxy is registered
   *
   * @param {string} proxyName - The name of the proxy to check.
   * @returns {boolean} `true` if a proxy with the specified name is registered; otherwise, `false`.
   */
  public hasProxy(proxyName: string): boolean {
    return this.proxyMap[proxyName] != null;
  }

  /**
   * Remove a `Proxy` from the `Model`.
   *
   * @param {string} proxyName - The name of the proxy to be removed.
   * @returns {IProxy | null} The removed proxy instance, or `null` if no proxy with the given name was found.
   */
  public removeProxy(proxyName: string): IProxy | null {
    const proxy: IProxy = this.proxyMap[proxyName];
    if (!proxy) return null;

    delete this.proxyMap[proxyName];
    proxy.onRemove();
    return proxy;
  }

  /**
   * Remove a Model instance
   *
   * @param {string} key - The key used to identify the model instance to be removed.
   * @returns {void}
   */
  public static removeModel(key: string): void {
    delete Model.instanceMap[key];
  }
}
