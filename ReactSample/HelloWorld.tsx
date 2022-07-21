import React, { useEffect } from "react";
import { BindingProps } from "./BindReactControl";
import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { Slider } from "@fluentui/react";

export const HelloWorld: React.FC<BindingProps<IInputs, IOutputs>> = ({
  context: {
    parameters: {
      label: { raw: label },
      value: { raw: value },
    },
  },
  logging,
  onChange,
}) => {
  logging && console.log("HelloWorld::render", { label, value, onChange });

  useEffect(() => {
    logging && console.log("HelloWorld:useEffect");
  }, [logging]);

  return (
    <Slider
      label={label ?? "Label"}
      value={value ?? 0}
      showValue
      onChange={(value) => {
        logging &&
          console.log("HelloWorld::onChange", { label, value, onChange });

        onChange({ value });
      }}
    />
  );
};
