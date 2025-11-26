//
//  MacroCommandTestVO.spec.ts
//  PureMVC TypeScript Multicore
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD-3-Clause License
//

/**
 * A utility class used by MacroCommandTest.
 *
 * @see MacroCommandTest
 * @see MacroCommandTestCommand
 * @see MacroCommandTestSub1Command
 * @see MacroCommandTestSub2Command
 *
 * @class MacroCommandTestVO
 */
export class MacroCommandTestVO {
  public input: number;
  public result1: number | undefined;
  public result2: number | undefined;

  /**
   * Constructor.
   *
   * @param {number} input the number to be fed to the MacroCommandTestCommand
   */
  constructor(input: number) {
    this.input = input;
  }
}
