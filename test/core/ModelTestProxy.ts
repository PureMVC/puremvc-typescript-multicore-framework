//
//  ModelTestProxy.spec.ts
//  PureMVC TypeScript Multicore
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD-3-Clause License
//

import { Proxy } from "../../src";

/**
 * @class ModelTestProxy
 * @extends Proxy
 */
export class ModelTestProxy extends Proxy {
  public static NAME: string = "ModelTestProxy";
  public static ON_REGISTER_CALLED: string = "OnRegisterCalled";
  public static ON_REMOVE_CALLED: string = "OnRemoveCalled";

  public constructor() {
    super(ModelTestProxy.NAME, "");
  }

  public override onRegister(): void {
    this.data = ModelTestProxy.ON_REGISTER_CALLED;
  }

  public override onRemove(): void {
    this.data = ModelTestProxy.ON_REMOVE_CALLED;
  }
}
