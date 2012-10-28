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
    export class View implements IView {
        public mediatorMap: Object;
        public observerMap: Object;
        public multitonKey: string;
        constructor (key: string);
        public initializeView(): void;
        public registerObserver(notificationName: string, observer: IObserver): void;
        public removeObserver(notificationName: string, notifyContext: any): void;
        public notifyObservers(notification: INotification): void;
        public registerMediator(mediator: IMediator): void;
        public retrieveMediator(mediatorName: string): IMediator;
        public removeMediator(mediatorName: string): IMediator;
        public hasMediator(mediatorName: string): bool;
        static instanceMap: Object;
        static MULTITON_MSG: string;
        static getInstance(key: string): IView;
        static removeView(key: string): void;
    }
}
module puremvc {
    export class Controller implements IController {
        public view: IView;
        public commandMap: Object;
        public multitonKey: string;
        constructor (key: string);
        public initializeController(): void;
        public executeCommand(notification: INotification): void;
        public registerCommand(notificationName: string, commandClassRef: Function): void;
        public hasCommand(notificationName: string): bool;
        public removeCommand(notificationName: string): void;
        static instanceMap: Object;
        static MULTITON_MSG: string;
        static getInstance(key: string): IController;
        static removeController(key: string): void;
    }
}
module puremvc {
    export class Model implements IModel {
        public proxyMap: Object;
        public multitonKey: string;
        constructor (key: string);
        public initializeModel(): void;
        public registerProxy(proxy: IProxy): void;
        public removeProxy(proxyName: string): IProxy;
        public retrieveProxy(proxyName: string): IProxy;
        public hasProxy(proxyName: string): bool;
        static MULTITON_MSG: string;
        static instanceMap: Object;
        static getInstance(key): IModel;
        static removeModel(key): void;
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
        public multitonKey: string;
        constructor (key);
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
        public initializeNotifier(key: string): void;
        static MULTITON_MSG: string;
        static instanceMap: Object;
        static getInstance(key: string): IFacade;
        static hasCore(key: string): bool;
        static removeCore(key: string): void;
    }
}
module puremvc {
    export class Notifier implements INotifier {
        public multitonKey: string;
        public initializeNotifier(key): void;
        public sendNotification(name: string, body?: any, type?: string): void;
        public facade(): IFacade;
        static MULTITON_MSG: string;
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
