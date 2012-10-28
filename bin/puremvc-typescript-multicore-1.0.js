var puremvc;
(function (puremvc) {
    "use strict";
    var Observer = (function () {
        function Observer(notifyMethod, notifyContext) {
            this.notify = null;
            this.context = null;
            this.setNotifyMethod(notifyMethod);
            this.setNotifyContext(notifyContext);
        }
        Observer.prototype.getNotifyMethod = function () {
            return this.notify;
        };
        Observer.prototype.setNotifyMethod = function (notifyMethod) {
            this.notify = notifyMethod;
        };
        Observer.prototype.getNotifyContext = function () {
            return this.context;
        };
        Observer.prototype.setNotifyContext = function (notifyContext) {
            this.context = notifyContext;
        };
        Observer.prototype.notifyObserver = function (notification) {
            this.getNotifyMethod().call(this.getNotifyContext(), notification);
        };
        Observer.prototype.compareNotifyContext = function (object) {
            return object === this.context;
        };
        return Observer;
    })();
    puremvc.Observer = Observer;    
})(puremvc || (puremvc = {}));

var puremvc;
(function (puremvc) {
    "use strict";
    var View = (function () {
        function View(key) {
            this.mediatorMap = null;
            this.observerMap = null;
            this.multitonKey = null;
            if(View.instanceMap[key]) {
                throw Error(View.MULTITON_MSG);
            }
            View.instanceMap[key] = this;
            this.multitonKey = key;
            this.mediatorMap = {
            };
            this.observerMap = {
            };
            this.initializeView();
        }
        View.prototype.initializeView = function () {
        };
        View.prototype.registerObserver = function (notificationName, observer) {
            var observers = this.observerMap[notificationName];
            if(observers) {
                observers.push(observer);
            } else {
                this.observerMap[notificationName] = [
                    observer
                ];
            }
        };
        View.prototype.removeObserver = function (notificationName, notifyContext) {
            var observers = this.observerMap[notificationName];
            var i = observers.length;
            while(i--) {
                var observer = observers[i];
                if(observer.compareNotifyContext(notifyContext)) {
                    observers.splice(i, 1);
                    break;
                }
            }
            if(observers.length == 0) {
                delete this.observerMap[notificationName];
            }
        };
        View.prototype.notifyObservers = function (notification) {
            var notificationName = notification.getName();
            var observersRef = this.observerMap[notificationName];
            if(observersRef) {
                var observers = observersRef.slice(0);
                var len = observers.length;
                for(var i = 0; i < len; i++) {
                    var observer = observers[i];
                    observer.notifyObserver(notification);
                }
            }
        };
        View.prototype.registerMediator = function (mediator) {
            var name = mediator.getMediatorName();
            if(this.mediatorMap[name]) {
                return;
            }
            mediator.initializeNotifier(this.multitonKey);
            this.mediatorMap[name] = mediator;
            var interests = mediator.listNotificationInterests();
            var len = interests.length;
            if(len > 0) {
                var observer = new puremvc.Observer(mediator.handleNotification, mediator);
                for(var i = 0; i < len; i++) {
                    this.registerObserver(interests[i], observer);
                }
            }
            mediator.onRegister();
        };
        View.prototype.retrieveMediator = function (mediatorName) {
            return this.mediatorMap[mediatorName] || null;
        };
        View.prototype.removeMediator = function (mediatorName) {
            var mediator = this.mediatorMap[mediatorName];
            if(!mediator) {
                return null;
            }
            var interests = mediator.listNotificationInterests();
            var i = interests.length;
            while(i--) {
                this.removeObserver(interests[i], mediator);
            }
            delete this.mediatorMap[mediatorName];
            mediator.onRemove();
            return mediator;
        };
        View.prototype.hasMediator = function (mediatorName) {
            return this.mediatorMap[mediatorName] != null;
        };
        View.instanceMap = {
        };
        View.MULTITON_MSG = "View instance for this multiton key already constructed!";
        View.getInstance = function getInstance(key) {
            if(!View.instanceMap[key]) {
                View.instanceMap[key] = new View(key);
            }
            return View.instanceMap[key];
        }
        View.removeView = function removeView(key) {
            delete View.instanceMap[key];
        }
        return View;
    })();
    puremvc.View = View;    
})(puremvc || (puremvc = {}));

