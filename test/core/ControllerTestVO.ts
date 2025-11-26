//
//  ControllerTestVO.spec.ts
//  PureMVC TypeScript Multicore
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD-3-Clause License
//

/**
 * A utility class used by ControllerTest.
 *
 * @see ControllerTest
 * @see ControllerTestCommand
 *
 * @class ControllerTestVO
 */
export class ControllerTestVO {
  public input: number = 0;
  public result: number = 0;

  /**
   * Constructor
   *
   * @param {number} input
   */
  public constructor(input: number) {
    this.input = input;
  }
}
