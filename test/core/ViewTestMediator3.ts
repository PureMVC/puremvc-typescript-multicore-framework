//
//  ViewTestMediator3.spec.ts
//  PureMVC TypeScript Multicore
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD-3-Clause License
//

import { Mediator, INotification } from "../../src";
import { ViewTestNote } from "./ViewTestNote";

/**
 * @class ViewTestMediator3
 * @extends Mediator
 */
export class ViewTestMediator3 extends Mediator {
  public static NAME: string = "ViewTestMediator3";

  /**
   * @constructor
   * @param {object} view
   */
  public constructor(view: any) {
    super(ViewTestMediator3.NAME, view);
  }

  public listNotificationInterests(): string[] {
    // be sure that the mediator has some Observers created
    // in order to test removeMediator
    return [ViewTestNote.NOTE3];
  }

  /**
   * @override
   * @param notification
   */
  handleNotification(notification: INotification) {
    this.viewComponent.lastNotification = notification.name;
  }
}