var puremvc;
(function (puremvc) {
    "use strict";
    var Controller = (function () {
        function Controller(key) {
            this.view = null;
            this.commandMap = null;
            this.multitonKey = null;
            if(Controller.instanceMap[key]) {
                throw Error(Controller.MULTITON_MSG);
            }
            Controller.instanceMap[key] = this;
            this.multitonKey = key;
            this.commandMap = {
            };
            this.initializeController();
        }
        Controller.prototype.initializeController = function () {
            this.view = puremvc.View.getInstance(this.multitonKey);
        };
        Controller.prototype.executeCommand = function (notification) {
            var commandClassRef = this.commandMap[notification.getName()];
            if(commandClassRef) {
                var command = new commandClassRef();
                command.initializeNotifier(this.multitonKey);
                command.execute(notification);
            }
        };
        Controller.prototype.registerCommand = function (notificationName, commandClassRef) {
            if(!this.commandMap[notificationName]) {
                this.view.registerObserver(notificationName, new puremvc.Observer(this.executeCommand, this));
            }
            this.commandMap[notificationName] = commandClassRef;
        };
        Controller.prototype.hasCommand = function (notificationName) {
            return this.commandMap[notificationName] != null;
        };
        Controller.prototype.removeCommand = function (notificationName) {
            if(this.hasCommand(notificationName)) {
                this.view.removeObserver(notificationName, this);
                delete this.commandMap[notificationName];
            }
        };
        Controller.instanceMap = {
        };
        Controller.MULTITON_MSG = "Controller instance for this multiton key already constructed!";
        Controller.getInstance = function getInstance(key) {
            if(!Controller.instanceMap[key]) {
                Controller.instanceMap[key] = new Controller(key);
            }
            return Controller.instanceMap[key];
        }
        Controller.removeController = function removeController(key) {
            delete Controller.instanceMap[key];
        }
        return Controller;
    })();
    puremvc.Controller = Controller;    
})(puremvc || (puremvc = {}));

var puremvc;
(function (puremvc) {
    "use strict";
    var Model = (function () {
        function Model(key) {
            this.proxyMap = null;
            this.multitonKey = null;
            if(Model.instanceMap[key]) {
                throw Error(Model.MULTITON_MSG);
            }
            Model.instanceMap[key] = this;
            this.multitonKey = key;
            this.proxyMap = {
            };
            this.initializeModel();
        }
        Model.prototype.initializeModel = function () {
        };
        Model.prototype.registerProxy = function (proxy) {
            proxy.initializeNotifier(this.multitonKey);
            this.proxyMap[proxy.getProxyName()] = proxy;
            proxy.onRegister();
        };
        Model.prototype.removeProxy = function (proxyName) {
            var proxy = this.proxyMap[proxyName];
            if(proxy) {
                delete this.proxyMap[proxyName];
                proxy.onRemove();
            }
            return proxy;
        };
        Model.prototype.retrieveProxy = function (proxyName) {
            return this.proxyMap[proxyName] || null;
        };
        Model.prototype.hasProxy = function (proxyName) {
            return this.proxyMap[proxyName] != null;
        };
        Model.MULTITON_MSG = "Model instance for this multiton key already constructed!";
        Model.instanceMap = {
        };
        Model.getInstance = function getInstance(key) {
            if(!Model.instanceMap[key]) {
                Model.instanceMap[key] = new Model(key);
            }
            return Model.instanceMap[key];
        }
        Model.removeModel = function removeModel(key) {
            delete Model.instanceMap[key];
        }
        return Model;
    })();
    puremvc.Model = Model;    
})(puremvc || (puremvc = {}));

var puremvc;
(function (puremvc) {
    "use strict";
    var Notification = (function () {
        function Notification(name, body, type) {
            if (typeof body === "undefined") { body = null; }
            if (typeof type === "undefined") { type = null; }
            this.name = null;
            this.body = null;
            this.type = null;
            this.name = name;
            this.body = body;
            this.type = type;
        }
        Notification.prototype.getName = function () {
            return this.name;
        };
        Notification.prototype.setBody = function (body) {
            this.body = body;
        };
        Notification.prototype.getBody = function () {
            return this.body;
        };
        Notification.prototype.setType = function (type) {
            this.type = type;
        };
        Notification.prototype.getType = function () {
            return this.type;
        };
        Notification.prototype.toString = function () {
            var msg = "Notification Name: " + this.getName();
            msg += "\nBody:" + ((this.getBody() == null) ? "null" : this.getBody().toString());
            msg += "\nType:" + ((this.getType() == null) ? "null" : this.getType());
            return msg;
        };
        return Notification;
    })();
    puremvc.Notification = Notification;    
})(puremvc || (puremvc = {}));

