//
//  ViewTestNote.spec.ts
//  PureMVC TypeScript Multicore
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD-3-Clause License
//

import {Notification} from "../../src"

export class ViewTestNote extends Notification {

    public static NAME: string = "ViewTestNote";

    public static NOTE1: string = "Notification1";
    public static NOTE2: string = "Notification2";
    public static NOTE3: string = "Notification3";
    public static NOTE4: string = "Notification4";
    public static NOTE5: string = "Notification5";
    public static NOTE6: string = "Notification6";

    /**
     *
     * @param {string} name
     * @param {Object} body
     */
    public constructor(name: string, body: any) {
        super(name, body);
    }

    /**
     *
     * @param {Object} body
     * @returns {ViewTestNote}
     */
    public static create(body: any): Notification {
        return new ViewTestNote(ViewTestNote.NAME, body);
    }

}
