//
//  SimpleCommandTestVO.spec.ts
//  PureMVC TypeScript Multicore
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD-3-Clause License
//

/**
 * A utility class used by SimpleCommandTest.
 *
 * @see SimpleCommandTest
 * @see SimpleCommandTestCommand
 *
 * @class SimpleCommandTestVO
 */
export class SimpleCommandTestVO {

    public input: number;
    public result: number | undefined;

    /**
     * Constructor.
     *
     * @param {number} input the number to be fed to the SimpleCommandTestCommand
     */
    public constructor(input: number) {
        this.input = input;
    }

}
