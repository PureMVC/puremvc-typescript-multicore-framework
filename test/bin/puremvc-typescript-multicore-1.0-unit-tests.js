if( typeof define === "function" )
{
	define( "test", ['YUITest','puremvc'], function(YUITest,puremvc)
	{
        var test;
        (function (test) {
            "use strict";
            var ControllerTestVO = (function () {
                function ControllerTestVO(input) {
                    this.input = 0;
                    this.result = 0;
                    this.input = input;
                }
                return ControllerTestVO;
            })();
            test.ControllerTestVO = ControllerTestVO;    
        })(test || (test = {}));
        
        var __extends = this.__extends || function (d, b) {
            function __() { this.constructor = d; }
            __.prototype = b.prototype;
            d.prototype = new __();
        }
        var test;
        (function (test) {
            "use strict";
            var ControllerTestCommand2 = (function (_super) {
                __extends(ControllerTestCommand2, _super);
                function ControllerTestCommand2() {
                    _super.apply(this, arguments);
        
                }
                ControllerTestCommand2.prototype.execute = function (notification) {
                    var vo = notification.getBody();
                    vo.result = vo.result + (2 * vo.input);
                };
                return ControllerTestCommand2;
            })(puremvc.SimpleCommand);
            test.ControllerTestCommand2 = ControllerTestCommand2;    
        })(test || (test = {}));
        
        var test;
        (function (test) {
            "use strict";
            var ControllerTestCommand = (function (_super) {
                __extends(ControllerTestCommand, _super);
                function ControllerTestCommand() {
                    _super.apply(this, arguments);
        
                }
                ControllerTestCommand.prototype.execute = function (notification) {
                    var vo = notification.getBody();
                    vo.result = 2 * vo.input;
                };
                return ControllerTestCommand;
            })(puremvc.SimpleCommand);
            test.ControllerTestCommand = ControllerTestCommand;    
        })(test || (test = {}));
        
        var test;
        (function (test) {
            "use strict";
            var ControllerTest = (function () {
                function ControllerTest() {
                    this.name = "PureMVC Controller class tests";
                }
                ControllerTest.prototype.testGetInstance = function () {
                    var controller = puremvc.Controller.getInstance('ControllerTestKey1');
                    YUITest.Assert.isNotNull(controller, "Expecting instance !== null");
                    YUITest.Assert.isInstanceOf(puremvc.Controller, controller, "Expecting instance extends Controller");
                    puremvc.Controller.removeController('ControllerTestKey1');
                };
                ControllerTest.prototype.testRegisterAndExecuteCommand = function () {
                    var controller = puremvc.Controller.getInstance('ControllerTestKey2');
                    controller.registerCommand('ControllerTest', test.ControllerTestCommand);
                    var vo = new test.ControllerTestVO(12);
                    var notification = new puremvc.Notification('ControllerTest', vo);
                    controller.executeCommand(notification);
                    YUITest.Assert.areEqual(24, vo.result, "Expecting vo.result == 24");
                    puremvc.Controller.removeController('ControllerTestKey2');
                };
                ControllerTest.prototype.testRegisterAndRemoveCommand = function () {
                    var controller = puremvc.Controller.getInstance('ControllerTestKey3');
                    controller.registerCommand('ControllerRemoveTest', test.ControllerTestCommand);
                    var vo = new test.ControllerTestVO(12);
                    var notification = new puremvc.Notification('ControllerRemoveTest', vo);
                    controller.executeCommand(notification);
                    YUITest.Assert.areEqual(24, vo.result, "Expecting vo.result == 24");
                    vo.result = 0;
                    controller.removeCommand('ControllerRemoveTest');
                    controller.executeCommand(notification);
                    YUITest.Assert.areEqual(0, vo.result, "Expecting vo.result == 0");
                    puremvc.Controller.removeController('ControllerTestKey3');
                };
                ControllerTest.prototype.testHasCommand = function () {
                    var controller = puremvc.Controller.getInstance('ControllerTestKey4');
                    controller.registerCommand('hasCommandTest', test.ControllerTestCommand);
                    YUITest.Assert.isTrue(controller.hasCommand('hasCommandTest'), "Expecting controller.hasCommand('hasCommandTest') === true");
                    controller.removeCommand('hasCommandTest');
                    YUITest.Assert.isFalse(controller.hasCommand('hasCommandTest'), "Expecting controller.hasCommand('hasCommandTest') === false");
                    puremvc.Controller.removeController('ControllerTestKey4');
                };
                ControllerTest.prototype.testReregisterAndExecuteCommand = function () {
                    var controller = puremvc.Controller.getInstance('ControllerTestKey5');
                    controller.registerCommand('ControllerTest2', test.ControllerTestCommand2);
                    controller.removeCommand('ControllerTest2');
                    controller.registerCommand('ControllerTest2', test.ControllerTestCommand2);
                    var vo = new test.ControllerTestVO(12);
                    var notification = new puremvc.Notification('ControllerTest2', vo);
                    var view = puremvc.View.getInstance('ControllerTestKey5');
                    view.notifyObservers(notification);
                    YUITest.Assert.areEqual(24, vo.result, "Expecting vo.result == 24");
                    view.notifyObservers(notification);
                    YUITest.Assert.areEqual(48, vo.result, "Expecting vo.result == 48");
                    puremvc.Controller.removeController('ControllerTestKey5');
                };
                return ControllerTest;
            })();
            test.ControllerTest = ControllerTest;    
        })(test || (test = {}));
        
        var test;
        (function (test) {
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
            test.ModelTestProxy = ModelTestProxy;    
        })(test || (test = {}));
        
        var test;
        (function (test) {
            "use strict";
            var ModelTest = (function () {
                function ModelTest() {
                    this.name = "PureMVC Model class tests";
                }
                ModelTest.prototype.testGetInstance = function () {
                    var model = puremvc.Model.getInstance('ModelTestKey1');
                    YUITest.Assert.isNotNull(model, "Expecting instance !== null");
                    YUITest.Assert.isInstanceOf(puremvc.Model, model, "Expecting instance extends Model");
                    puremvc.Model.removeModel('ModelTestKey1');
                };
                ModelTest.prototype.testRegisterAndRetrieveProxy = function () {
                    var model = puremvc.Model.getInstance('ModelTestKey2');
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
                    puremvc.Model.removeModel('ModelTestKey2');
                };
                ModelTest.prototype.testRegisterAndRemoveProxy = function () {
                    var model = puremvc.Model.getInstance('ModelTestKey3');
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
                    puremvc.Model.removeModel('ModelTestKey3');
                };
                ModelTest.prototype.testHasProxy = function () {
                    var model = puremvc.Model.getInstance('ModelTestKey4');
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
                    puremvc.Model.removeModel('ModelTestKey4');
                };
                ModelTest.prototype.testOnRegisterAndOnRemove = function () {
                    var model = puremvc.Model.getInstance('ModelTestKey5');
                    var proxy = new test.ModelTestProxy();
                    model.registerProxy(proxy);
                    YUITest.Assert.areEqual(test.ModelTestProxy.ON_REGISTER_CALLED, proxy.getData(), "Expecting proxy.getData() == ModelTestProxy.ON_REGISTER_CALLED");
                    model.removeProxy(test.ModelTestProxy.NAME);
                    YUITest.Assert.areEqual(test.ModelTestProxy.ON_REMOVE_CALLED, proxy.getData(), "Expecting proxy.getData() == ModelTestProxy.ON_REMOVE_CALLED");
                    puremvc.Model.removeModel('ModelTestKey5');
                };
                return ModelTest;
            })();
            test.ModelTest = ModelTest;    
        })(test || (test = {}));
        
        var test;
        (function (test) {
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
            test.ViewTestMediator = ViewTestMediator;    
        })(test || (test = {}));
        
        var test;
        (function (test) {
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
                        test.ViewTest.NOTE1, 
                        test.ViewTest.NOTE2
                    ];
                };
                ViewTestMediator2.prototype.handleNotification = function (notification) {
                    this.getViewTest().lastNotification = notification.getName();
                };
                ViewTestMediator2.NAME = 'ViewTestMediator2';
                return ViewTestMediator2;
            })(puremvc.Mediator);
            test.ViewTestMediator2 = ViewTestMediator2;    
        })(test || (test = {}));
        
        var test;
        (function (test) {
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
                        test.ViewTest.NOTE3
                    ];
                };
                ViewTestMediator3.prototype.handleNotification = function (notification) {
                    this.getViewTest().lastNotification = notification.getName();
                };
                ViewTestMediator3.NAME = 'ViewTestMediator3';
                return ViewTestMediator3;
            })(puremvc.Mediator);
            test.ViewTestMediator3 = ViewTestMediator3;    
        })(test || (test = {}));
        
        var test;
        (function (test) {
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
            test.ViewTestMediator4 = ViewTestMediator4;    
        })(test || (test = {}));
        
        var test;
        (function (test) {
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
                        test.ViewTest.NOTE5
                    ];
                };
                ViewTestMediator5.prototype.handleNotification = function (notification) {
                    this.getViewTest().counter++;
                };
                ViewTestMediator5.NAME = 'ViewTestMediator5';
                return ViewTestMediator5;
            })(puremvc.Mediator);
            test.ViewTestMediator5 = ViewTestMediator5;    
        })(test || (test = {}));
        
        var test;
        (function (test) {
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
                        test.ViewTest.NOTE6
                    ];
                };
                ViewTestMediator6.prototype.handleNotification = function (notification) {
                    this.facade().removeMediator(this.getMediatorName());
                };
                ViewTestMediator6.prototype.onRemove = function () {
                    this.getViewTest().counter++;
                };
                ViewTestMediator6.NAME = 'ViewTestMediator6';
                return ViewTestMediator6;
            })(puremvc.Mediator);
            test.ViewTestMediator6 = ViewTestMediator6;    
        })(test || (test = {}));
        
        var test;
        (function (test) {
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
            test.ViewTestNote = ViewTestNote;    
        })(test || (test = {}));
        
        var test;
        (function (test) {
            "use strict";
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
                    var view = puremvc.View.getInstance('ViewTestKey1');
                    YUITest.Assert.isNotNull(view, "Expecting instance !== null");
                    YUITest.Assert.isInstanceOf(puremvc.View, view, "Expecting instance implements View");
                    puremvc.View.removeView('ViewTestKey1');
                };
                ViewTest.prototype.testRegisterAndNotifyObserver = function () {
                    var view = puremvc.View.getInstance('ViewTestKey2');
                    var observer = new puremvc.Observer(this.viewTestMethod, this);
                    view.registerObserver(test.ViewTestNote.NAME, observer);
                    var notification = test.ViewTestNote.create(10);
                    view.notifyObservers(notification);
                    YUITest.Assert.areEqual(10, this.viewTestVar, "Expecting viewTestVar = 10");
                    puremvc.View.removeView('ViewTestKey2');
                };
                ViewTest.prototype.viewTestMethod = function (notification) {
                    this.viewTestVar = notification.getBody();
                };
                ViewTest.prototype.testRegisterAndRetrieveMediator = function () {
                    var view = puremvc.View.getInstance('ViewTestKey3');
                    var viewTestMediator = new test.ViewTestMediator(this);
                    view.registerMediator(viewTestMediator);
                    var mediator = view.retrieveMediator(test.ViewTestMediator.NAME);
                    YUITest.Assert.isInstanceOf(test.ViewTestMediator, mediator, "Expecting comp is ViewTestMediator");
                    puremvc.View.removeView('ViewTestKey3');
                };
                ViewTest.prototype.testHasMediator = function () {
                    var view = puremvc.View.getInstance('ViewTestKey4');
                    var mediator = new puremvc.Mediator('hasMediatorTest', this);
                    view.registerMediator(mediator);
                    YUITest.Assert.isTrue(view.hasMediator('hasMediatorTest'), "Expecting view.hasMediator('hasMediatorTest') === true");
                    view.removeMediator('hasMediatorTest');
                    YUITest.Assert.isFalse(view.hasMediator('hasMediatorTest'), "Expecting view.hasMediator('hasMediatorTest') === false");
                    puremvc.View.removeView('ViewTestKey4');
                };
                ViewTest.prototype.testRegisterAndRemoveMediator = function () {
                    var view = puremvc.View.getInstance('ViewTestKey5');
                    var mediator = new puremvc.Mediator('testing', this);
                    view.registerMediator(mediator);
                    var removedMediator = view.removeMediator('testing');
                    YUITest.Assert.areEqual('testing', removedMediator.getMediatorName(), "Expecting removedMediator.getMediatorName() == 'testing'");
                    var retrievedMediator = view.retrieveMediator('testing');
                    YUITest.Assert.isNull(retrievedMediator, "Expecting view.retrieveMediator( 'testing' ) === null )");
                    puremvc.View.removeView('ViewTestKey5');
                };
                ViewTest.prototype.testOnRegisterAndOnRemove = function () {
                    var view = puremvc.View.getInstance('ViewTestKey6');
                    var mediator = new test.ViewTestMediator4(this);
                    view.registerMediator(mediator);
                    YUITest.Assert.isTrue(this.onRegisterCalled, "Expecting onRegisterCalled === true");
                    view.removeMediator(test.ViewTestMediator4.NAME);
                    YUITest.Assert.isTrue(this.onRemoveCalled, "Expecting onRemoveCalled === true");
                    puremvc.View.removeView('ViewTestKey6');
                };
                ViewTest.prototype.testSuccessiveRegisterAndRemoveMediator = function () {
                    var view = puremvc.View.getInstance('ViewTestKey7');
                    view.registerMediator(new test.ViewTestMediator(this));
                    YUITest.Assert.isInstanceOf(test.ViewTestMediator, view.retrieveMediator(test.ViewTestMediator.NAME), "Expecting view.retrieveMediator( ViewTestMediator.NAME ) isInstanceOf ViewTestMediator");
                    view.removeMediator(test.ViewTestMediator.NAME);
                    YUITest.Assert.isNull(view.retrieveMediator(test.ViewTestMediator.NAME), "Expecting view.retrieveMediator( ViewTestMediator.NAME ) === null");
                    YUITest.Assert.isNull(view.removeMediator(test.ViewTestMediator.NAME), "Expecting view.removeMediator( ViewTestMediator.NAME ) === null");
                    view.registerMediator(new test.ViewTestMediator(this));
                    YUITest.Assert.isInstanceOf(test.ViewTestMediator, view.retrieveMediator(test.ViewTestMediator.NAME), "Expecting view.retrieveMediator( ViewTestMediator.NAME ) is ViewTestMediator");
                    view.removeMediator(test.ViewTestMediator.NAME);
                    YUITest.Assert.isNull(view.retrieveMediator(test.ViewTestMediator.NAME), "Expecting view.retrieveMediator( ViewTestMediator.NAME ) === null");
                    puremvc.View.removeView('ViewTestKey7');
                };
                ViewTest.prototype.testRemoveMediatorAndSubsequentNotify = function () {
                    var view = puremvc.View.getInstance('ViewTestKey8');
                    view.registerMediator(new test.ViewTestMediator2(this));
                    view.notifyObservers(new puremvc.Notification(ViewTest.NOTE1));
                    YUITest.Assert.areEqual(ViewTest.NOTE1, this.lastNotification, "Expecting lastNotification == NOTE1");
                    view.notifyObservers(new puremvc.Notification(ViewTest.NOTE2));
                    YUITest.Assert.areEqual(ViewTest.NOTE2, this.lastNotification, "Expecting lastNotification == NOTE2");
                    view.removeMediator(test.ViewTestMediator2.NAME);
                    YUITest.Assert.isNull(view.retrieveMediator(test.ViewTestMediator2.NAME), "Expecting view.retrieveMediator( ViewTestMediator2.NAME ) === null");
                    this.lastNotification = null;
                    view.notifyObservers(new puremvc.Notification(ViewTest.NOTE1));
                    YUITest.Assert.areNotEqual(ViewTest.NOTE1, this.lastNotification, "Expecting lastNotification != NOTE1");
                    view.notifyObservers(new puremvc.Notification(ViewTest.NOTE2));
                    YUITest.Assert.areNotEqual(ViewTest.NOTE2, this.lastNotification, "Expecting lastNotification != NOTE2");
                    puremvc.View.removeView('ViewTestKey8');
                };
                ViewTest.prototype.testRemoveOneOfTwoMediatorsAndSubsequentNotify = function () {
                    var view = puremvc.View.getInstance('ViewTestKey9');
                    view.registerMediator(new test.ViewTestMediator2(this));
                    view.registerMediator(new test.ViewTestMediator3(this));
                    view.notifyObservers(new puremvc.Notification(ViewTest.NOTE1));
                    YUITest.Assert.areEqual(ViewTest.NOTE1, this.lastNotification, "Expecting lastNotification == NOTE1");
                    view.notifyObservers(new puremvc.Notification(ViewTest.NOTE2));
                    YUITest.Assert.areEqual(ViewTest.NOTE2, this.lastNotification, "Expecting lastNotification == NOTE2");
                    view.notifyObservers(new puremvc.Notification(ViewTest.NOTE3));
                    YUITest.Assert.areEqual(ViewTest.NOTE3, this.lastNotification, "Expecting lastNotification == NOTE3");
                    view.removeMediator(test.ViewTestMediator2.NAME);
                    YUITest.Assert.isNull(view.retrieveMediator(test.ViewTestMediator2.NAME), "Expecting view.retrieveMediator( ViewTestMediator2.NAME ) === null");
                    this.lastNotification = null;
                    view.notifyObservers(new puremvc.Notification(ViewTest.NOTE1));
                    YUITest.Assert.areNotEqual(ViewTest.NOTE1, this.lastNotification, "Expecting lastNotification != NOTE1");
                    view.notifyObservers(new puremvc.Notification(ViewTest.NOTE2));
                    YUITest.Assert.areNotEqual(ViewTest.NOTE2, this.lastNotification, "Expecting lastNotification != NOTE2");
                    view.notifyObservers(new puremvc.Notification(ViewTest.NOTE3));
                    YUITest.Assert.areEqual(ViewTest.NOTE3, this.lastNotification, "Expecting lastNotification == NOTE3");
                    puremvc.View.removeView('ViewTestKey9');
                };
                ViewTest.prototype.testMediatorReregistration = function () {
                    var view = puremvc.View.getInstance('ViewTestKey10');
                    view.registerMediator(new test.ViewTestMediator5(this));
                    view.registerMediator(new test.ViewTestMediator5(this));
                    this.counter = 0;
                    view.notifyObservers(new puremvc.Notification(ViewTest.NOTE5));
                    YUITest.Assert.areEqual(1, this.counter, "Expecting counter == 1");
                    view.removeMediator(test.ViewTestMediator5.NAME);
                    YUITest.Assert.isNull(view.retrieveMediator(test.ViewTestMediator5.NAME), "Expecting view.retrieveMediator( ViewTestMediator5.NAME ) === null");
                    this.counter = 0;
                    view.notifyObservers(new puremvc.Notification(ViewTest.NOTE5));
                    YUITest.Assert.areEqual(0, this.counter, "Expecting counter == 0");
                    puremvc.View.removeView('ViewTestKey10');
                };
                ViewTest.prototype.testModifyObserverListDuringNotification = function () {
                    var view = puremvc.View.getInstance('ViewTestKey11');
                    view.registerMediator(new test.ViewTestMediator6(test.ViewTestMediator6.NAME + "/1", this));
                    view.registerMediator(new test.ViewTestMediator6(test.ViewTestMediator6.NAME + "/2", this));
                    view.registerMediator(new test.ViewTestMediator6(test.ViewTestMediator6.NAME + "/3", this));
                    view.registerMediator(new test.ViewTestMediator6(test.ViewTestMediator6.NAME + "/4", this));
                    view.registerMediator(new test.ViewTestMediator6(test.ViewTestMediator6.NAME + "/5", this));
                    view.registerMediator(new test.ViewTestMediator6(test.ViewTestMediator6.NAME + "/6", this));
                    view.registerMediator(new test.ViewTestMediator6(test.ViewTestMediator6.NAME + "/7", this));
                    view.registerMediator(new test.ViewTestMediator6(test.ViewTestMediator6.NAME + "/8", this));
                    this.counter = 0;
                    view.notifyObservers(new puremvc.Notification(ViewTest.NOTE6));
                    YUITest.Assert.areEqual(8, this.counter, "Expecting counter == 8");
                    this.counter = 0;
                    view.notifyObservers(new puremvc.Notification(ViewTest.NOTE6));
                    YUITest.Assert.areEqual(0, this.counter, "Expecting counter == 0");
                    puremvc.View.removeView('ViewTestKey11');
                };
                ViewTest.NOTE1 = "Notification1";
                ViewTest.NOTE2 = "Notification2";
                ViewTest.NOTE3 = "Notification3";
                ViewTest.NOTE4 = "Notification4";
                ViewTest.NOTE5 = "Notification5";
                ViewTest.NOTE6 = "Notification6";
                return ViewTest;
            })();
            test.ViewTest = ViewTest;    
        })(test || (test = {}));
        
        var test;
        (function (test) {
            "use strict";
            var MacroCommandTestSub = (function (_super) {
                __extends(MacroCommandTestSub, _super);
                function MacroCommandTestSub() {
                    _super.apply(this, arguments);
        
                }
                MacroCommandTestSub.prototype.hasFacade = function () {
                    return this.facade() instanceof puremvc.Facade;
                };
                return MacroCommandTestSub;
            })(puremvc.MacroCommand);
            test.MacroCommandTestSub = MacroCommandTestSub;    
        })(test || (test = {}));
        
        var test;
        (function (test) {
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
            test.MacroCommandTestVO = MacroCommandTestVO;    
        })(test || (test = {}));
        
        var test;
        (function (test) {
            "use strict";
            var MacroCommandTestSub1Command = (function (_super) {
                __extends(MacroCommandTestSub1Command, _super);
                function MacroCommandTestSub1Command() {
                    _super.apply(this, arguments);
        
                }
                MacroCommandTestSub1Command.prototype.execute = function (notification) {
                    var vo = notification.getBody();
                    vo.result1 = 2 * vo.input;
                };
                return MacroCommandTestSub1Command;
            })(puremvc.SimpleCommand);
            test.MacroCommandTestSub1Command = MacroCommandTestSub1Command;    
        })(test || (test = {}));
        
        var test;
        (function (test) {
            "use strict";
            var MacroCommandTestSub2Command = (function (_super) {
                __extends(MacroCommandTestSub2Command, _super);
                function MacroCommandTestSub2Command() {
                    _super.apply(this, arguments);
        
                }
                MacroCommandTestSub2Command.prototype.execute = function (notification) {
                    var vo = notification.getBody();
                    vo.result2 = vo.input * vo.input;
                };
                return MacroCommandTestSub2Command;
            })(puremvc.SimpleCommand);
            test.MacroCommandTestSub2Command = MacroCommandTestSub2Command;    
        })(test || (test = {}));
        
        var test;
        (function (test) {
            "use strict";
            var MacroCommandTestCommand = (function (_super) {
                __extends(MacroCommandTestCommand, _super);
                function MacroCommandTestCommand() {
                    _super.apply(this, arguments);
        
                }
                MacroCommandTestCommand.prototype.initializeMacroCommand = function () {
                    this.addSubCommand(test.MacroCommandTestSub1Command);
                    this.addSubCommand(test.MacroCommandTestSub2Command);
                };
                return MacroCommandTestCommand;
            })(puremvc.MacroCommand);
            test.MacroCommandTestCommand = MacroCommandTestCommand;    
        })(test || (test = {}));
        
        var test;
        (function (test) {
            "use strict";
            var MacroCommandTest = (function () {
                function MacroCommandTest() {
                    this.name = "PureMVC MacroCommmand class tests";
                }
                MacroCommandTest.prototype.testConstructor = function () {
                    var macroCommandTestSub = new test.MacroCommandTestSub();
                    macroCommandTestSub.initializeNotifier("macroCommandTestKey1");
                    YUITest.Assert.isTrue(macroCommandTestSub.hasFacade(), "Expecting macroCommandTestSub.hasFacade() === true");
                };
                MacroCommandTest.prototype.testMacroCommandExecute = function () {
                    var vo = new test.MacroCommandTestVO(5);
                    var notification = new puremvc.Notification('MacroCommandTest', vo);
                    var command = new test.MacroCommandTestCommand();
                    command.execute(notification);
                    YUITest.Assert.areEqual(10, vo.result1, "Expecting vo.result1 == 10");
                    YUITest.Assert.areEqual(25, vo.result2, "Expecting vo.result2 == 25");
                };
                return MacroCommandTest;
            })();
            test.MacroCommandTest = MacroCommandTest;    
        })(test || (test = {}));
        
        var test;
        (function (test) {
            "use strict";
            var SimpleCommandTestVO = (function () {
                function SimpleCommandTestVO(input) {
                    this.input = null;
                    this.result = null;
                    this.input = input;
                }
                return SimpleCommandTestVO;
            })();
            test.SimpleCommandTestVO = SimpleCommandTestVO;    
        })(test || (test = {}));
        
        var test;
        (function (test) {
            "use strict";
            var SimpleCommandTestCommand = (function (_super) {
                __extends(SimpleCommandTestCommand, _super);
                function SimpleCommandTestCommand() {
                    _super.apply(this, arguments);
        
                }
                SimpleCommandTestCommand.prototype.execute = function (notification) {
                    var vo = notification.getBody();
                    vo.result = 2 * vo.input;
                };
                return SimpleCommandTestCommand;
            })(puremvc.SimpleCommand);
            test.SimpleCommandTestCommand = SimpleCommandTestCommand;    
        })(test || (test = {}));
        
        var test;
        (function (test) {
            "use strict";
            var SimpleCommandTestSub = (function (_super) {
                __extends(SimpleCommandTestSub, _super);
                function SimpleCommandTestSub() {
                    _super.apply(this, arguments);
        
                }
                SimpleCommandTestSub.prototype.hasFacade = function () {
                    return this.facade() instanceof puremvc.Facade;
                };
                return SimpleCommandTestSub;
            })(puremvc.SimpleCommand);
            test.SimpleCommandTestSub = SimpleCommandTestSub;    
        })(test || (test = {}));
        
        var test;
        (function (test) {
            "use strict";
            var SimpleCommandTest = (function () {
                function SimpleCommandTest() {
                    this.name = "PureMVC SimpleCommand class Tests";
                }
                SimpleCommandTest.prototype.testConstructor = function () {
                    var simpleCommandTestSub = new test.SimpleCommandTestSub();
                    simpleCommandTestSub.initializeNotifier("SimpleCommandTestKey1");
                    YUITest.Assert.isTrue(simpleCommandTestSub.hasFacade(), "Expecting simpleCommandTestSub.hasFacade() === true");
                };
                SimpleCommandTest.prototype.testSimpleCommandExecute = function () {
                    var vo = new test.SimpleCommandTestVO(5);
                    var notification = new puremvc.Notification('SimpleCommandTestNote', vo);
                    var command = new test.SimpleCommandTestCommand();
                    command.execute(notification);
                    YUITest.Assert.areEqual(10, vo.result, "Expecting vo.result == 10");
                };
                return SimpleCommandTest;
            })();
            test.SimpleCommandTest = SimpleCommandTest;    
        })(test || (test = {}));
        
        var test;
        (function (test) {
            "use strict";
            var FacadeTestVO = (function () {
                function FacadeTestVO(input) {
                    this.input = null;
                    this.result = null;
                    this.input = input;
                }
                return FacadeTestVO;
            })();
            test.FacadeTestVO = FacadeTestVO;    
        })(test || (test = {}));
        
        var test;
        (function (test) {
            "use strict";
            var FacadeTestCommand = (function (_super) {
                __extends(FacadeTestCommand, _super);
                function FacadeTestCommand() {
                    _super.apply(this, arguments);
        
                }
                FacadeTestCommand.prototype.execute = function (notification) {
                    var vo = notification.getBody();
                    vo.result = 2 * vo.input;
                };
                return FacadeTestCommand;
            })(puremvc.SimpleCommand);
            test.FacadeTestCommand = FacadeTestCommand;    
        })(test || (test = {}));
        
        var test;
        (function (test) {
            "use strict";
            var FacadeTest = (function () {
                function FacadeTest() {
                    this.name = "PureMVC Facade class tests";
                }
                FacadeTest.prototype.testGetInstance = function () {
                    var facade = puremvc.Facade.getInstance('FacadeTestKey1');
                    YUITest.Assert.isNotUndefined(facade, "Expecting facade not to be undefined");
                    YUITest.Assert.isInstanceOf(puremvc.Facade, facade, "Expecting instance is instance of Facade");
                };
                FacadeTest.prototype.testRegisterCommandAndSendNotification = function () {
                    var facade = puremvc.Facade.getInstance('FacadeTestKey2');
                    facade.registerCommand('FacadeTestNote', test.FacadeTestCommand);
                    var vo = new test.FacadeTestVO(32);
                    facade.sendNotification('FacadeTestNote', vo);
                    YUITest.Assert.areEqual(64, vo.result, "Expecting vo.result == 64");
                };
                FacadeTest.prototype.testRegisterAndRemoveCommandAndSendNotification = function () {
                    var facade = puremvc.Facade.getInstance('FacadeTestKey3');
                    facade.registerCommand('FacadeTestNote', test.FacadeTestCommand);
                    facade.removeCommand('FacadeTestNote');
                    var vo = new test.FacadeTestVO(32);
                    facade.sendNotification('FacadeTestNote', vo);
                    YUITest.Assert.areNotEqual(64, vo.result, "Expecting vo.result != 64");
                };
                FacadeTest.prototype.testRegisterAndRetrieveProxy = function () {
                    var facade = puremvc.Facade.getInstance('FacadeTestKey4');
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
                    var facade = puremvc.Facade.getInstance('FacadeTestKey5');
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
                    var facade = puremvc.Facade.getInstance('FacadeTestKey6');
                    facade.registerMediator(new puremvc.Mediator(puremvc.Mediator.NAME, new Object()));
                    YUITest.Assert.isNotNull(facade.retrieveMediator(puremvc.Mediator.NAME), "Expecting facade.retrieveMediator( puremvc.Mediator.NAME ) !== null");
                    var removedMediator = facade.removeMediator(puremvc.Mediator.NAME);
                    YUITest.Assert.areEqual(puremvc.Mediator.NAME, removedMediator ? removedMediator.getMediatorName() : null, "Expecting removedMediator.getMediatorName() == Mediator.NAME");
                    YUITest.Assert.isNull(facade.retrieveMediator(puremvc.Mediator.NAME), "Expecting facade.retrieveMediator( Mediator.NAME ) === null )");
                };
                FacadeTest.prototype.testHasProxy = function () {
                    var facade = puremvc.Facade.getInstance('FacadeTestKey7');
                    facade.registerProxy(new puremvc.Proxy('hasProxyTest', [
                        1, 
                        2, 
                        3
                    ]));
                    YUITest.Assert.isTrue(facade.hasProxy('hasProxyTest'), "Expecting facade.hasProxy('hasProxyTest') === true");
                };
                FacadeTest.prototype.testHasMediator = function () {
                    var facade = puremvc.Facade.getInstance('FacadeTestKey8');
                    facade.registerMediator(new puremvc.Mediator('facadeHasMediatorTest', new Object()));
                    YUITest.Assert.isTrue(facade.hasMediator('facadeHasMediatorTest'), "Expecting facade.hasMediator('facadeHasMediatorTest') === true");
                    facade.removeMediator('facadeHasMediatorTest');
                    YUITest.Assert.isFalse(facade.hasMediator('facadeHasMediatorTest'), "Expecting facade.hasMediator('facadeHasMediatorTest') === false");
                };
                FacadeTest.prototype.testHasCommand = function () {
                    var facade = puremvc.Facade.getInstance('FacadeTestKey10');
                    facade.registerCommand('facadeHasCommandTest', test.FacadeTestCommand);
                    YUITest.Assert.isTrue(facade.hasCommand('facadeHasCommandTest'), "Expecting facade.hasCommand('facadeHasCommandTest') === true");
                    facade.removeCommand('facadeHasCommandTest');
                    YUITest.Assert.isFalse(facade.hasCommand('facadeHasCommandTest'), "Expecting facade.hasCommand('facadeHasCommandTest') === false");
                };
                FacadeTest.prototype.testHasCoreAndRemoveCore = function () {
                    YUITest.Assert.isFalse(puremvc.Facade.hasCore('FacadeTestKey11'), "Expecting Facade.hasCore('FacadeTestKey11') === false");
                    var facade = puremvc.Facade.getInstance('FacadeTestKey11');
                    YUITest.Assert.isTrue(puremvc.Facade.hasCore('FacadeTestKey11'), "Expecting Facade.hasCore('FacadeTestKey11') === true");
                    puremvc.Facade.removeCore('FacadeTestKey11');
                    YUITest.Assert.isFalse(puremvc.Facade.hasCore('FacadeTestKey11'), "Expecting Facade.hasCore('FacadeTestKey11') === false");
                };
                return FacadeTest;
            })();
            test.FacadeTest = FacadeTest;    
        })(test || (test = {}));
        
        var test;
        (function (test) {
            "use strict";
            var MediatorTestSub = (function (_super) {
                __extends(MediatorTestSub, _super);
                function MediatorTestSub() {
                    _super.apply(this, arguments);
        
                }
                MediatorTestSub.prototype.hasFacade = function () {
                    return this.facade() instanceof puremvc.Facade;
                };
                return MediatorTestSub;
            })(puremvc.Mediator);
            test.MediatorTestSub = MediatorTestSub;    
        })(test || (test = {}));
        
        var test;
        (function (test) {
            "use strict";
            var MediatorTest = (function () {
                function MediatorTest() {
                    this.name = "PureMVC Mediator class tests";
                }
                MediatorTest.prototype.testConstructor = function () {
                    var mediatorTestSub = new test.MediatorTestSub();
                    mediatorTestSub.initializeNotifier('MediatorTestKey1');
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
            test.MediatorTest = MediatorTest;    
        })(test || (test = {}));
        
        var test;
        (function (test) {
            "use strict";
            var NotificationTest = (function () {
                function NotificationTest() {
                    this.name = "PureMVC Notification class tests";
                }
                NotificationTest.prototype.testNameAccessors = function () {
                    var notification = new puremvc.Notification('TestNote');
                    YUITest.Assert.areEqual('TestNote', notification.getName(), "Expecting notification.getName() == 'TestNote'");
                };
                NotificationTest.prototype.testBodyAccessors = function () {
                    var notification = new puremvc.Notification(null);
                    notification.setBody(5);
                    YUITest.Assert.areSame(5, notification.getBody(), "Expecting notification.getBody() === 5");
                };
                NotificationTest.prototype.testConstructor = function () {
                    var notification = new puremvc.Notification('TestNote', 5, 'TestNoteType');
                    YUITest.Assert.areEqual("TestNote", notification.getName(), "Expecting notification.getName() == 'TestNote'");
                    YUITest.Assert.areSame(5, notification.getBody(), "Expecting notification.getBody() === 5");
                    YUITest.Assert.areEqual("TestNoteType", notification.getType(), "Expecting notification.getType() == 'TestNoteType'");
                };
                NotificationTest.prototype.testToString = function () {
                    var notification = new puremvc.Notification('TestNote', [
                        1, 
                        3, 
                        5
                    ], 'TestType');
                    var ts = "Notification Name: TestNote\nBody:1,3,5\nType:TestType";
                    YUITest.Assert.areEqual(ts, notification.toString(), "Expecting notification.testToString() == '" + ts + "'");
                };
                return NotificationTest;
            })();
            test.NotificationTest = NotificationTest;    
        })(test || (test = {}));
        
        var test;
        (function (test) {
            "use strict";
            var NotifierTestVO = (function () {
                function NotifierTestVO(input) {
                    this.input = null;
                    this.result = null;
                    this.input = input;
                }
                return NotifierTestVO;
            })();
            test.NotifierTestVO = NotifierTestVO;    
        })(test || (test = {}));
        
        var test;
        (function (test) {
            "use strict";
            var NotifierTestCommand = (function (_super) {
                __extends(NotifierTestCommand, _super);
                function NotifierTestCommand() {
                    _super.apply(this, arguments);
        
                }
                NotifierTestCommand.prototype.execute = function (notification) {
                    var vo = notification.getBody();
                    vo.result = 2 * vo.input;
                };
                return NotifierTestCommand;
            })(puremvc.SimpleCommand);
            test.NotifierTestCommand = NotifierTestCommand;    
        })(test || (test = {}));
        
        var test;
        (function (test) {
            "use strict";
            var NotifierTestSub = (function (_super) {
                __extends(NotifierTestSub, _super);
                function NotifierTestSub() {
                    _super.apply(this, arguments);
        
                }
                NotifierTestSub.prototype.hasFacade = function () {
                    return this.facade() instanceof puremvc.Facade;
                };
                return NotifierTestSub;
            })(puremvc.Notifier);
            test.NotifierTestSub = NotifierTestSub;    
        })(test || (test = {}));
        
        var test;
        (function (test) {
            "use strict";
            var NotifierTest = (function () {
                function NotifierTest() {
                    this.name = "PureMVC Notifier class tests";
                }
                NotifierTest.prototype.testConstructor = function () {
                    var notifierTestSub = new test.NotifierTestSub();
                    notifierTestSub.initializeNotifier('NotifierTestKey1');
                    YUITest.Assert.isTrue(notifierTestSub.hasFacade(), "Expecting notifierTestSub.hasFacade() === true");
                };
                NotifierTest.prototype.testSendNotification = function () {
                    var facade = puremvc.Facade.getInstance('NotifierTestKey2');
                    facade.registerCommand('NotifierTestNote', test.NotifierTestCommand);
                    var vo = new test.NotifierTestVO(32);
                    facade.sendNotification('NotifierTestNote', vo);
                    YUITest.Assert.areEqual(64, vo.result, "Expecting vo.result == 64");
                };
                return NotifierTest;
            })();
            test.NotifierTest = NotifierTest;    
        })(test || (test = {}));
        
        var test;
        (function (test) {
            "use strict";
            var ObserverTest = (function () {
                function ObserverTest() {
                    this.name = "PureMVC Observer class tests";
                    this.observerTestVar = -1;
                }
                ObserverTest.prototype.testObserverAccessors = function () {
                    var observer = new puremvc.Observer(null, null);
                    observer.setNotifyContext(this);
                    observer.setNotifyMethod(this.observerTestMethod);
                    var notification = new puremvc.Notification('ObserverTestNote', 10);
                    observer.notifyObserver(notification);
                    YUITest.Assert.areSame(10, this.observerTestVar, "Expecting observerTestVar === 10");
                };
                ObserverTest.prototype.testObserverConstructor = function () {
                    var observer = new puremvc.Observer(this.observerTestMethod, this);
                    var notification = new puremvc.Notification('ObserverTestNote', 5);
                    observer.notifyObserver(notification);
                    YUITest.Assert.areSame(5, this.observerTestVar, "Expecting observerTestVar === 5");
                };
                ObserverTest.prototype.testCompareNotifyContext = function () {
                    var observer = new puremvc.Observer(this.observerTestMethod, this);
                    var negTestObj = new Object();
                    YUITest.Assert.isFalse(observer.compareNotifyContext(negTestObj), "Expecting observer.compareNotifyContext(negTestObj) === false");
                    YUITest.Assert.isTrue(observer.compareNotifyContext(this), "Expecting observer.compareNotifyContext(this) === true");
                };
                ObserverTest.prototype.observerTestMethod = function (notification) {
                    this.observerTestVar = notification.getBody();
                };
                return ObserverTest;
            })();
            test.ObserverTest = ObserverTest;    
        })(test || (test = {}));
        
        var test;
        (function (test) {
            "use strict";
            var ProxyTestSub = (function (_super) {
                __extends(ProxyTestSub, _super);
                function ProxyTestSub() {
                    _super.apply(this, arguments);
        
                }
                ProxyTestSub.prototype.hasFacade = function () {
                    return this.facade() instanceof puremvc.Facade;
                };
                return ProxyTestSub;
            })(puremvc.Proxy);
            test.ProxyTestSub = ProxyTestSub;    
        })(test || (test = {}));
        
        var test;
        (function (test) {
            "use strict";
            var ProxyTest = (function () {
                function ProxyTest() {
                    this.name = "PureMVC Proxy class tests";
                }
                ProxyTest.prototype.testConstructorInitialization = function () {
                    var proxyTestSub = new test.ProxyTestSub();
                    proxyTestSub.initializeNotifier("key");
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
            test.ProxyTest = ProxyTest;    
        })(test || (test = {}));
        
        
		return test;
	});
}