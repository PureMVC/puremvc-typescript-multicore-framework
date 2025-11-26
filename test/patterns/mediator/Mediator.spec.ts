//
//  Mediator.spec.ts
//  PureMVC TypeScript Multicore
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD-3-Clause License
//

import { IMediator, Mediator } from "../../../src";

/**
 * Test the PureMVC Mediator class.
 *
 * @see IMediator
 * @see Mediator
 */
describe("MediatorTest", () => {
  /**
   * Tests getting the name using Mediator class accessor method.
   */
  test("testNameAccessor", () => {
    // Create a new Mediator and use accessors to set the mediator name
    const mediator: IMediator = new Mediator();

    // test assertions
    expect(mediator.name).toBe(Mediator.NAME);
  });

  /**
   * Tests getting the name using Mediator class accessor method.
   */
  test("testViewAccessor", () => {
    // Create a view object
    const view: object = {};

    // Create a new Proxy and use accessors to set the proxy name
    const mediator: IMediator = new Mediator(Mediator.NAME, view);

    // test assertions
    expect(mediator.viewComponent).toBe(view);
  });
});
