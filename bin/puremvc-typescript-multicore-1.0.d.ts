module puremvc {
    export class Observer implements IObserver {
        public notify: Function;
        public context: any;
        constructor (notifyMethod: Function, notifyContext: any);
        private getNotifyMethod(): Function;
        public setNotifyMethod(notifyMethod: Function): void;
        private getNotifyContext(): any;
        public setNotifyContext(notifyContext: any): void;
        public notifyObserver(notification: INotification): void;
        public compareNotifyContext(object: any): bool;
    }
}
module puremvc {
    export class Controller implements IController {
        public view: IView;
        public commandMap: Object;
        constructor ();
        public initializeController(): void;
        public executeCommand(notification: INotification): void;
        public registerCommand(notificationName: string, commandClassRef: Function): void;
        public hasCommand(notificationName: string): bool;
        public removeCommand(notificationName: string): void;
        static instance: IController;
        static SINGLETON_MSG: string;
        static getInstance(): IController;
    }
}
module puremvc {
    export class Model implements IModel {
        public proxyMap: Object;
        constructor ();
        public initializeModel(): void;
        public registerProxy(proxy: IProxy): void;
        public removeProxy(proxyName: string): IProxy;
        public retrieveProxy(proxyName: string): IProxy;
        public hasProxy(proxyName: string): bool;
        static SINGLETON_MSG: string;
        static instance: IModel;
        static getInstance(): IModel;
    }
}
module puremvc {
    export class View implements IView {
        public mediatorMap: Object;
        public observerMap: Object;
        constructor ();
        public initializeView(): void;
        public registerObserver(notificationName: string, observer: IObserver): void;
        public removeObserver(notificationName: string, notifyContext: any): void;
        public notifyObservers(notification: INotification): void;
        public registerMediator(mediator: IMediator): void;
        public retrieveMediator(mediatorName: string): IMediator;
        public removeMediator(mediatorName: string): IMediator;
        public hasMediator(mediatorName: string): bool;
        static SINGLETON_MSG: string;
        static instance: IView;
        static getInstance(): IView;
    }
}
module puremvc {
    export class Notification implements INotification {
        public name: string;
        public body: any;
        public type: string;
        constructor (name: string, body?: any, type?: string);
        public getName(): string;
        public setBody(body: any): void;
        public getBody(): any;
        public setType(type: string): void;
        public getType(): string;
        public toString(): string;
    }
}
module puremvc {
    export class Facade implements IFacade {
        public model: IModel;
        public view: IView;
        public controller: IController;
        constructor ();
        public initializeFacade(): void;
        public initializeModel(): void;
        public initializeController(): void;
        public initializeView(): void;
        public registerCommand(notificationName: string, commandClassRef: Function): void;
        public removeCommand(notificationName: string): void;
        public hasCommand(notificationName: string): bool;
        public registerProxy(proxy: IProxy): void;
        public retrieveProxy(proxyName: string): IProxy;
        public removeProxy(proxyName: string): IProxy;
        public hasProxy(proxyName: string): bool;
        public registerMediator(mediator: IMediator): void;
        public retrieveMediator(mediatorName: string): IMediator;
        public removeMediator(mediatorName: string): IMediator;
        public hasMediator(mediatorName: string): bool;
        public notifyObservers(notification: INotification): void;
        public sendNotification(name: string, body?: any, type?: string): void;
        static SINGLETON_MSG: string;
        static instance: IFacade;
        static getInstance(): IFacade;
    }
}
module puremvc {
    export class Notifier implements INotifier {
        public facade: IFacade;
        constructor ();
        public sendNotification(name: string, body?: any, type?: string): void;
    }
}
module puremvc {
    export class MacroCommand extends Notifier implements ICommand, INotifier {
        public subCommands: Function[];
        constructor ();
        public initializeMacroCommand(): void;
        public addSubCommand(commandClassRef: Function): void;
        public execute(notification: INotification): void;
    }
}
module puremvc {
    export class SimpleCommand extends Notifier implements ICommand, INotifier {
        public execute(notification: INotification): void;
    }
}
module puremvc {
    export class Mediator extends Notifier implements IMediator, INotifier {
        public mediatorName: string;
        public viewComponent: any;
        constructor (mediatorName?: string, viewComponent?: any);
        public getMediatorName(): string;
        public getViewComponent(): any;
        public setViewComponent(viewComponent: any): void;
        public listNotificationInterests(): string[];
        public handleNotification(notification: INotification): void;
        public onRegister(): void;
        public onRemove(): void;
        static NAME: string;
    }
}
module puremvc {
    export class Proxy extends Notifier implements IProxy, INotifier {
        public proxyName: string;
        public data: any;
        constructor (proxyName?: string, data?: any);
        public getProxyName(): string;
        public setData(data: any): void;
        public getData(): any;
        public onRegister(): void;
        public onRemove(): void;
        static NAME: string;
    }
}
