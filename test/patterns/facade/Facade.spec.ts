//
//  Facade.spec.ts
//  PureMVC TypeScript Multicore
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD-3-Clause License
//

import { Facade, IProxy, Proxy, Mediator } from "../../../src";
import { FacadeTestCommand } from "./FacadeTestCommand";
import { FacadeTestVO } from "./FacadeTestVO";

/**
 * Test the PureMVC Facade class.
 *
 * @see FacadeTestVO
 * @see FacadeTestCommand
 */
describe("FacadeTest", () => {
  // Test for duplicate Facade instance
  test("testFacadeConstructorWithExistingKeyThrowsError", () => {
    const key = "DuplicateFacadeKey";
    Facade.getInstance(key, (k) => new Facade(k));

    expect(() => new Facade(key)).toThrowError(
      "Facade instance for this Multiton key already constructed!",
    );
  });

  // Test initialization indirectly through function
  test("testInitializeComponents", () => {
    const facade = Facade.getInstance("ComponentInitKey", (k) => new Facade(k));

    // Using public methods indirectly
    facade.registerProxy(new Proxy("testProxy", {}));
    expect(facade.hasProxy("testProxy")).toBe(true);

    facade.registerCommand("testCommand", () => new FacadeTestCommand());
    expect(facade.hasCommand("testCommand")).toBe(true);
  });

  // Test command registration and execution
  test("testRegisterAndExecuteCommandViaFacade", () => {
    const facade = Facade.getInstance(
      "CommandViaFacadeKey",
      (k) => new Facade(k),
    );

    facade.registerCommand("TestNote", () => new FacadeTestCommand());
    const vo = new FacadeTestVO(10);
    facade.sendNotification("TestNote", vo);

    expect(vo.result).toBe(20);
  });

  // Test proxy management
  test("testProxyManagement", () => {
    const facade = Facade.getInstance(
      "ProxyManagementKey",
      (k) => new Facade(k),
    );

    const proxy: IProxy = new Proxy("myProxy", { data: "test" });
    facade.registerProxy(proxy);
    expect(facade.retrieveProxy("myProxy")).toBe(proxy);

    // Test hasProxy
    expect(facade.hasProxy("myProxy")).toBe(true);

    // Remove and test
    facade.removeProxy("myProxy");
    expect(facade.retrieveProxy("myProxy")).toBe(null);
  });

  // Test mediator management
  test("testMediatorManagement", () => {
    const facade = Facade.getInstance(
      "MediatorManagementKey",
      (k) => new Facade(k),
    );

    const mediator: Mediator = new Mediator("myMediator", {});
    facade.registerMediator(mediator);
    expect(facade.retrieveMediator("myMediator")).toBe(mediator);

    // Test hasMediator
    expect(facade.hasMediator("myMediator")).toBe(true);

    // Remove and test
    facade.removeMediator("myMediator");
    expect(facade.retrieveMediator("myMediator")).toBe(null);
  });

  // Test core management
  test("testHasCoreAndRemoveCore", () => {
    const key = "CoreManagementKey";
    Facade.getInstance(key, (k) => new Facade(k));

    expect(Facade.hasCore(key)).toBe(true);

    Facade.removeCore(key);

    expect(Facade.hasCore(key)).toBe(false);
  });
});
