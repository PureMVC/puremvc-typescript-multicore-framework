import { ICommand } from "../../interfaces/ICommand";
import { INotification } from "../../interfaces/INotification";
import { SimpleCommand } from "./SimpleCommand";
/**
 * A base `Command` implementation that executes other `Command`s.
 *
 * A `MacroCommand` maintains a list of
 * `Command` Class references called `SubCommands`.
 *
 * When `execute` is called, the `MacroCommand`
 * instantiates and calls `execute` on each of its `SubCommands` turn.
 * Each `SubCommand` will be passed a reference to the original
 * `Notification` that was passed to the `MacroCommand`'s
 * `execute` method.
 *
 * Unlike `SimpleCommand`, your subclass
 * should not override `execute`, but instead, should
 * override the `initializeMacroCommand` method,
 * calling `addSubCommand` once for each `SubCommand`
 * to be executed.
 *
 * @see {@link Controller}
 * @see {@link Notification}
 * @see {@link SimpleCommand}
 *
 * @class MacroCommand
 * @extends Notifier
 */
export declare class MacroCommand extends SimpleCommand {
    /** An array of functions, each of which returns an instance of ICommand.
     * @type {(() => ICommand)[]} */
    private subCommands;
    /**
     * Constructor.
     *
     * You should not need to define a constructor,
     * instead, override the `initializeMacroCommand`
     * method.
     *
     * If your subclass does define a constructor, be
     * sure to call `super()`.
     *
     */
    constructor();
    /**
     * Initialize the `MacroCommand`.
     *
     * In your subclass, override this method to
     * initialize the `MacroCommand`'s `SubCommand`
     * list with `Command` class references like
     * this:
     *
     * ```ts
     * // Initialize MyMacroCommand
     * initializeMacroCommand() {
     *   this.addSubCommand(() => new app.FirstCommand());
     *   this.addSubCommand(() => new app.SecondCommand());
     *   this.addSubCommand(() => new app.ThirdCommand());
     * }
     * ```
     *
     * Note that `SubCommand`s may be any `Command` implementor,
     * `MacroCommand`s or `SimpleCommands` are both acceptable.
     */
    initializeMacroCommand(): void;
    /**
     * Add a `SubCommand`.
     *
     * The `SubCommands` will be called in First In/First Out (FIFO)
     * order.
     *
     * @param {() => ICommand} factory - A factory function that creates an instance of ICommand. This function will be used to generate the sub-command.
     * @returns {void}
     */
    protected addSubCommand(factory: () => ICommand): void;
    /**
     * Execute this `MacroCommand`'s `SubCommands`.
     *
     * The `SubCommands` will be called in First In/First Out (FIFO)
     * order.
     *
     * @param {INotification} notification - The notification containing the data or command details to be processed.
     * @returns {void}
     */
    execute(notification: INotification): void;
}
