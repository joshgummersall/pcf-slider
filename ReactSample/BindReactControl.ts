import { ComponentType, ReactElement, createElement } from "react";
import isEqual from "lodash/isEqual";

export type BindingProps<IInputs, IOutputs> = {
  context: ComponentFramework.Context<IInputs>;
  logging: boolean;
  onChange: (outputs: IOutputs) => void; // eslint-disable-line no-unused-vars
};

export function BindReactControl<IInputs, IOutputs>(
  Component: ComponentType<BindingProps<IInputs, IOutputs>>,
  compare: (prev: IOutputs, next: IOutputs) => boolean = isEqual, // eslint-disable-line no-unused-vars
  logging = false
): new () => ComponentFramework.ReactControl<IInputs, IOutputs> {
  class BoundReactControl
    implements ComponentFramework.ReactControl<IInputs, IOutputs>
  {
    private notifyOutputChanged?: () => void;
    private outputs?: IOutputs;

    constructor() {
      logging && console.log("BoundReactControl::constructor");
    }

    init(
      _: ComponentFramework.Context<IInputs>,
      notifyOutputChanged?: () => void
    ): void {
      logging && console.log("BoundReactControl::init");
      this.notifyOutputChanged = notifyOutputChanged;
    }

    updateView(context: ComponentFramework.Context<IInputs>): ReactElement {
      logging && console.log("BoundReactControl::updateView");

      return createElement(Component, {
        context,
        logging,
        onChange: (outputs) => {
          if (!this.outputs || !compare(this.outputs, outputs)) {
            this.outputs = outputs;
            this.notifyOutputChanged?.();
          }
        },
      });
    }

    getOutputs(): IOutputs {
      logging && console.log("BoundReactControl::getOutputs");
      return this.outputs!; // TODO(jgummersall) this
    }

    destroy(): void {
      logging && console.log("BoundReactControl::destroy");
    }
  }

  return BoundReactControl;
}
