//
//  ViewTestMediator2.spec.ts
//  PureMVC TypeScript Multicore
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD-3-Clause License
//

import { INotification, Mediator } from "../../src";
import { ViewTestNote } from "./ViewTestNote";

/**
 * @class ViewTestMediator2
 * @extends Mediator
 */
export class ViewTestMediator2 extends Mediator {
  public static NAME: string = "ViewTestMediator2";

  /**
   * Constructor
   *
   * @constructor
   * @param view
   */
  public constructor(view: any) {
    super(ViewTestMediator2.NAME, view);
  }

  /**
   * @override
   * @returns {[string]}
   */
  public override listNotificationInterests(): string[] {
    return [ViewTestNote.NOTE1, ViewTestNote.NOTE2];
  }

  /**
   * @override
   * @param notification
   */
  public override handleNotification(notification: INotification) {
    this.viewComponent.lastNotification = notification.name;
  }
}
