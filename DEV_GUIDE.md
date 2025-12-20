# PureMVC TypeScript MultiCore — Developer Guide

This guide explains how the PureMVC MultiCore framework works in TypeScript and shows how to build an app using Facades, Proxies, Mediators, Commands, and Notifications. All examples are TypeScript and use the published NPM package.

- Package: `@puremvc/puremvc-typescript-multicore-framework`
- Docs: https://puremvc.org/pages/docs/TypeScript/multicore/

## Installation

```sh
npm install @puremvc/puremvc-typescript-multicore-framework
```

## Core Concepts

PureMVC implements the classic Model–View–Controller meta‑pattern. In MultiCore, each application module (a “Core”) has its own set of MVC actors, identified by a unique Multiton key.

- Model: manages application data via `Proxy` instances.
- View: manages presentation and event routing via `Mediator` instances.
- Controller: maps `Notification` names to `Command` classes.
- Facade: the single API surface that exposes Model, View, Controller for a Core. In MultiCore, Facade is a Multiton; one instance per Core key.
- Notification: the event/message traveling through the system.

Key properties of MultiCore:
- Every Core is referenced by a unique string key.
- Each `Notifier` (Proxy, Mediator, Command) is automatically associated with the correct Core when it is executed/registered; it can then call `sendNotification` to communicate within that Core.

## Public API (what you usually import)

```ts
import {
  Facade,
  Proxy,
  Mediator,
  SimpleCommand,
  MacroCommand,
  Notification,
  // Types (optional)
  type IFacade,
  type IProxy,
  type IMediator,
  type ICommand,
  type INotification,
} from '@puremvc/puremvc-typescript-multicore-framework';
```

## Multiton: Creating and Accessing a Core

Each Core is identified by a string key. You never `new Facade()` directly. Instead call `Facade.getInstance(key, factory)` and supply a factory that constructs your Facade subclass.

```ts
const CORE_KEY = 'com.example.myapp';

// Your concrete Facade (defined below)
const facade = Facade.getInstance(CORE_KEY, (key) => new AppFacade(key));

// Later, retrieve the same core anywhere:
const same = Facade.getInstance(CORE_KEY, (key) => new AppFacade(key));
```

Notes:
- The factory is only used the first time for a given key; subsequent calls return the existing instance.
- Use different keys to run multiple, isolated cores simultaneously.

## Subclassing Facade

You typically subclass `Facade` to register Proxies, Mediators, and Commands at startup.

```ts
// AppFacade.ts
import { Facade } from '@puremvc/puremvc-typescript-multicore-framework';

export class AppFacade extends Facade {
  // app-specific notification names
  public static readonly STARTUP = 'AppFacade/STARTUP';

  protected initializeModel(): void {
    super.initializeModel();
    // Register your Proxies here
    this.registerProxy(new UserProxy());
  }

  protected initializeController(): void {
    super.initializeController();
    // Map notifications to commands
    this.registerCommand(AppFacade.STARTUP, () => new StartupCommand());
  }

  protected initializeView(): void {
    super.initializeView();
    // Register Mediators here (optionally in StartupCommand)
  }
}
```

## Proxies (Model)

Extend `Proxy` to manage data. Proxies are given the Core key when they are registered with the Model, after which they can send notifications.

```ts
// UserProxy.ts
import { Proxy } from '@puremvc/puremvc-typescript-multicore-framework';

export class UserProxy extends Proxy {
  public static readonly NAME = 'UserProxy';
  public static readonly USERS_LOADED = 'UserProxy/USERS_LOADED';

  constructor() {
    super(UserProxy.NAME);
  }

  async loadUsers(): Promise<void> {
    // Simulate remote call
    const users = await Promise.resolve([
      { id: 1, name: 'Ada' },
      { id: 2, name: 'Grace' },
    ]);
    this.data = users;
    this.sendNotification(UserProxy.USERS_LOADED, users);
  }
}
```

## Mediators (View)

Extend `Mediator` to coordinate a view component and react to notifications. Mediators are given the Core key when registered with the View.

