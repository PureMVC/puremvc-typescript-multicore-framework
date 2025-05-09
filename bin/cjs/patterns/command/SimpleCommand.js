"use strict";
//
//  SimpleCommand.ts
//  PureMVC TypeScript Multicore
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD-3-Clause License
//
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleCommand = void 0;
const Notifier_1 = require("../observer/Notifier");
/**
 * A base `Command` implementation.
 *
 * Your subclass should override the `execute`
 * method where your business logic will handle the `Notification`.
 *
 * @see {@link Controller}
 * @see {@link Notification}
 * @see {@link MacroCommand}
 *
 * @class SimpleCommand
 * @extends Notifier
 */
class SimpleCommand extends Notifier_1.Notifier {
    /**
     * Fulfill the use-case initiated by the given `Notification`.
     *
     * In the Command Pattern, an application use-case typically
     * begins with some user action, which results in a `Notification` being broadcast, which
     * is handled by business logic in the `execute` method of an
     * `Command`.
     *
     * @param {INotification} notification - The notification containing the data or command details to be processed.
     * @returns {void}
     */
    execute(notification) {
    }
}
exports.SimpleCommand = SimpleCommand;
