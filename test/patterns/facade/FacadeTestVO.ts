//
//  FacadeTestVO.spec.ts
//  PureMVC TypeScript Multicore
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD-3-Clause License
//

/**
 * A utility class used by FacadeTest.
 *
 * @class FacadeTestVO
 */
export class FacadeTestVO {
  public input: number;
  public result: number = 0;

  /**
   * @constructor
   * @param {number} input the number to be fed to the FacadeTestCommand
   */
  public constructor(input: number) {
    this.input = input;
  }
}