```ts
// UserListMediator.ts
import { Mediator, type INotification } from '@puremvc/puremvc-typescript-multicore-framework';
import { UserProxy } from './UserProxy';

export class UserListMediator extends Mediator {
  public static readonly NAME = 'UserListMediator';

  constructor(viewComponent: HTMLUListElement) {
    super(UserListMediator.NAME, viewComponent);
  }

  public override listNotificationInterests(): string[] {
    return [UserProxy.USERS_LOADED];
  }

  public override handleNotification(note: INotification): void {
    switch (note.name) {
      case UserProxy.USERS_LOADED:
        this.render(note.body as Array<{ id: number; name: string }>);
        break;
    }
  }

  private render(users: Array<{ id: number; name: string }>): void {
    const ul = this.viewComponent as HTMLUListElement;
    ul.innerHTML = users.map((u) => `<li>${u.name}</li>`).join('');
  }
}
```

Registering Mediators typically happens during startup (see `StartupCommand` below) or in `AppFacade.initializeView`.

## Commands (Controller)

Commands encapsulate application logic executed in response to notifications. They are given the Core key when executed by the Controller, after which they can access the Facade and send notifications.

```ts
// StartupCommand.ts
import { SimpleCommand, type INotification } from '@puremvc/puremvc-typescript-multicore-framework';
import { UserProxy } from './UserProxy';
import { UserListMediator } from './UserListMediator';

export class StartupCommand extends SimpleCommand {
  public override execute(note: INotification): void {
    // Optionally, get something from the startup body
    const root = note.body as { userListEl: HTMLUListElement } | undefined;

    // Ensure Proxy exists and kick off initial load
    const userProxy = this.facade.retrieveProxy(UserProxy.NAME) as UserProxy | null;
    if (userProxy) userProxy.loadUsers();

    // Register Mediator now that we have the view element
    if (root?.userListEl) {
      this.facade.registerMediator(new UserListMediator(root.userListEl));
    }
  }
}
```

`MacroCommand` allows sequencing multiple `SimpleCommand`s:

```ts
import { MacroCommand } from '@puremvc/puremvc-typescript-multicore-framework';

export class AppStartupMacro extends MacroCommand {
  protected override initializeMacroCommand(): void {
    this.addSubCommand(() => new PrepModelCommand());
    this.addSubCommand(() => new PrepViewCommand());
    this.addSubCommand(() => new KickoffCommand());
  }
}
```

## Wiring It Up (Startup)

Create the Facade for your Core, register your startup mapping, and send a `STARTUP` notification.

```ts
// main.ts
import { Facade } from '@puremvc/puremvc-typescript-multicore-framework';
import { AppFacade } from './AppFacade';

const CORE_KEY = 'com.example.myapp';
const facade = Facade.getInstance(CORE_KEY, (key) => new AppFacade(key));

// Somewhere you create or obtain your view root(s)
const userListEl = document.getElementById('users') as HTMLUListElement;

// Kick off the app
facade.sendNotification(AppFacade.STARTUP, { userListEl });
```

Notes:
- Don’t call `new AppFacade()` directly. Always use `Facade.getInstance(key, factory)`.
- The Notifier caveat in MultiCore: a `Notifier` (Proxy, Mediator, Command) cannot use `sendNotification` until it has been given a multitonKey. This happens automatically when:
  - a Proxy is registered with the Model,
  - a Mediator is registered with the View,
  - a Command is executed by the Controller.

## Communicating with Notifications

Notifications are identified by string names and may carry an optional `body` and `type`.

```ts
// From inside any Notifier (Proxy, Mediator, Command):
this.sendNotification('User/CREATE', { id: 3, name: 'Margaret' }, 'immediate');

// Handling in a Mediator subclass
import { Mediator, type INotification } from '@puremvc/puremvc-typescript-multicore-framework';

class ExampleMediator extends Mediator {
  listNotificationInterests(): string[] {
    return ['User/CREATE'];
  }

  handleNotification(note: INotification): void {
    if (note.name === 'User/CREATE') {
      // note.body and note.type as needed
    }
  }
}
```

Guidelines:
- Keep notification names unique and scoped (e.g., `'UserProxy/USERS_LOADED'`).
- Co-locate names with the class that owns them (e.g., `UserProxy.USERS_LOADED`).

