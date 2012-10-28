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
    })(SimpleCommand);
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
    })(SimpleCommand);
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
            var controller = Controller.getInstance();
            YUITest.Assert.isNotNull(controller, "Expecting instance !== null");
            YUITest.Assert.isInstanceOf(Controller, controller, "Expecting instance extends Controller");
        };
        ControllerTest.prototype.testRegisterAndExecuteCommand = function () {
            var controller = Controller.getInstance();
            controller.registerCommand('ControllerTest', puremvc.ControllerTestCommand);
            var vo = new puremvc.ControllerTestVO(12);
            var note = new Notification('ControllerTest', vo);
            controller.executeCommand(note);
            YUITest.Assert.areEqual(24, vo.result, "Expecting vo.result == 24");
        };
        ControllerTest.prototype.testRegisterAndRemoveCommand = function () {
            var controller = Controller.getInstance();
            controller.registerCommand('ControllerRemoveTest', puremvc.ControllerTestCommand);
            var vo = new puremvc.ControllerTestVO(12);
            var note = new Notification('ControllerRemoveTest', vo);
            controller.executeCommand(note);
            YUITest.Assert.areEqual(24, vo.result, "Expecting vo.result == 24");
            vo.result = 0;
            controller.removeCommand('ControllerRemoveTest');
            controller.executeCommand(note);
            YUITest.Assert.areEqual(0, vo.result, "Expecting vo.result == 0");
        };
        ControllerTest.prototype.testHasCommand = function () {
            var controller = Controller.getInstance();
            controller.registerCommand('hasCommandTest', puremvc.ControllerTestCommand);
            YUITest.Assert.isTrue(controller.hasCommand('hasCommandTest'), "Expecting controller.hasCommand('hasCommandTest') === true");
            controller.removeCommand('hasCommandTest');
            YUITest.Assert.isFalse(controller.hasCommand('hasCommandTest'), "Expecting controller.hasCommand('hasCommandTest') === false");
        };
        ControllerTest.prototype.testReregisterAndExecuteCommand = function () {
            var controller = Controller.getInstance();
            controller.registerCommand('ControllerTest2', puremvc.ControllerTestCommand2);
            controller.removeCommand('ControllerTest2');
            controller.registerCommand('ControllerTest2', puremvc.ControllerTestCommand2);
            var vo = new puremvc.ControllerTestVO(12);
            var note = new Notification('ControllerTest2', vo);
            var view = View.getInstance();
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
    var ModelTestProxy = (function (_super) {
        __extends(ModelTestProxy, _super);
        function ModelTestProxy() {
            _super.prototype(ModelTestProxy.NAME, '');
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
    })(Proxy);
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
            var model = Model.getInstance();
            YUITest.Assert.isNotNull(model, "Expecting instance !== null");
            YUITest.Assert.isInstanceOf(Model, model, "Expecting instance extends Model");
        };
        ModelTest.prototype.testRegisterAndRetrieveProxy = function () {
            var model = Model.getInstance();
            model.registerProxy(new Proxy('colors', [
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
            var model = Model.getInstance();
            var proxy = new Proxy('sizes', [
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
            var model = Model.getInstance();
            var proxy = new Proxy('aces', [
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
            var model = Model.getInstance();
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
    var ViewTestMediator = (function (_super) {
        __extends(ViewTestMediator, _super);
        function ViewTestMediator(view) {
            _super.prototype(ViewTestMediator.NAME, view);
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
    })(Mediator);
    puremvc.ViewTestMediator = ViewTestMediator;    
})(puremvc || (puremvc = {}));

var puremvc;
(function (puremvc) {
    "use strict";
    var ViewTestMediator2 = (function (_super) {
        __extends(ViewTestMediator2, _super);
        function ViewTestMediator2(view) {
            _super.prototype(ViewTestMediator2.NAME, view);
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
    })(Mediator);
    puremvc.ViewTestMediator2 = ViewTestMediator2;    
})(puremvc || (puremvc = {}));

var puremvc;
(function (puremvc) {
    "use strict";
    var ViewTestMediator3 = (function (_super) {
        __extends(ViewTestMediator3, _super);
        function ViewTestMediator3(view) {
            _super.prototype(ViewTestMediator3.NAME, view);
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
    })(Mediator);
    puremvc.ViewTestMediator3 = ViewTestMediator3;    
})(puremvc || (puremvc = {}));

var puremvc;
(function (puremvc) {
    "use strict";
    var ViewTestMediator4 = (function (_super) {
        __extends(ViewTestMediator4, _super);
        function ViewTestMediator4(view) {
            _super.prototype(ViewTestMediator4.NAME, view);
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
    })(Mediator);
    puremvc.ViewTestMediator4 = ViewTestMediator4;    
})(puremvc || (puremvc = {}));

var puremvc;
(function (puremvc) {
    "use strict";
    var ViewTestMediator5 = (function (_super) {
        __extends(ViewTestMediator5, _super);
        function ViewTestMediator5(view) {
            _super.prototype(ViewTestMediator5.NAME, view);
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
    })(Mediator);
    puremvc.ViewTestMediator5 = ViewTestMediator5;    
})(puremvc || (puremvc = {}));

var puremvc;
(function (puremvc) {
    "use strict";
    var ViewTestMediator6 = (function (_super) {
        __extends(ViewTestMediator6, _super);
        function ViewTestMediator6(mediatorName, view) {
            _super.prototype(mediatorName, view);
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
    })(Mediator);
    puremvc.ViewTestMediator6 = ViewTestMediator6;    
})(puremvc || (puremvc = {}));

var puremvc;
(function (puremvc) {
    "use strict";
    var ViewTestNote = (function (_super) {
        __extends(ViewTestNote, _super);
        function ViewTestNote(name, body) {
            _super.prototype(ViewTestNote.NAME, body);
        }
        ViewTestNote.NAME = "ViewTestNote";
        ViewTestNote.create = function create(body) {
            return new ViewTestNote(ViewTestNote.NAME, body);
        }
        return ViewTestNote;
    })(Notification);
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
            var view = View.getInstance();
            YUITest.Assert.isNotNull(view, "Expecting instance !== null");
            YUITest.Assert.isInstanceOf(View, view, "Expecting instance implements View");
        };
        ViewTest.prototype.testRegisterAndNotifyObserver = function () {
            var view = View.getInstance();
            var observer = new Observer(this.viewTestMethod, this);
            view.registerObserver(puremvc.ViewTestNote.NAME, observer);
            var note = puremvc.ViewTestNote.create(10);
            view.notifyObservers(note);
            YUITest.Assert.areEqual(10, this.viewTestVar, "Expecting viewTestVar = 10");
        };
        ViewTest.prototype.viewTestMethod = function (note) {
            this.viewTestVar = note.getBody();
        };
        ViewTest.prototype.testRegisterAndRetrieveMediator = function () {
            var view = View.getInstance();
            var viewTestMediator = new puremvc.ViewTestMediator(this);
            view.registerMediator(viewTestMediator);
            var mediator = view.retrieveMediator(puremvc.ViewTestMediator.NAME);
            YUITest.Assert.isInstanceOf(puremvc.ViewTestMediator, mediator, "Expecting comp is ViewTestMediator");
            this.cleanup();
        };
        ViewTest.prototype.testHasMediator = function () {
            var view = View.getInstance();
            var mediator = new Mediator('hasMediatorTest', this);
            view.registerMediator(mediator);
            YUITest.Assert.isTrue(view.hasMediator('hasMediatorTest'), "Expecting view.hasMediator('hasMediatorTest') === true");
            view.removeMediator('hasMediatorTest');
            YUITest.Assert.isFalse(view.hasMediator('hasMediatorTest'), "Expecting view.hasMediator('hasMediatorTest') === false");
        };
        ViewTest.prototype.testRegisterAndRemoveMediator = function () {
            var view = View.getInstance();
            var mediator = new Mediator('testing', this);
            view.registerMediator(mediator);
            var removedMediator = view.removeMediator('testing');
            YUITest.Assert.areEqual('testing', removedMediator.getMediatorName(), "Expecting removedMediator.getMediatorName() == 'testing'");
            var retrievedMediator = view.retrieveMediator('testing');
            YUITest.Assert.isNull(retrievedMediator, "Expecting view.retrieveMediator( 'testing' ) === null )");
            this.cleanup();
        };
        ViewTest.prototype.testOnRegisterAndOnRemove = function () {
            var view = View.getInstance();
            var mediator = new puremvc.ViewTestMediator4(this);
            view.registerMediator(mediator);
            YUITest.Assert.isTrue(this.onRegisterCalled, "Expecting onRegisterCalled === true");
            view.removeMediator(puremvc.ViewTestMediator4.NAME);
            YUITest.Assert.isTrue(this.onRemoveCalled, "Expecting onRemoveCalled === true");
            this.cleanup();
        };
        ViewTest.prototype.testSuccessiveRegisterAndRemoveMediator = function () {
            var view = View.getInstance();
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
            var view = View.getInstance();
            view.registerMediator(new puremvc.ViewTestMediator2(this));
            view.notifyObservers(new Notification(ViewTest.NOTE1));
            YUITest.Assert.areEqual(ViewTest.NOTE1, this.lastNotification, "Expecting lastNotification == NOTE1");
            view.notifyObservers(new Notification(ViewTest.NOTE2));
            YUITest.Assert.areEqual(ViewTest.NOTE2, this.lastNotification, "Expecting lastNotification == NOTE2");
            view.removeMediator(puremvc.ViewTestMediator2.NAME);
            YUITest.Assert.isNull(view.retrieveMediator(puremvc.ViewTestMediator2.NAME), "Expecting view.retrieveMediator( ViewTestMediator2.NAME ) === null");
            this.lastNotification = null;
            view.notifyObservers(new Notification(ViewTest.NOTE1));
            YUITest.Assert.areNotEqual(ViewTest.NOTE1, this.lastNotification, "Expecting lastNotification != NOTE1");
            view.notifyObservers(new Notification(ViewTest.NOTE2));
            YUITest.Assert.areNotEqual(ViewTest.NOTE2, this.lastNotification, "Expecting lastNotification != NOTE2");
            this.cleanup();
        };
        ViewTest.prototype.testRemoveOneOfTwoMediatorsAndSubsequentNotify = function () {
            var view = View.getInstance();
            view.registerMediator(new puremvc.ViewTestMediator2(this));
            view.registerMediator(new puremvc.ViewTestMediator3(this));
            view.notifyObservers(new Notification(ViewTest.NOTE1));
            YUITest.Assert.areEqual(ViewTest.NOTE1, this.lastNotification, "Expecting lastNotification == NOTE1");
            view.notifyObservers(new Notification(ViewTest.NOTE2));
            YUITest.Assert.areEqual(ViewTest.NOTE2, this.lastNotification, "Expecting lastNotification == NOTE2");
            view.notifyObservers(new Notification(ViewTest.NOTE3));
            YUITest.Assert.areEqual(ViewTest.NOTE3, this.lastNotification, "Expecting lastNotification == NOTE3");
            view.removeMediator(puremvc.ViewTestMediator2.NAME);
            YUITest.Assert.isNull(view.retrieveMediator(puremvc.ViewTestMediator2.NAME), "Expecting view.retrieveMediator( ViewTestMediator2.NAME ) === null");
            this.lastNotification = null;
            view.notifyObservers(new Notification(ViewTest.NOTE1));
            YUITest.Assert.areNotEqual(ViewTest.NOTE1, this.lastNotification, "Expecting lastNotification != NOTE1");
            view.notifyObservers(new Notification(ViewTest.NOTE2));
            YUITest.Assert.areNotEqual(ViewTest.NOTE2, this.lastNotification, "Expecting lastNotification != NOTE2");
            view.notifyObservers(new Notification(ViewTest.NOTE3));
            YUITest.Assert.areEqual(ViewTest.NOTE3, this.lastNotification, "Expecting lastNotification == NOTE3");
            this.cleanup();
        };
        ViewTest.prototype.testMediatorReregistration = function () {
            var view = View.getInstance();
            view.registerMediator(new puremvc.ViewTestMediator5(this));
            view.registerMediator(new puremvc.ViewTestMediator5(this));
            this.counter = 0;
            view.notifyObservers(new Notification(ViewTest.NOTE5));
            YUITest.Assert.areEqual(1, this.counter, "Expecting counter == 1");
            view.removeMediator(puremvc.ViewTestMediator5.NAME);
            YUITest.Assert.isNull(view.retrieveMediator(puremvc.ViewTestMediator5.NAME), "Expecting view.retrieveMediator( ViewTestMediator5.NAME ) === null");
            this.counter = 0;
            view.notifyObservers(new Notification(ViewTest.NOTE5));
            YUITest.Assert.areEqual(0, this.counter, "Expecting counter == 0");
        };
        ViewTest.prototype.testModifyObserverListDuringNotification = function () {
            var view = View.getInstance();
            view.registerMediator(new puremvc.ViewTestMediator6(puremvc.ViewTestMediator6.NAME + "/1", this));
            view.registerMediator(new puremvc.ViewTestMediator6(puremvc.ViewTestMediator6.NAME + "/2", this));
            view.registerMediator(new puremvc.ViewTestMediator6(puremvc.ViewTestMediator6.NAME + "/3", this));
            view.registerMediator(new puremvc.ViewTestMediator6(puremvc.ViewTestMediator6.NAME + "/4", this));
            view.registerMediator(new puremvc.ViewTestMediator6(puremvc.ViewTestMediator6.NAME + "/5", this));
            view.registerMediator(new puremvc.ViewTestMediator6(puremvc.ViewTestMediator6.NAME + "/6", this));
            view.registerMediator(new puremvc.ViewTestMediator6(puremvc.ViewTestMediator6.NAME + "/7", this));
            view.registerMediator(new puremvc.ViewTestMediator6(puremvc.ViewTestMediator6.NAME + "/8", this));
            this.counter = 0;
            view.notifyObservers(new Notification(ViewTest.NOTE6));
            YUITest.Assert.areEqual(8, this.counter, "Expecting counter == 8");
            this.counter = 0;
            view.notifyObservers(new Notification(ViewTest.NOTE6));
            YUITest.Assert.areEqual(0, this.counter, "Expecting counter == 0");
        };
        ViewTest.prototype.cleanup = function () {
            View.getInstance().removeMediator(puremvc.ViewTestMediator.NAME);
            View.getInstance().removeMediator(puremvc.ViewTestMediator2.NAME);
            View.getInstance().removeMediator(puremvc.ViewTestMediator3.NAME);
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
    var MacroCommandTestSub = (function (_super) {
        __extends(MacroCommandTestSub, _super);
        function MacroCommandTestSub() {
            _super.apply(this, arguments);

        }
        MacroCommandTestSub.prototype.hasFacade = function () {
            return this.facade instanceof Facade;
        };
        return MacroCommandTestSub;
    })(MacroCommand);
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
    })(SimpleCommand);
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
    })(SimpleCommand);
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
    })(MacroCommand);
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
            var note = new Notification('MacroCommandTest', vo);
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
    })(SimpleCommand);
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
            return this.facade instanceof Facade;
        };
        return SimpleCommandTestSub;
    })(SimpleCommand);
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
            var note = new Notification('SimpleCommandTestNote', vo);
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
    })(SimpleCommand);
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
            var facade = Facade.getInstance();
            YUITest.Assert.isNotUndefined(facade, "Expecting facade not to be undefined");
            YUITest.Assert.isInstanceOf(Facade, facade, "Expecting instance is instance of Facade");
        };
        FacadeTest.prototype.testRegisterCommandAndSendNotification = function () {
            var facade = Facade.getInstance();
            facade.registerCommand('FacadeTestNote', puremvc.FacadeTestCommand);
            var vo = new puremvc.FacadeTestVO(32);
            facade.sendNotification('FacadeTestNote', vo);
            YUITest.Assert.areEqual(64, vo.result, "Expecting vo.result == 64");
        };
        FacadeTest.prototype.testRegisterAndRemoveCommandAndSendNotification = function () {
            var facade = Facade.getInstance();
            facade.registerCommand('FacadeTestNote', puremvc.FacadeTestCommand);
            facade.removeCommand('FacadeTestNote');
            var vo = new puremvc.FacadeTestVO(32);
            facade.sendNotification('FacadeTestNote', vo);
            YUITest.Assert.areNotEqual(64, vo.result, "Expecting vo.result != 64");
        };
        FacadeTest.prototype.testRegisterAndRetrieveProxy = function () {
            var facade = Facade.getInstance();
            facade.registerProxy(new Proxy('colors', [
                'red', 
                'green', 
                'blue'
            ]));
            var proxy = facade.retrieveProxy('colors');
            YUITest.Assert.isInstanceOf(Proxy, proxy, "Expecting proxy is Proxy");
            var data = proxy.getData();
            YUITest.Assert.isNotUndefined(data, "Expecting data not null");
            YUITest.Assert.isArray(data, "Expecting data is Array");
            YUITest.Assert.areEqual(3, data.length, "Expecting data.length == 3");
            YUITest.Assert.areEqual('red', data[0], "Expecting data[0] == 'red'");
            YUITest.Assert.areEqual('green', data[1], "Expecting data[1] == 'green'");
            YUITest.Assert.areEqual('blue', data[2], "Expecting data[2] == 'blue'");
        };
        FacadeTest.prototype.testRegisterAndRemoveProxy = function () {
            var facade = Facade.getInstance();
            var proxy = new Proxy('sizes', [
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
            var facade = Facade.getInstance();
            facade.registerMediator(new Mediator(Mediator.NAME, new Object()));
            YUITest.Assert.isNotNull(facade.retrieveMediator(Mediator.NAME), "Expecting facade.retrieveMediator( Mediator.NAME ) !== null");
            var removedMediator = facade.removeMediator(Mediator.NAME);
            YUITest.Assert.areEqual(Mediator.NAME, removedMediator ? removedMediator.getMediatorName() : null, "Expecting removedMediator.getMediatorName() == Mediator.NAME");
            YUITest.Assert.isNull(facade.retrieveMediator(Mediator.NAME), "Expecting facade.retrieveMediator( Mediator.NAME ) === null )");
        };
        FacadeTest.prototype.testHasProxy = function () {
            var facade = Facade.getInstance();
            facade.registerProxy(new Proxy('hasProxyTest', [
                1, 
                2, 
                3
            ]));
            YUITest.Assert.isTrue(facade.hasProxy('hasProxyTest'), "Expecting facade.hasProxy('hasProxyTest') === true");
        };
        FacadeTest.prototype.testHasMediator = function () {
            var facade = Facade.getInstance();
            facade.registerMediator(new Mediator('facadeHasMediatorTest', new Object()));
            YUITest.Assert.isTrue(facade.hasMediator('facadeHasMediatorTest'), "Expecting facade.hasMediator('facadeHasMediatorTest') === true");
            facade.removeMediator('facadeHasMediatorTest');
            YUITest.Assert.isFalse(facade.hasMediator('facadeHasMediatorTest'), "Expecting facade.hasMediator('facadeHasMediatorTest') === false");
        };
        FacadeTest.prototype.testHasCommand = function () {
            var facade = Facade.getInstance();
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
            return this.facade instanceof Facade;
        };
        return MediatorTestSub;
    })(Mediator);
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
            var mediator = new Mediator();
            YUITest.Assert.areEqual(Mediator.NAME, mediator.getMediatorName(), "Expecting mediator.getMediatorName() == Mediator.NAME");
        };
        MediatorTest.prototype.testViewAccessor = function () {
            var view = new Object();
            var mediator = new Mediator(Mediator.NAME, view);
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
            var note = new Notification('TestNote');
            YUITest.Assert.areEqual('TestNote', note.getName(), "Expecting note.getName() == 'TestNote'");
        };
        NotificationTest.prototype.testBodyAccessors = function () {
            var note = new Notification(null);
            note.setBody(5);
            YUITest.Assert.areSame(5, note.getBody(), "Expecting note.getBody() === 5");
        };
        NotificationTest.prototype.testConstructor = function () {
            var note = new Notification('TestNote', 5, 'TestNoteType');
            YUITest.Assert.areEqual("TestNote", note.getName(), "Expecting note.getName() == 'TestNote'");
            YUITest.Assert.areSame(5, note.getBody(), "Expecting note.getBody() === 5");
            YUITest.Assert.areEqual("TestNoteType", note.getType(), "Expecting note.getType() == 'TestNoteType'");
        };
        NotificationTest.prototype.testToString = function () {
            var note = new Notification('TestNote', [
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
    })(SimpleCommand);
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
            return this.facade instanceof Facade;
        };
        return NotifierTestSub;
    })(Notifier);
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
            var facade = Facade.getInstance();
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
            var observer = new Observer(null, null);
            observer.setNotifyContext(this);
            observer.setNotifyMethod(this.observerTestMethod);
            var note = new Notification('ObserverTestNote', 10);
            observer.notifyObserver(note);
            YUITest.Assert.areSame(10, this.observerTestVar, "Expecting observerTestVar === 10");
        };
        ObserverTest.prototype.testObserverConstructor = function () {
            var observer = new Observer(this.observerTestMethod, this);
            var note = new Notification('ObserverTestNote', 5);
            observer.notifyObserver(note);
            YUITest.Assert.areSame(5, this.observerTestVar, "Expecting observerTestVar === 5");
        };
        ObserverTest.prototype.testCompareNotifyContext = function () {
            var observer = new Observer(this.observerTestMethod, this);
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
            return this.facade instanceof Facade;
        };
        return ProxyTestSub;
    })(Proxy);
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
            var proxy = new Proxy('colors', [
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
            var proxy = new Proxy('TestProxy');
            YUITest.Assert.areEqual('TestProxy', proxy.getProxyName(), "Expecting proxy.getProxyName() == 'TestProxy'");
        };
        ProxyTest.prototype.testDataAccessors = function () {
            var proxy = new Proxy('colors');
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

