var puremvc;
(function (puremvc) {
    "use strict";
    var Observer = (function () {
        function Observer(notifyMethod, notifyContext) {
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
            this.getNotifyMethod().apply(this.getNotifyContext(), [
                notification
            ]);
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
    var Controller = (function () {
        function Controller() {
            if(Controller.instance) {
                throw Error(Controller.SINGLETON_MSG);
            }
            Controller.instance = this;
            this.commandMap = {
            };
            this.initializeController();
        }
        Controller.prototype.initializeController = function () {
            this.view = puremvc.View.getInstance();
        };
        Controller.prototype.executeCommand = function (notification) {
            var commandClassRef = this.commandMap[notification.getName()];
            if(commandClassRef) {
                var command = new commandClassRef();
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
        Controller.instance = null;
        Controller.SINGLETON_MSG = "Controller Singleton already constructed!";
        Controller.getInstance = function getInstance() {
            if(!Controller.instance) {
                Controller.instance = new Controller();
            }
            return Controller.instance;
        }
        return Controller;
    })();
    puremvc.Controller = Controller;    
})(puremvc || (puremvc = {}));

var puremvc;
(function (puremvc) {
    "use strict";
    var View = (function () {
        function View() {
            if(View.instance) {
                throw Error(View.SINGLETON_MSG);
            }
            View.instance = this;
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
            this.mediatorMap[name] = mediator;
            var interests = mediator.listNotificationInterests();
            var len = interests.length;
            if(len) {
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
        View.SINGLETON_MSG = "View Singleton already constructed!";
        View.instance = null;
        View.getInstance = function getInstance() {
            if(!View.instance) {
                View.instance = new View();
            }
            return View.instance;
        }
        return View;
    })();
    puremvc.View = View;    
})(puremvc || (puremvc = {}));

var puremvc;
(function (puremvc) {
    "use strict";
    var Notification = (function () {
        function Notification(name, body, type) {
            if (typeof body === "undefined") { body = null; }
            if (typeof type === "undefined") { type = null; }
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
    var Model = (function () {
        function Model() {
            if(Model.instance) {
                throw Error(Model.SINGLETON_MSG);
            }
            Model.instance = this;
            this.proxyMap = {
            };
            this.initializeModel();
        }
        Model.prototype.initializeModel = function () {
        };
        Model.prototype.registerProxy = function (proxy) {
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
        Model.SINGLETON_MSG = "Model Singleton already constructed!";
        Model.instance = null;
        Model.getInstance = function getInstance() {
            if(!Model.instance) {
                Model.instance = new Model();
            }
            return Model.instance;
        }
        return Model;
    })();
    puremvc.Model = Model;    
})(puremvc || (puremvc = {}));

var puremvc;
(function (puremvc) {
    "use strict";
    var Facade = (function () {
        function Facade() {
            if(Facade.instance) {
                throw Error(Facade.SINGLETON_MSG);
            }
            Facade.instance = this;
            this.initializeFacade();
        }
        Facade.prototype.initializeFacade = function () {
            this.initializeModel();
            this.initializeController();
            this.initializeView();
        };
        Facade.prototype.initializeModel = function () {
            if(!this.model) {
                this.model = puremvc.Model.getInstance();
            }
        };
        Facade.prototype.initializeController = function () {
            if(!this.controller) {
                this.controller = puremvc.Controller.getInstance();
            }
        };
        Facade.prototype.initializeView = function () {
            if(!this.view) {
                this.view = puremvc.View.getInstance();
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
        Facade.SINGLETON_MSG = "Facade Singleton already constructed!";
        Facade.instance = null;
        Facade.getInstance = function getInstance() {
            if(!Facade.instance) {
                Facade.instance = new Facade();
            }
            return Facade.instance;
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
            this.facade = puremvc.Facade.getInstance();
        }
        Notifier.prototype.sendNotification = function (name, body, type) {
            if (typeof body === "undefined") { body = null; }
            if (typeof type === "undefined") { type = null; }
            this.facade.sendNotification(name, body, type);
        };
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
    var ControllerTestVO = (function () {
        function ControllerTestVO(input) {
            this.input = 0;
            this.result = 0;
            this.input = input;
        }
        return ControllerTestVO;
    })();
    puremvc.ControllerTestVO = ControllerTestVO;    
})(puremvc || (puremvc = {}));

var puremvc;
(function (puremvc) {
    "use strict";
    
    var ControllerTestCommand2 = (function (_super) {
        __extends(ControllerTestCommand2, _super);
        function ControllerTestCommand2() {
            _super.apply(this, arguments);

        }
        ControllerTestCommand2.prototype.execute = function (note) {
            var vo = note.getBody();
            vo.result = vo.result + (2 * vo.input);
        };
        return ControllerTestCommand2;
    })(puremvc.SimpleCommand);
    puremvc.ControllerTestCommand2 = ControllerTestCommand2;    
})(puremvc || (puremvc = {}));

var puremvc;
(function (puremvc) {
    "use strict";
    
    var ControllerTestCommand = (function (_super) {
        __extends(ControllerTestCommand, _super);
        function ControllerTestCommand() {
            _super.apply(this, arguments);

        }
        ControllerTestCommand.prototype.execute = function (note) {
            var vo = note.getBody();
            vo.result = 2 * vo.input;
        };
        return ControllerTestCommand;
    })(puremvc.SimpleCommand);
    puremvc.ControllerTestCommand = ControllerTestCommand;    
})(puremvc || (puremvc = {}));

var puremvc;
(function (puremvc) {
    "use strict";
    var YUITest = __YUITest__;

    var ControllerTest = (function () {
        function ControllerTest() {
            this.name = "PureMVC Controller class tests";
        }
        ControllerTest.prototype.testGetInstance = function () {
            var controller = puremvc.Controller.getInstance();
            YUITest.Assert.isNotNull(controller, "Expecting instance !== null");
            YUITest.Assert.isInstanceOf(puremvc.Controller, controller, "Expecting instance extends Controller");
        };
        ControllerTest.prototype.testRegisterAndExecuteCommand = function () {
            var controller = puremvc.Controller.getInstance();
            controller.registerCommand('ControllerTest', puremvc.ControllerTestCommand);
            var vo = new puremvc.ControllerTestVO(12);
            var note = new puremvc.Notification('ControllerTest', vo);
            controller.executeCommand(note);
            YUITest.Assert.areEqual(24, vo.result, "Expecting vo.result == 24");
        };
        ControllerTest.prototype.testRegisterAndRemoveCommand = function () {
            var controller = puremvc.Controller.getInstance();
            controller.registerCommand('ControllerRemoveTest', puremvc.ControllerTestCommand);
            var vo = new puremvc.ControllerTestVO(12);
            var note = new puremvc.Notification('ControllerRemoveTest', vo);
            controller.executeCommand(note);
            YUITest.Assert.areEqual(24, vo.result, "Expecting vo.result == 24");
            vo.result = 0;
            controller.removeCommand('ControllerRemoveTest');
            controller.executeCommand(note);
            YUITest.Assert.areEqual(0, vo.result, "Expecting vo.result == 0");
        };
        ControllerTest.prototype.testHasCommand = function () {
            var controller = puremvc.Controller.getInstance();
            controller.registerCommand('hasCommandTest', puremvc.ControllerTestCommand);
            YUITest.Assert.isTrue(controller.hasCommand('hasCommandTest'), "Expecting controller.hasCommand('hasCommandTest') === true");
            controller.removeCommand('hasCommandTest');
            YUITest.Assert.isFalse(controller.hasCommand('hasCommandTest'), "Expecting controller.hasCommand('hasCommandTest') === false");
        };
        ControllerTest.prototype.testReregisterAndExecuteCommand = function () {
            var controller = puremvc.Controller.getInstance();
            controller.registerCommand('ControllerTest2', puremvc.ControllerTestCommand2);
            controller.removeCommand('ControllerTest2');
            controller.registerCommand('ControllerTest2', puremvc.ControllerTestCommand2);
            var vo = new puremvc.ControllerTestVO(12);
            var note = new puremvc.Notification('ControllerTest2', vo);
            var view = puremvc.View.getInstance();
            view.notifyObservers(note);
            YUITest.Assert.areEqual(24, vo.result, "Expecting vo.result == 24");
            view.notifyObservers(note);
            YUITest.Assert.areEqual(48, vo.result, "Expecting vo.result == 48");
        };
        return ControllerTest;
    })();
    puremvc.ControllerTest = ControllerTest;    
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
        Proxy.NAME = 'Proxy';
        return Proxy;
    })(puremvc.Notifier);
    puremvc.Proxy = Proxy;    
})(puremvc || (puremvc = {}));

var puremvc;
(function (puremvc) {
    "use strict";
    var ModelTestProxy = (function (_super) {
        __extends(ModelTestProxy, _super);
        function ModelTestProxy() {
                _super.call(this, ModelTestProxy.NAME, '');
        }
        ModelTestProxy.prototype.onRegister = function () {
            this.setData(ModelTestProxy.ON_REGISTER_CALLED);
        };
        ModelTestProxy.prototype.onRemove = function () {
            this.setData(ModelTestProxy.ON_REMOVE_CALLED);
        };
        ModelTestProxy.NAME = 'ModelTestProxy';
        ModelTestProxy.ON_REGISTER_CALLED = 'onRegister Called';
        ModelTestProxy.ON_REMOVE_CALLED = 'onRemove Called';
        return ModelTestProxy;
    })(puremvc.Proxy);
    puremvc.ModelTestProxy = ModelTestProxy;    
})(puremvc || (puremvc = {}));

var puremvc;
(function (puremvc) {
    "use strict";
    var YUITest = __YUITest__;

    var ModelTest = (function () {
        function ModelTest() {
            this.name = "PureMVC Model class tests";
        }
        ModelTest.prototype.testGetInstance = function () {
            var model = puremvc.Model.getInstance();
            YUITest.Assert.isNotNull(model, "Expecting instance !== null");
            YUITest.Assert.isInstanceOf(puremvc.Model, model, "Expecting instance extends Model");
        };
        ModelTest.prototype.testRegisterAndRetrieveProxy = function () {
            var model = puremvc.Model.getInstance();
            model.registerProxy(new puremvc.Proxy('colors', [
                'red', 
                'green', 
                'blue'
            ]));
            var proxy = model.retrieveProxy('colors');
            var data = proxy.getData();
            YUITest.Assert.isNotNull(data, "Expecting data !== null");
            YUITest.Assert.isArray(data, "Expecting data type is Array");
            YUITest.Assert.areEqual(3, data.length, "Expecting data.length == 3");
            YUITest.Assert.areEqual('red', data[0], "Expecting data[0] == 'red'");
            YUITest.Assert.areEqual('green', data[1], "Expecting data[1] == 'green'");
            YUITest.Assert.areEqual('blue', data[2], "Expecting data[2] == 'blue'");
        };
        ModelTest.prototype.testRegisterAndRemoveProxy = function () {
            var model = puremvc.Model.getInstance();
            var proxy = new puremvc.Proxy('sizes', [
                '7', 
                '13', 
                '21'
            ]);
            model.registerProxy(proxy);
            var removedProxy = model.removeProxy('sizes');
            YUITest.Assert.areEqual('sizes', removedProxy.getProxyName(), "Expecting removedProxy.getProxyName() == 'sizes'");
            proxy = model.retrieveProxy('sizes');
            YUITest.Assert.isNull(proxy, "Expecting proxy === null");
        };
        ModelTest.prototype.testHasProxy = function () {
            var model = puremvc.Model.getInstance();
            var proxy = new puremvc.Proxy('aces', [
                'clubs', 
                'spades', 
                'hearts', 
                'diamonds'
            ]);
            model.registerProxy(proxy);
            YUITest.Assert.isTrue(model.hasProxy('aces'), "Expecting model.hasProxy('aces') === true");
            model.removeProxy('aces');
            YUITest.Assert.isFalse(model.hasProxy('aces'), "Expecting model.hasProxy('aces') === false");
        };
        ModelTest.prototype.testOnRegisterAndOnRemove = function () {
            var model = puremvc.Model.getInstance();
            var proxy = new puremvc.ModelTestProxy();
            model.registerProxy(proxy);
            YUITest.Assert.areEqual(puremvc.ModelTestProxy.ON_REGISTER_CALLED, proxy.getData(), "Expecting proxy.getData() == ModelTestProxy.ON_REGISTER_CALLED");
            model.removeProxy(puremvc.ModelTestProxy.NAME);
            YUITest.Assert.areEqual(puremvc.ModelTestProxy.ON_REMOVE_CALLED, proxy.getData(), "Expecting proxy.getData() == ModelTestProxy.ON_REMOVE_CALLED");
        };
        return ModelTest;
    })();
    puremvc.ModelTest = ModelTest;    
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
    var ViewTestMediator = (function (_super) {
        __extends(ViewTestMediator, _super);
        function ViewTestMediator(view) {
                _super.call(this, ViewTestMediator.NAME, view);
        }
        ViewTestMediator.prototype.listNotificationInterests = function () {
            return [
                'ABC', 
                'DEF', 
                'GHI'
            ];
        };
        ViewTestMediator.NAME = "ViewTestMediator";
        return ViewTestMediator;
    })(puremvc.Mediator);
    puremvc.ViewTestMediator = ViewTestMediator;    
})(puremvc || (puremvc = {}));

var puremvc;
(function (puremvc) {
    "use strict";
    var ViewTestMediator2 = (function (_super) {
        __extends(ViewTestMediator2, _super);
        function ViewTestMediator2(view) {
                _super.call(this, ViewTestMediator2.NAME, view);
        }
        ViewTestMediator2.prototype.getViewTest = function () {
            return this.viewComponent;
        };
        ViewTestMediator2.prototype.listNotificationInterests = function () {
            return [
                puremvc.ViewTest.NOTE1, 
                puremvc.ViewTest.NOTE2
            ];
        };
        ViewTestMediator2.prototype.handleNotification = function (note) {
            this.getViewTest().lastNotification = note.getName();
        };
        ViewTestMediator2.NAME = 'ViewTestMediator2';
        return ViewTestMediator2;
    })(puremvc.Mediator);
    puremvc.ViewTestMediator2 = ViewTestMediator2;    
})(puremvc || (puremvc = {}));

var puremvc;
(function (puremvc) {
    "use strict";
    var ViewTestMediator3 = (function (_super) {
        __extends(ViewTestMediator3, _super);
        function ViewTestMediator3(view) {
                _super.call(this, ViewTestMediator3.NAME, view);
        }
        ViewTestMediator3.prototype.getViewTest = function () {
            return this.viewComponent;
        };
        ViewTestMediator3.prototype.listNotificationInterests = function () {
            return [
                puremvc.ViewTest.NOTE3
            ];
        };
        ViewTestMediator3.prototype.handleNotification = function (note) {
            this.getViewTest().lastNotification = note.getName();
        };
        ViewTestMediator3.NAME = 'ViewTestMediator3';
        return ViewTestMediator3;
    })(puremvc.Mediator);
    puremvc.ViewTestMediator3 = ViewTestMediator3;    
})(puremvc || (puremvc = {}));

var puremvc;
(function (puremvc) {
    "use strict";
    var ViewTestMediator4 = (function (_super) {
        __extends(ViewTestMediator4, _super);
        function ViewTestMediator4(view) {
                _super.call(this, ViewTestMediator4.NAME, view);
        }
        ViewTestMediator4.prototype.getViewTest = function () {
            return this.viewComponent;
        };
        ViewTestMediator4.prototype.onRegister = function () {
            this.getViewTest().onRegisterCalled = true;
        };
        ViewTestMediator4.prototype.onRemove = function () {
            this.getViewTest().onRemoveCalled = true;
        };
        ViewTestMediator4.NAME = 'ViewTestMediator4';
        return ViewTestMediator4;
    })(puremvc.Mediator);
    puremvc.ViewTestMediator4 = ViewTestMediator4;    
})(puremvc || (puremvc = {}));

var puremvc;
(function (puremvc) {
    "use strict";
    var ViewTestMediator5 = (function (_super) {
        __extends(ViewTestMediator5, _super);
        function ViewTestMediator5(view) {
                _super.call(this, ViewTestMediator5.NAME, view);
        }
        ViewTestMediator5.prototype.getViewTest = function () {
            return this.viewComponent;
        };
        ViewTestMediator5.prototype.listNotificationInterests = function () {
            return [
                puremvc.ViewTest.NOTE5
            ];
        };
        ViewTestMediator5.prototype.handleNotification = function (notification) {
            this.getViewTest().counter++;
        };
        ViewTestMediator5.NAME = 'ViewTestMediator5';
        return ViewTestMediator5;
    })(puremvc.Mediator);
    puremvc.ViewTestMediator5 = ViewTestMediator5;    
})(puremvc || (puremvc = {}));

var puremvc;
(function (puremvc) {
    "use strict";
    var ViewTestMediator6 = (function (_super) {
        __extends(ViewTestMediator6, _super);
        function ViewTestMediator6(mediatorName, view) {
                _super.call(this, mediatorName, view);
        }
        ViewTestMediator6.prototype.getViewTest = function () {
            return this.viewComponent;
        };
        ViewTestMediator6.prototype.listNotificationInterests = function () {
            return [
                puremvc.ViewTest.NOTE6
            ];
        };
        ViewTestMediator6.prototype.handleNotification = function (notification) {
            this.facade.removeMediator(this.getMediatorName());
        };
        ViewTestMediator6.prototype.onRemove = function () {
            this.getViewTest().counter++;
        };
        ViewTestMediator6.NAME = 'ViewTestMediator6';
        return ViewTestMediator6;
    })(puremvc.Mediator);
    puremvc.ViewTestMediator6 = ViewTestMediator6;    
})(puremvc || (puremvc = {}));

var puremvc;
(function (puremvc) {
    "use strict";
    var ViewTestNote = (function (_super) {
        __extends(ViewTestNote, _super);
        function ViewTestNote(name, body) {
                _super.call(this, ViewTestNote.NAME, body);
        }
        ViewTestNote.NAME = "ViewTestNote";
        ViewTestNote.create = function create(body) {
            return new ViewTestNote(ViewTestNote.NAME, body);
        }
        return ViewTestNote;
    })(puremvc.Notification);
    puremvc.ViewTestNote = ViewTestNote;    
})(puremvc || (puremvc = {}));

var puremvc;
(function (puremvc) {
    "use strict";
    var YUITest = __YUITest__;

    var ViewTest = (function () {
        function ViewTest() {
            this.name = "PureMVC View class tests";
            this.lastNotification = "";
            this.counter = 0;
            this.onRegisterCalled = false;
            this.onRemoveCalled = false;
            this.viewTestVar = 0;
        }
        ViewTest.prototype.testGetInstance = function () {
            var view = puremvc.View.getInstance();
            YUITest.Assert.isNotNull(view, "Expecting instance !== null");
            YUITest.Assert.isInstanceOf(puremvc.View, view, "Expecting instance implements View");
        };
        ViewTest.prototype.testRegisterAndNotifyObserver = function () {
            var view = puremvc.View.getInstance();
            var observer = new puremvc.Observer(this.viewTestMethod, this);
            view.registerObserver(puremvc.ViewTestNote.NAME, observer);
            var note = puremvc.ViewTestNote.create(10);
            view.notifyObservers(note);
            YUITest.Assert.areEqual(10, this.viewTestVar, "Expecting viewTestVar = 10");
        };
        ViewTest.prototype.viewTestMethod = function (note) {
            this.viewTestVar = note.getBody();
        };
        ViewTest.prototype.testRegisterAndRetrieveMediator = function () {
            var view = puremvc.View.getInstance();
            var viewTestMediator = new puremvc.ViewTestMediator(this);
            view.registerMediator(viewTestMediator);
            var mediator = view.retrieveMediator(puremvc.ViewTestMediator.NAME);
            YUITest.Assert.isInstanceOf(puremvc.ViewTestMediator, mediator, "Expecting comp is ViewTestMediator");
            this.cleanup();
        };
        ViewTest.prototype.testHasMediator = function () {
            var view = puremvc.View.getInstance();
            var mediator = new puremvc.Mediator('hasMediatorTest', this);
            view.registerMediator(mediator);
            YUITest.Assert.isTrue(view.hasMediator('hasMediatorTest'), "Expecting view.hasMediator('hasMediatorTest') === true");
            view.removeMediator('hasMediatorTest');
            YUITest.Assert.isFalse(view.hasMediator('hasMediatorTest'), "Expecting view.hasMediator('hasMediatorTest') === false");
        };
        ViewTest.prototype.testRegisterAndRemoveMediator = function () {
            var view = puremvc.View.getInstance();
            var mediator = new puremvc.Mediator('testing', this);
            view.registerMediator(mediator);
            var removedMediator = view.removeMediator('testing');
            YUITest.Assert.areEqual('testing', removedMediator.getMediatorName(), "Expecting removedMediator.getMediatorName() == 'testing'");
            var retrievedMediator = view.retrieveMediator('testing');
            YUITest.Assert.isNull(retrievedMediator, "Expecting view.retrieveMediator( 'testing' ) === null )");
            this.cleanup();
        };
        ViewTest.prototype.testOnRegisterAndOnRemove = function () {
            var view = puremvc.View.getInstance();
            var mediator = new puremvc.ViewTestMediator4(this);
            view.registerMediator(mediator);
            YUITest.Assert.isTrue(this.onRegisterCalled, "Expecting onRegisterCalled === true");
            view.removeMediator(puremvc.ViewTestMediator4.NAME);
            YUITest.Assert.isTrue(this.onRemoveCalled, "Expecting onRemoveCalled === true");
            this.cleanup();
        };
        ViewTest.prototype.testSuccessiveRegisterAndRemoveMediator = function () {
            var view = puremvc.View.getInstance();
            view.registerMediator(new puremvc.ViewTestMediator(this));
            YUITest.Assert.isInstanceOf(puremvc.ViewTestMediator, view.retrieveMediator(puremvc.ViewTestMediator.NAME), "Expecting view.retrieveMediator( ViewTestMediator.NAME ) isInstanceOf ViewTestMediator");
            view.removeMediator(puremvc.ViewTestMediator.NAME);
            YUITest.Assert.isNull(view.retrieveMediator(puremvc.ViewTestMediator.NAME), "Expecting view.retrieveMediator( ViewTestMediator.NAME ) === null");
            YUITest.Assert.isNull(view.removeMediator(puremvc.ViewTestMediator.NAME), "Expecting view.removeMediator( ViewTestMediator.NAME ) === null");
            view.registerMediator(new puremvc.ViewTestMediator(this));
            YUITest.Assert.isInstanceOf(puremvc.ViewTestMediator, view.retrieveMediator(puremvc.ViewTestMediator.NAME), "Expecting view.retrieveMediator( ViewTestMediator.NAME ) is ViewTestMediator");
            view.removeMediator(puremvc.ViewTestMediator.NAME);
            YUITest.Assert.isNull(view.retrieveMediator(puremvc.ViewTestMediator.NAME), "Expecting view.retrieveMediator( ViewTestMediator.NAME ) === null");
            this.cleanup();
        };
        ViewTest.prototype.testRemoveMediatorAndSubsequentNotify = function () {
            var view = puremvc.View.getInstance();
            view.registerMediator(new puremvc.ViewTestMediator2(this));
            view.notifyObservers(new puremvc.Notification(ViewTest.NOTE1));
            YUITest.Assert.areEqual(ViewTest.NOTE1, this.lastNotification, "Expecting lastNotification == NOTE1");
            view.notifyObservers(new puremvc.Notification(ViewTest.NOTE2));
            YUITest.Assert.areEqual(ViewTest.NOTE2, this.lastNotification, "Expecting lastNotification == NOTE2");
            view.removeMediator(puremvc.ViewTestMediator2.NAME);
            YUITest.Assert.isNull(view.retrieveMediator(puremvc.ViewTestMediator2.NAME), "Expecting view.retrieveMediator( ViewTestMediator2.NAME ) === null");
            this.lastNotification = null;
            view.notifyObservers(new puremvc.Notification(ViewTest.NOTE1));
            YUITest.Assert.areNotEqual(ViewTest.NOTE1, this.lastNotification, "Expecting lastNotification != NOTE1");
            view.notifyObservers(new puremvc.Notification(ViewTest.NOTE2));
            YUITest.Assert.areNotEqual(ViewTest.NOTE2, this.lastNotification, "Expecting lastNotification != NOTE2");
            this.cleanup();
        };
        ViewTest.prototype.testRemoveOneOfTwoMediatorsAndSubsequentNotify = function () {
            var view = puremvc.View.getInstance();
            view.registerMediator(new puremvc.ViewTestMediator2(this));
            view.registerMediator(new puremvc.ViewTestMediator3(this));
            view.notifyObservers(new puremvc.Notification(ViewTest.NOTE1));
            YUITest.Assert.areEqual(ViewTest.NOTE1, this.lastNotification, "Expecting lastNotification == NOTE1");
            view.notifyObservers(new puremvc.Notification(ViewTest.NOTE2));
            YUITest.Assert.areEqual(ViewTest.NOTE2, this.lastNotification, "Expecting lastNotification == NOTE2");
            view.notifyObservers(new puremvc.Notification(ViewTest.NOTE3));
            YUITest.Assert.areEqual(ViewTest.NOTE3, this.lastNotification, "Expecting lastNotification == NOTE3");
            view.removeMediator(puremvc.ViewTestMediator2.NAME);
            YUITest.Assert.isNull(view.retrieveMediator(puremvc.ViewTestMediator2.NAME), "Expecting view.retrieveMediator( ViewTestMediator2.NAME ) === null");
            this.lastNotification = null;
            view.notifyObservers(new puremvc.Notification(ViewTest.NOTE1));
            YUITest.Assert.areNotEqual(ViewTest.NOTE1, this.lastNotification, "Expecting lastNotification != NOTE1");
            view.notifyObservers(new puremvc.Notification(ViewTest.NOTE2));
            YUITest.Assert.areNotEqual(ViewTest.NOTE2, this.lastNotification, "Expecting lastNotification != NOTE2");
            view.notifyObservers(new puremvc.Notification(ViewTest.NOTE3));
            YUITest.Assert.areEqual(ViewTest.NOTE3, this.lastNotification, "Expecting lastNotification == NOTE3");
            this.cleanup();
        };
        ViewTest.prototype.testMediatorReregistration = function () {
            var view = puremvc.View.getInstance();
            view.registerMediator(new puremvc.ViewTestMediator5(this));
            view.registerMediator(new puremvc.ViewTestMediator5(this));
            this.counter = 0;
            view.notifyObservers(new puremvc.Notification(ViewTest.NOTE5));
            YUITest.Assert.areEqual(1, this.counter, "Expecting counter == 1");
            view.removeMediator(puremvc.ViewTestMediator5.NAME);
            YUITest.Assert.isNull(view.retrieveMediator(puremvc.ViewTestMediator5.NAME), "Expecting view.retrieveMediator( ViewTestMediator5.NAME ) === null");
            this.counter = 0;
            view.notifyObservers(new puremvc.Notification(ViewTest.NOTE5));
            YUITest.Assert.areEqual(0, this.counter, "Expecting counter == 0");
        };
        ViewTest.prototype.testModifyObserverListDuringNotification = function () {
            var view = puremvc.View.getInstance();
            view.registerMediator(new puremvc.ViewTestMediator6(puremvc.ViewTestMediator6.NAME + "/1", this));
            view.registerMediator(new puremvc.ViewTestMediator6(puremvc.ViewTestMediator6.NAME + "/2", this));
            view.registerMediator(new puremvc.ViewTestMediator6(puremvc.ViewTestMediator6.NAME + "/3", this));
            view.registerMediator(new puremvc.ViewTestMediator6(puremvc.ViewTestMediator6.NAME + "/4", this));
            view.registerMediator(new puremvc.ViewTestMediator6(puremvc.ViewTestMediator6.NAME + "/5", this));
            view.registerMediator(new puremvc.ViewTestMediator6(puremvc.ViewTestMediator6.NAME + "/6", this));
            view.registerMediator(new puremvc.ViewTestMediator6(puremvc.ViewTestMediator6.NAME + "/7", this));
            view.registerMediator(new puremvc.ViewTestMediator6(puremvc.ViewTestMediator6.NAME + "/8", this));
            this.counter = 0;
            view.notifyObservers(new puremvc.Notification(ViewTest.NOTE6));
            YUITest.Assert.areEqual(8, this.counter, "Expecting counter == 8");
            this.counter = 0;
            view.notifyObservers(new puremvc.Notification(ViewTest.NOTE6));
            YUITest.Assert.areEqual(0, this.counter, "Expecting counter == 0");
        };
        ViewTest.prototype.cleanup = function () {
            puremvc.View.getInstance().removeMediator(puremvc.ViewTestMediator.NAME);
            puremvc.View.getInstance().removeMediator(puremvc.ViewTestMediator2.NAME);
            puremvc.View.getInstance().removeMediator(puremvc.ViewTestMediator3.NAME);
        };
        ViewTest.NOTE1 = "Notification1";
        ViewTest.NOTE2 = "Notification2";
        ViewTest.NOTE3 = "Notification3";
        ViewTest.NOTE4 = "Notification4";
        ViewTest.NOTE5 = "Notification5";
        ViewTest.NOTE6 = "Notification6";
        return ViewTest;
    })();
    puremvc.ViewTest = ViewTest;    
})(puremvc || (puremvc = {}));

var puremvc;
(function (puremvc) {
    "use strict";
    var MacroCommand = (function (_super) {
        __extends(MacroCommand, _super);
        function MacroCommand() {
                _super.call(this);
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
    var MacroCommandTestSub = (function (_super) {
        __extends(MacroCommandTestSub, _super);
        function MacroCommandTestSub() {
            _super.apply(this, arguments);

        }
        MacroCommandTestSub.prototype.hasFacade = function () {
            return this.facade instanceof puremvc.Facade;
        };
        return MacroCommandTestSub;
    })(puremvc.MacroCommand);
    puremvc.MacroCommandTestSub = MacroCommandTestSub;    
})(puremvc || (puremvc = {}));

var puremvc;
(function (puremvc) {
    "use strict";
    var MacroCommandTestVO = (function () {
        function MacroCommandTestVO(input) {
            this.input = null;
            this.result1 = null;
            this.result2 = null;
            this.input = input;
        }
        return MacroCommandTestVO;
    })();
    puremvc.MacroCommandTestVO = MacroCommandTestVO;    
})(puremvc || (puremvc = {}));

var puremvc;
(function (puremvc) {
    "use strict";
    var MacroCommandTestSub1Command = (function (_super) {
        __extends(MacroCommandTestSub1Command, _super);
        function MacroCommandTestSub1Command() {
            _super.apply(this, arguments);

        }
        MacroCommandTestSub1Command.prototype.execute = function (note) {
            var vo = note.getBody();
            vo.result1 = 2 * vo.input;
        };
        return MacroCommandTestSub1Command;
    })(puremvc.SimpleCommand);
    puremvc.MacroCommandTestSub1Command = MacroCommandTestSub1Command;    
})(puremvc || (puremvc = {}));

var puremvc;
(function (puremvc) {
    "use strict";
    var MacroCommandTestSub2Command = (function (_super) {
        __extends(MacroCommandTestSub2Command, _super);
        function MacroCommandTestSub2Command() {
            _super.apply(this, arguments);

        }
        MacroCommandTestSub2Command.prototype.execute = function (note) {
            var vo = note.getBody();
            vo.result2 = vo.input * vo.input;
        };
        return MacroCommandTestSub2Command;
    })(puremvc.SimpleCommand);
    puremvc.MacroCommandTestSub2Command = MacroCommandTestSub2Command;    
})(puremvc || (puremvc = {}));

var puremvc;
(function (puremvc) {
    "use strict";
    var MacroCommandTestCommand = (function (_super) {
        __extends(MacroCommandTestCommand, _super);
        function MacroCommandTestCommand() {
            _super.apply(this, arguments);

        }
        MacroCommandTestCommand.prototype.initializeMacroCommand = function () {
            this.addSubCommand(puremvc.MacroCommandTestSub1Command);
            this.addSubCommand(puremvc.MacroCommandTestSub2Command);
        };
        return MacroCommandTestCommand;
    })(puremvc.MacroCommand);
    puremvc.MacroCommandTestCommand = MacroCommandTestCommand;    
})(puremvc || (puremvc = {}));

var puremvc;
(function (puremvc) {
    "use strict";
    var YUITest = __YUITest__;

    var MacroCommandTest = (function () {
        function MacroCommandTest() {
            this.name = "PureMVC MacroCommmand class tests";
        }
        MacroCommandTest.prototype.testConstructor = function () {
            var macroCommandTestSub = new puremvc.MacroCommandTestSub();
            YUITest.Assert.isTrue(macroCommandTestSub.hasFacade(), "Expecting macroCommandTestSub.hasFacade() === true");
        };
        MacroCommandTest.prototype.testMacroCommandExecute = function () {
            var vo = new puremvc.MacroCommandTestVO(5);
            var note = new puremvc.Notification('MacroCommandTest', vo);
            var command = new puremvc.MacroCommandTestCommand();
            command.execute(note);
            YUITest.Assert.areEqual(10, vo.result1, "Expecting vo.result1 == 10");
            YUITest.Assert.areEqual(25, vo.result2, "Expecting vo.result2 == 25");
        };
        return MacroCommandTest;
    })();
    puremvc.MacroCommandTest = MacroCommandTest;    
})(puremvc || (puremvc = {}));

var puremvc;
(function (puremvc) {
    "use strict";
    var SimpleCommandTestVO = (function () {
        function SimpleCommandTestVO(input) {
            this.input = null;
            this.result = null;
            this.input = input;
        }
        return SimpleCommandTestVO;
    })();
    puremvc.SimpleCommandTestVO = SimpleCommandTestVO;    
})(puremvc || (puremvc = {}));

var puremvc;
(function (puremvc) {
    "use strict";
    var SimpleCommandTestCommand = (function (_super) {
        __extends(SimpleCommandTestCommand, _super);
        function SimpleCommandTestCommand() {
            _super.apply(this, arguments);

        }
        SimpleCommandTestCommand.prototype.execute = function (note) {
            var vo = note.getBody();
            vo.result = 2 * vo.input;
        };
        return SimpleCommandTestCommand;
    })(puremvc.SimpleCommand);
    puremvc.SimpleCommandTestCommand = SimpleCommandTestCommand;    
})(puremvc || (puremvc = {}));

var puremvc;
(function (puremvc) {
    "use strict";
    var SimpleCommandTestSub = (function (_super) {
        __extends(SimpleCommandTestSub, _super);
        function SimpleCommandTestSub() {
            _super.apply(this, arguments);

        }
        SimpleCommandTestSub.prototype.hasFacade = function () {
            return this.facade instanceof puremvc.Facade;
        };
        return SimpleCommandTestSub;
    })(puremvc.SimpleCommand);
    puremvc.SimpleCommandTestSub = SimpleCommandTestSub;    
})(puremvc || (puremvc = {}));

var puremvc;
(function (puremvc) {
    "use strict";
    var YUITest = __YUITest__;

    var SimpleCommandTest = (function () {
        function SimpleCommandTest() {
            this.name = "PureMVC SimpleCommand class Tests";
        }
        SimpleCommandTest.prototype.testConstructor = function () {
            var simpleCommandTestSub = new puremvc.SimpleCommandTestSub();
            YUITest.Assert.isTrue(simpleCommandTestSub.hasFacade(), "Expecting simpleCommandTestSub.hasFacade() === true");
        };
        SimpleCommandTest.prototype.testSimpleCommandExecute = function () {
            var vo = new puremvc.SimpleCommandTestVO(5);
            var note = new puremvc.Notification('SimpleCommandTestNote', vo);
            var command = new puremvc.SimpleCommandTestCommand();
            command.execute(note);
            YUITest.Assert.areEqual(10, vo.result, "Expecting vo.result == 10");
        };
        return SimpleCommandTest;
    })();
    puremvc.SimpleCommandTest = SimpleCommandTest;    
})(puremvc || (puremvc = {}));

var puremvc;
(function (puremvc) {
    "use strict";
    var FacadeTestVO = (function () {
        function FacadeTestVO(input) {
            this.input = null;
            this.result = null;
            this.input = input;
        }
        return FacadeTestVO;
    })();
    puremvc.FacadeTestVO = FacadeTestVO;    
})(puremvc || (puremvc = {}));

var puremvc;
(function (puremvc) {
    "use strict";
    var FacadeTestCommand = (function (_super) {
        __extends(FacadeTestCommand, _super);
        function FacadeTestCommand() {
            _super.apply(this, arguments);

        }
        FacadeTestCommand.prototype.execute = function (note) {
            var vo = note.getBody();
            vo.result = 2 * vo.input;
        };
        return FacadeTestCommand;
    })(puremvc.SimpleCommand);
    puremvc.FacadeTestCommand = FacadeTestCommand;    
})(puremvc || (puremvc = {}));

var puremvc;
(function (puremvc) {
    "use strict";
    var YUITest = __YUITest__;

    var FacadeTest = (function () {
        function FacadeTest() {
            this.name = "PureMVC Facade class tests";
        }
        FacadeTest.prototype.testGetInstance = function () {
            var facade = puremvc.Facade.getInstance();
            YUITest.Assert.isNotUndefined(facade, "Expecting facade not to be undefined");
            YUITest.Assert.isInstanceOf(puremvc.Facade, facade, "Expecting instance is instance of Facade");
        };
        FacadeTest.prototype.testRegisterCommandAndSendNotification = function () {
            var facade = puremvc.Facade.getInstance();
            facade.registerCommand('FacadeTestNote', puremvc.FacadeTestCommand);
            var vo = new puremvc.FacadeTestVO(32);
            facade.sendNotification('FacadeTestNote', vo);
            YUITest.Assert.areEqual(64, vo.result, "Expecting vo.result == 64");
        };
        FacadeTest.prototype.testRegisterAndRemoveCommandAndSendNotification = function () {
            var facade = puremvc.Facade.getInstance();
            facade.registerCommand('FacadeTestNote', puremvc.FacadeTestCommand);
            facade.removeCommand('FacadeTestNote');
            var vo = new puremvc.FacadeTestVO(32);
            facade.sendNotification('FacadeTestNote', vo);
            YUITest.Assert.areNotEqual(64, vo.result, "Expecting vo.result != 64");
        };
        FacadeTest.prototype.testRegisterAndRetrieveProxy = function () {
            var facade = puremvc.Facade.getInstance();
            facade.registerProxy(new puremvc.Proxy('colors', [
                'red', 
                'green', 
                'blue'
            ]));
            var proxy = facade.retrieveProxy('colors');
            YUITest.Assert.isInstanceOf(puremvc.Proxy, proxy, "Expecting proxy is Proxy");
            var data = proxy.getData();
            YUITest.Assert.isNotUndefined(data, "Expecting data not null");
            YUITest.Assert.isArray(data, "Expecting data is Array");
            YUITest.Assert.areEqual(3, data.length, "Expecting data.length == 3");
            YUITest.Assert.areEqual('red', data[0], "Expecting data[0] == 'red'");
            YUITest.Assert.areEqual('green', data[1], "Expecting data[1] == 'green'");
            YUITest.Assert.areEqual('blue', data[2], "Expecting data[2] == 'blue'");
        };
        FacadeTest.prototype.testRegisterAndRemoveProxy = function () {
            var facade = puremvc.Facade.getInstance();
            var proxy = new puremvc.Proxy('sizes', [
                '7', 
                '13', 
                '21'
            ]);
            facade.registerProxy(proxy);
            var removedProxy = facade.removeProxy('sizes');
            YUITest.Assert.areEqual('sizes', removedProxy ? removedProxy.getProxyName() : null, "Expecting removedProxy.getProxyName() == 'sizes'");
            proxy = facade.retrieveProxy('sizes');
            YUITest.Assert.isNull(proxy, "Expecting proxy === null");
        };
        FacadeTest.prototype.testRegisterRetrieveAndRemoveMediator = function () {
            var facade = puremvc.Facade.getInstance();
            facade.registerMediator(new puremvc.Mediator(puremvc.Mediator.NAME, new Object()));
            YUITest.Assert.isNotNull(facade.retrieveMediator(puremvc.Mediator.NAME), "Expecting facade.retrieveMediator( Mediator.NAME ) !== null");
            var removedMediator = facade.removeMediator(puremvc.Mediator.NAME);
            YUITest.Assert.areEqual(puremvc.Mediator.NAME, removedMediator ? removedMediator.getMediatorName() : null, "Expecting removedMediator.getMediatorName() == Mediator.NAME");
            YUITest.Assert.isNull(facade.retrieveMediator(puremvc.Mediator.NAME), "Expecting facade.retrieveMediator( Mediator.NAME ) === null )");
        };
        FacadeTest.prototype.testHasProxy = function () {
            var facade = puremvc.Facade.getInstance();
            facade.registerProxy(new puremvc.Proxy('hasProxyTest', [
                1, 
                2, 
                3
            ]));
            YUITest.Assert.isTrue(facade.hasProxy('hasProxyTest'), "Expecting facade.hasProxy('hasProxyTest') === true");
        };
        FacadeTest.prototype.testHasMediator = function () {
            var facade = puremvc.Facade.getInstance();
            facade.registerMediator(new puremvc.Mediator('facadeHasMediatorTest', new Object()));
            YUITest.Assert.isTrue(facade.hasMediator('facadeHasMediatorTest'), "Expecting facade.hasMediator('facadeHasMediatorTest') === true");
            facade.removeMediator('facadeHasMediatorTest');
            YUITest.Assert.isFalse(facade.hasMediator('facadeHasMediatorTest'), "Expecting facade.hasMediator('facadeHasMediatorTest') === false");
        };
        FacadeTest.prototype.testHasCommand = function () {
            var facade = puremvc.Facade.getInstance();
            facade.registerCommand('facadeHasCommandTest', puremvc.FacadeTestCommand);
            YUITest.Assert.isTrue(facade.hasCommand('facadeHasCommandTest'), "Expecting facade.hasCommand('facadeHasCommandTest') === true");
            facade.removeCommand('facadeHasCommandTest');
            YUITest.Assert.isFalse(facade.hasCommand('facadeHasCommandTest'), "Expecting facade.hasCommand('facadeHasCommandTest') === false");
        };
        return FacadeTest;
    })();
    puremvc.FacadeTest = FacadeTest;    
})(puremvc || (puremvc = {}));

var puremvc;
(function (puremvc) {
    "use strict";
    var MediatorTestSub = (function (_super) {
        __extends(MediatorTestSub, _super);
        function MediatorTestSub() {
            _super.apply(this, arguments);

        }
        MediatorTestSub.prototype.hasFacade = function () {
            return this.facade instanceof puremvc.Facade;
        };
        return MediatorTestSub;
    })(puremvc.Mediator);
    puremvc.MediatorTestSub = MediatorTestSub;    
})(puremvc || (puremvc = {}));

var puremvc;
(function (puremvc) {
    "use strict";
    var YUITest = __YUITest__;

    var MediatorTest = (function () {
        function MediatorTest() {
            this.name = "PureMVC Mediator class tests";
        }
        MediatorTest.prototype.testConstructor = function () {
            var mediatorTestSub = new puremvc.MediatorTestSub();
            YUITest.Assert.isTrue(mediatorTestSub.hasFacade(), "Expecting mediatorTestSub.hasFacade() === true");
        };
        MediatorTest.prototype.testNameAccessor = function () {
            var mediator = new puremvc.Mediator();
            YUITest.Assert.areEqual(puremvc.Mediator.NAME, mediator.getMediatorName(), "Expecting mediator.getMediatorName() == Mediator.NAME");
        };
        MediatorTest.prototype.testViewAccessor = function () {
            var view = new Object();
            var mediator = new puremvc.Mediator(puremvc.Mediator.NAME, view);
            YUITest.Assert.isNotNull(mediator.getViewComponent(), "Expecting mediator.getViewComponent() !== null");
        };
        return MediatorTest;
    })();
    puremvc.MediatorTest = MediatorTest;    
})(puremvc || (puremvc = {}));

var puremvc;
(function (puremvc) {
    "use strict";
    var YUITest = __YUITest__;

    var NotificationTest = (function () {
        function NotificationTest() {
            this.name = "PureMVC Notification class tests";
        }
        NotificationTest.prototype.testNameAccessors = function () {
            var note = new puremvc.Notification('TestNote');
            YUITest.Assert.areEqual('TestNote', note.getName(), "Expecting note.getName() == 'TestNote'");
        };
        NotificationTest.prototype.testBodyAccessors = function () {
            var note = new puremvc.Notification(null);
            note.setBody(5);
            YUITest.Assert.areSame(5, note.getBody(), "Expecting note.getBody() === 5");
        };
        NotificationTest.prototype.testConstructor = function () {
            var note = new puremvc.Notification('TestNote', 5, 'TestNoteType');
            YUITest.Assert.areEqual("TestNote", note.getName(), "Expecting note.getName() == 'TestNote'");
            YUITest.Assert.areSame(5, note.getBody(), "Expecting note.getBody() === 5");
            YUITest.Assert.areEqual("TestNoteType", note.getType(), "Expecting note.getType() == 'TestNoteType'");
        };
        NotificationTest.prototype.testToString = function () {
            var note = new puremvc.Notification('TestNote', [
                1, 
                3, 
                5
            ], 'TestType');
            var ts = "Notification Name: TestNote\nBody:1,3,5\nType:TestType";
            YUITest.Assert.areEqual(ts, note.toString(), "Expecting note.testToString():void == '" + ts + "'");
        };
        return NotificationTest;
    })();
    puremvc.NotificationTest = NotificationTest;    
})(puremvc || (puremvc = {}));

var puremvc;
(function (puremvc) {
    "use strict";
    
    var NotifierTestVO = (function () {
        function NotifierTestVO(input) {
            this.input = null;
            this.result = null;
            this.input = input;
        }
        return NotifierTestVO;
    })();
    puremvc.NotifierTestVO = NotifierTestVO;    
})(puremvc || (puremvc = {}));

var puremvc;
(function (puremvc) {
    "use strict";
    var NotifierTestCommand = (function (_super) {
        __extends(NotifierTestCommand, _super);
        function NotifierTestCommand() {
            _super.apply(this, arguments);

        }
        NotifierTestCommand.prototype.execute = function (note) {
            var vo = note.getBody();
            vo.result = 2 * vo.input;
        };
        return NotifierTestCommand;
    })(puremvc.SimpleCommand);
    puremvc.NotifierTestCommand = NotifierTestCommand;    
})(puremvc || (puremvc = {}));

var puremvc;
(function (puremvc) {
    "use strict";
    var NotifierTestSub = (function (_super) {
        __extends(NotifierTestSub, _super);
        function NotifierTestSub() {
            _super.apply(this, arguments);

        }
        NotifierTestSub.prototype.hasFacade = function () {
            return this.facade instanceof puremvc.Facade;
        };
        return NotifierTestSub;
    })(puremvc.Notifier);
    puremvc.NotifierTestSub = NotifierTestSub;    
})(puremvc || (puremvc = {}));

var puremvc;
(function (puremvc) {
    "use strict";
    var YUITest = __YUITest__;

    var NotifierTest = (function () {
        function NotifierTest() {
            this.name = "PureMVC Notifier class tests";
        }
        NotifierTest.prototype.testConstructor = function () {
            var notifierTestSub = new puremvc.NotifierTestSub();
            YUITest.Assert.isTrue(notifierTestSub.hasFacade(), "Expecting notifierTestSub.hasFacade() === true");
        };
        NotifierTest.prototype.testSendNotification = function () {
            var facade = puremvc.Facade.getInstance();
            facade.registerCommand('NotifierTestNote', puremvc.NotifierTestCommand);
            var vo = new puremvc.NotifierTestVO(32);
            facade.sendNotification('NotifierTestNote', vo);
            YUITest.Assert.areEqual(64, vo.result, "Expecting vo.result == 64");
        };
        return NotifierTest;
    })();
    puremvc.NotifierTest = NotifierTest;    
})(puremvc || (puremvc = {}));

var puremvc;
(function (puremvc) {
    "use strict";
    var YUITest = __YUITest__;

    var ObserverTest = (function () {
        function ObserverTest() {
            this.name = "PureMVC Observer class tests";
            this.observerTestVar = -1;
        }
        ObserverTest.prototype.testObserverAccessors = function () {
            var observer = new puremvc.Observer(null, null);
            observer.setNotifyContext(this);
            observer.setNotifyMethod(this.observerTestMethod);
            var note = new puremvc.Notification('ObserverTestNote', 10);
            observer.notifyObserver(note);
            YUITest.Assert.areSame(10, this.observerTestVar, "Expecting observerTestVar === 10");
        };
        ObserverTest.prototype.testObserverConstructor = function () {
            var observer = new puremvc.Observer(this.observerTestMethod, this);
            var note = new puremvc.Notification('ObserverTestNote', 5);
            observer.notifyObserver(note);
            YUITest.Assert.areSame(5, this.observerTestVar, "Expecting observerTestVar === 5");
        };
        ObserverTest.prototype.testCompareNotifyContext = function () {
            var observer = new puremvc.Observer(this.observerTestMethod, this);
            var negTestObj = new Object();
            YUITest.Assert.isFalse(observer.compareNotifyContext(negTestObj), "Expecting observer.compareNotifyContext(negTestObj) === false");
            YUITest.Assert.isTrue(observer.compareNotifyContext(this), "Expecting observer.compareNotifyContext(this) === true");
        };
        ObserverTest.prototype.observerTestMethod = function (note) {
            this.observerTestVar = note.getBody();
        };
        return ObserverTest;
    })();
    puremvc.ObserverTest = ObserverTest;    
})(puremvc || (puremvc = {}));

var puremvc;
(function (puremvc) {
    "use strict";
    
    var ProxyTestSub = (function (_super) {
        __extends(ProxyTestSub, _super);
        function ProxyTestSub() {
            _super.apply(this, arguments);

        }
        ProxyTestSub.prototype.hasFacade = function () {
            return this.facade instanceof puremvc.Facade;
        };
        return ProxyTestSub;
    })(puremvc.Proxy);
    puremvc.ProxyTestSub = ProxyTestSub;    
})(puremvc || (puremvc = {}));

var puremvc;
(function (puremvc) {
    "use strict";
    var YUITest = __YUITest__;

    var ProxyTest = (function () {
        function ProxyTest() {
            this.name = "PureMVC Proxy class tests";
        }
        ProxyTest.prototype.testConstructorInitialization = function () {
            var proxyTestSub = new puremvc.ProxyTestSub();
            YUITest.Assert.isTrue(proxyTestSub.hasFacade(), "Expecting proxyTestSub.hasFacade() === true");
        };
        ProxyTest.prototype.testConstructor = function () {
            var proxy = new puremvc.Proxy('colors', [
                'red', 
                'green', 
                'blue'
            ]);
            var data = proxy.getData();
            YUITest.Assert.isNotNull(proxy, "Expecting proxy !== null");
            YUITest.Assert.areEqual('colors', proxy.getProxyName(), "Expecting proxy.getProxyName() == 'colors'");
            YUITest.Assert.areEqual(3, data.length, "Expecting data.length == 3");
            YUITest.Assert.areEqual('red', data[0], "Expecting data[0] == 'red'");
            YUITest.Assert.areEqual('green', data[1], "Expecting data[1] == 'green'");
            YUITest.Assert.areEqual('blue', data[2], "Expecting data[2] == 'blue'");
        };
        ProxyTest.prototype.testNameAccessor = function () {
            var proxy = new puremvc.Proxy('TestProxy');
            YUITest.Assert.areEqual('TestProxy', proxy.getProxyName(), "Expecting proxy.getProxyName() == 'TestProxy'");
        };
        ProxyTest.prototype.testDataAccessors = function () {
            var proxy = new puremvc.Proxy('colors');
            proxy.setData([
                'red', 
                'green', 
                'blue'
            ]);
            var data = proxy.getData();
            YUITest.Assert.areEqual(3, data.length, "Expecting data.length == 3");
            YUITest.Assert.areEqual('red', data[0], "Expecting data[0] == 'red'");
            YUITest.Assert.areEqual('green', data[1], "Expecting data[1] == 'green'");
            YUITest.Assert.areEqual('blue', data[2], "Expecting data[2] == 'blue'");
        };
        return ProxyTest;
    })();
    puremvc.ProxyTest = ProxyTest;    
})(puremvc || (puremvc = {}));

