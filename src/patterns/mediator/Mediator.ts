//
//  Mediator.ts
//  PureMVC TypeScript Multicore
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD-3-Clause License
//

import {IMediator} from "../../interfaces/IMediator";
import {INotification} from "../../interfaces/INotification";
import {Notifier} from "../observer/Notifier";

/**
 * A base `Mediator` implementation.
 *
 * @see {@link View}
 *
 * @class Mediator
 * @extends Notifier
 */
export class Mediator extends Notifier implements IMediator {

    /** The default name for the mediator.
     * @type {string} */
    public static NAME: string = "Mediator";

    /** the mediator name
    @type {string} */
    protected readonly _name: string;

    /** The view component
     * @type {Object} */
    protected _viewComponent?: any;

    /**
     * Constructor.
     *
     * @param {string} [name] - Optional name for the mediator. Defaults to `Mediator.NAME`.
     * @param {any} [viewComponent] - Optional view component associated with the mediator.
     */
    public constructor(name?: string, viewComponent?: any) {
        super();
        this._name = name || Mediator.NAME;
        this._viewComponent = viewComponent;
    }

    /**
     * Called by the View when the Mediator is registered     *
     *
     * @returns {void}
     */
    public onRegister(): void {

    }

    /**
     * Called by the View when the Mediator is removed     *
     *
     * @returns {void}
     */
    public onRemove(): void {

    }

    /**
     * List the `Notification` names this
     * `Mediator` is interested in being notified of.
     *
     * @returns {string[]} An array of notification names.
     */
    public listNotificationInterests(): string[] {
        return [];
    }

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
    public handleNotification(notification: INotification): void {

    }

    /**
     * the mediator name
     *
     * @returns {string} The name of the mediator.
     */
    public get name(): string {
        return this._name;
    }

    /**
     * Get the `Mediator`'s view component.
     *
     * Additionally, an implicit getter will usually
     * be defined in the subclass that casts the view
     * object to a type, like this:
     *
     * @returns {any} The view component.
     */
    public get viewComponent(): any {
        return this._viewComponent;
    }

    /**
     * Set the `Mediator`'s view component.
     *
     * @param {any} value - The new view component.
     */
    public set viewComponent(value: any) {
        this._viewComponent = value;
    }

}