## Multiple Cores (Modules)

Run multiple isolated Cores by using different Multiton keys. Each Core has its own Facade, Model, View, Controller, and its own set of Notifiers.

```ts
const AdminKey = 'com.example.app/admin';
const ShopKey  = 'com.example.app/shop';

const admin = Facade.getInstance(AdminKey, (k) => new AdminFacade(k));
const shop  = Facade.getInstance(ShopKey,  (k) => new ShopFacade(k));

admin.sendNotification(AdminFacade.STARTUP);
shop.sendNotification(ShopFacade.STARTUP);
```

Cross-core communication is usually achieved at a higher level (e.g., a shell module) by listening to one core and translating into another core’s notifications. For inter-module message bus patterns, see the PureMVC Pipes utility.

## Shutting Down a Core

Remove a Core and its MVC actors when you’re done with it:

```ts
import { Facade } from '@puremvc/puremvc-typescript-multicore-framework';

Facade.removeCore('com.example.myapp');
```

This removes the `Model`, `View`, `Controller`, and `Facade` instances for that key.

## Testing Tips

- Prefer deterministic `Notification` names; expose them as `public static readonly` on the owning class.
- Query Proxies via `facade.retrieveProxy(ProxyClass.NAME)`; check `proxy.data`.
- Mediators are unit-testable by directly calling `handleNotification` with a constructed `Notification`.

## Reference: Common Facade Methods

- `registerProxy(proxy)` / `retrieveProxy(name)` / `removeProxy(name)` / `hasProxy(name)`
- `registerMediator(mediator)` / `retrieveMediator(name)` / `removeMediator(name)` / `hasMediator(name)`
- `registerCommand(notificationName, factory)` / `removeCommand(notificationName)` / `hasCommand(notificationName)`
- `sendNotification(name, body?, type?)`
- `notifyObservers(notification)` (rarely used directly; prefer `sendNotification`)

## Minimal End-to-End Example

```ts
import {
  Facade,
  Proxy,
  Mediator,
  SimpleCommand,
  type INotification,
} from '@puremvc/puremvc-typescript-multicore-framework';

// 1) Proxy
class CounterProxy extends Proxy {
  static readonly NAME = 'CounterProxy';
  static readonly UPDATED = 'CounterProxy/UPDATED';

  constructor() {
    super(CounterProxy.NAME, { value: 0 });
  }

  increment() {
    this.data = { value: (this.data?.value ?? 0) + 1 };
    this.sendNotification(CounterProxy.UPDATED, this.data);
  }
}

// 2) Mediator
class CounterMediator extends Mediator {
  static readonly NAME = 'CounterMediator';
  constructor(span: HTMLSpanElement) {
    super(CounterMediator.NAME, span);
  }
  listNotificationInterests(): string[] {
    return [CounterProxy.UPDATED];
  }
  handleNotification(note: INotification): void {
    if (note.name === CounterProxy.UPDATED) {
      (this.viewComponent as HTMLSpanElement).textContent = String(note.body.value);
    }
  }
}

// 3) Command
class StartupCommand extends SimpleCommand {
  execute(note: INotification): void {
    const { span } = note.body as { span: HTMLSpanElement };

    // Register Mediator
    this.facade.registerMediator(new CounterMediator(span));

    // Use the Proxy
    const proxy = this.facade.retrieveProxy(CounterProxy.NAME) as CounterProxy | null;
    proxy?.increment();
  }
}

// 4) Facade
class AppFacade extends Facade {
  static readonly STARTUP = 'App/STARTUP';
  protected initializeModel(): void {
    super.initializeModel();
    this.registerProxy(new CounterProxy());
  }
  protected initializeController(): void {
    super.initializeController();
    this.registerCommand(AppFacade.STARTUP, () => new StartupCommand());
  }
}

// 5) Bootstrap
const KEY = 'example.counter';
const facade = Facade.getInstance(KEY, (k) => new AppFacade(k));
const span = document.getElementById('count') as HTMLSpanElement;
facade.sendNotification(AppFacade.STARTUP, { span });
```

That’s it! You now have the basic shape to build robust, modular, testable TypeScript applications with PureMVC MultiCore.