var puremvc;
(function (puremvc) {
    "use strict";
    var Facade = (function () {
        function Facade(key) {
            this.model = null;
            this.view = null;
            this.controller = null;
            this.multitonKey = null;
            if(Facade.instanceMap[key]) {
                throw Error(Facade.MULTITON_MSG);
            }
            this.initializeNotifier(key);
            Facade.instanceMap[key] = this;
            this.initializeFacade();
        }
        Facade.prototype.initializeFacade = function () {
            this.initializeModel();
            this.initializeController();
            this.initializeView();
        };
        Facade.prototype.initializeModel = function () {
            if(!this.model) {
                this.model = puremvc.Model.getInstance(this.multitonKey);
            }
        };
        Facade.prototype.initializeController = function () {
            if(!this.controller) {
                this.controller = puremvc.Controller.getInstance(this.multitonKey);
            }
        };
        Facade.prototype.initializeView = function () {
            if(!this.view) {
                this.view = puremvc.View.getInstance(this.multitonKey);
            }
        };
        Facade.prototype.registerCommand = function (notificationName, commandClassRef) {
            this.controller.registerCommand(notificationName, commandClassRef);
        };
        Facade.prototype.removeCommand = function (notificationName) {
            this.controller.removeCommand(notificationName);
        };
        Facade.prototype.hasCommand = function (notificationName) {
            return this.controller.hasCommand(notificationName);
        };
        Facade.prototype.registerProxy = function (proxy) {
            this.model.registerProxy(proxy);
        };
        Facade.prototype.retrieveProxy = function (proxyName) {
            return this.model.retrieveProxy(proxyName);
        };
        Facade.prototype.removeProxy = function (proxyName) {
            var proxy;
            if(this.model) {
                proxy = this.model.removeProxy(proxyName);
            }
            return proxy;
        };
        Facade.prototype.hasProxy = function (proxyName) {
            return this.model.hasProxy(proxyName);
        };
        Facade.prototype.registerMediator = function (mediator) {
            if(this.view) {
                this.view.registerMediator(mediator);
            }
        };
        Facade.prototype.retrieveMediator = function (mediatorName) {
            return this.view.retrieveMediator(mediatorName);
        };
        Facade.prototype.removeMediator = function (mediatorName) {
            var mediator;
            if(this.view) {
                mediator = this.view.removeMediator(mediatorName);
            }
            return mediator;
        };
        Facade.prototype.hasMediator = function (mediatorName) {
            return this.view.hasMediator(mediatorName);
        };
        Facade.prototype.notifyObservers = function (notification) {
            if(this.view) {
                this.view.notifyObservers(notification);
            }
        };
        Facade.prototype.sendNotification = function (name, body, type) {
            if (typeof body === "undefined") { body = null; }
            if (typeof type === "undefined") { type = null; }
            this.notifyObservers(new puremvc.Notification(name, body, type));
        };
        Facade.prototype.initializeNotifier = function (key) {
            this.multitonKey = key;
        };
        Facade.MULTITON_MSG = "Facade instance for this multiton key already constructed!";
        Facade.instanceMap = {
        };
        Facade.getInstance = function getInstance(key) {
            if(!Facade.instanceMap[key]) {
                Facade.instanceMap[key] = new Facade(key);
            }
            return Facade.instanceMap[key];
        }
        Facade.hasCore = function hasCore(key) {
            return Facade.instanceMap[key] ? true : false;
        }
        Facade.removeCore = function removeCore(key) {
            if(!Facade.instanceMap[key]) {
                return;
            }
            puremvc.Model.removeModel(key);
            puremvc.View.removeView(key);
            puremvc.Controller.removeController(key);
            delete Facade.instanceMap[key];
        }
        return Facade;
    })();
    puremvc.Facade = Facade;    
})(puremvc || (puremvc = {}));

var puremvc;
(function (puremvc) {
    "use strict";
    var Notifier = (function () {
        function Notifier() {
            this.multitonKey = null;
        }
        Notifier.prototype.initializeNotifier = function (key) {
            this.multitonKey = key;
        };
        Notifier.prototype.sendNotification = function (name, body, type) {
            if (typeof body === "undefined") { body = null; }
            if (typeof type === "undefined") { type = null; }
            if(this.facade()) {
                this.facade().sendNotification(name, body, type);
            }
        };
        Notifier.prototype.facade = function () {
            if(this.multitonKey === null) {
                throw Error(Notifier.MULTITON_MSG);
            }
            return puremvc.Facade.getInstance(this.multitonKey);
        };
        Notifier.MULTITON_MSG = "multitonKey for this Notifier not yet initialized!";
        return Notifier;
    })();
    puremvc.Notifier = Notifier;    
})(puremvc || (puremvc = {}));

var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
}
var puremvc;
(function (puremvc) {
    "use strict";
    var MacroCommand = (function (_super) {
        __extends(MacroCommand, _super);
        function MacroCommand() {
                _super.call(this);
            this.subCommands = null;
            this.subCommands = new Array();
            this.initializeMacroCommand();
        }
        MacroCommand.prototype.initializeMacroCommand = function () {
        };
        MacroCommand.prototype.addSubCommand = function (commandClassRef) {
            this.subCommands.push(commandClassRef);
        };
        MacroCommand.prototype.execute = function (notification) {
            var subCommands = this.subCommands.slice(0);
            var len = this.subCommands.length;
            for(var i = 0; i < len; i++) {
                var commandClassRef = subCommands[i];
                var commandInstance = new commandClassRef();
                commandInstance.execute(notification);
            }
            this.subCommands.splice(0);
        };
        return MacroCommand;
    })(puremvc.Notifier);
    puremvc.MacroCommand = MacroCommand;    
})(puremvc || (puremvc = {}));

var puremvc;
(function (puremvc) {
    "use strict";
    var SimpleCommand = (function (_super) {
        __extends(SimpleCommand, _super);
        function SimpleCommand() {
            _super.apply(this, arguments);

        }
        SimpleCommand.prototype.execute = function (notification) {
        };
        return SimpleCommand;
    })(puremvc.Notifier);
    puremvc.SimpleCommand = SimpleCommand;    
})(puremvc || (puremvc = {}));

var puremvc;
(function (puremvc) {
    "use strict";
    var Mediator = (function (_super) {
        __extends(Mediator, _super);
        function Mediator(mediatorName, viewComponent) {
            if (typeof mediatorName === "undefined") { mediatorName = null; }
            if (typeof viewComponent === "undefined") { viewComponent = null; }
                _super.call(this);
            this.mediatorName = null;
            this.viewComponent = null;
            this.mediatorName = (mediatorName != null) ? mediatorName : Mediator.NAME;
            this.viewComponent = viewComponent;
        }
        Mediator.prototype.getMediatorName = function () {
            return this.mediatorName;
        };
        Mediator.prototype.getViewComponent = function () {
            return this.viewComponent;
        };
        Mediator.prototype.setViewComponent = function (viewComponent) {
            this.viewComponent = viewComponent;
        };
        Mediator.prototype.listNotificationInterests = function () {
            return new Array();
        };
        Mediator.prototype.handleNotification = function (notification) {
        };
        Mediator.prototype.onRegister = function () {
        };
        Mediator.prototype.onRemove = function () {
        };
        Mediator.NAME = 'Mediator';
        return Mediator;
    })(puremvc.Notifier);
    puremvc.Mediator = Mediator;    
})(puremvc || (puremvc = {}));

var puremvc;
(function (puremvc) {
    "use strict";
    var Proxy = (function (_super) {
        __extends(Proxy, _super);
        function Proxy(proxyName, data) {
            if (typeof proxyName === "undefined") { proxyName = null; }
            if (typeof data === "undefined") { data = null; }
                _super.call(this);
            this.proxyName = null;
            this.data = null;
            this.proxyName = (proxyName != null) ? proxyName : Proxy.NAME;
            if(data != null) {
                this.setData(data);
            }
        }
        Proxy.prototype.getProxyName = function () {
            return this.proxyName;
        };
        Proxy.prototype.setData = function (data) {
            this.data = data;
        };
        Proxy.prototype.getData = function () {
            return this.data;
        };
        Proxy.prototype.onRegister = function () {
        };
        Proxy.prototype.onRemove = function () {
        };
        Proxy.NAME = "Proxy";
        return Proxy;
    })(puremvc.Notifier);
    puremvc.Proxy = Proxy;    
})(puremvc || (puremvc = {}));

