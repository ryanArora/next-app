import { createTsForm } from "@ts-react/form";
import type { ReactNode } from "react";
import { z } from "zod";

import { CheckboxField } from "./CheckboxField";
import { NumberField } from "./NumberField";
import { TextField } from "./TextField";

const mapping = [
  [z.string(), TextField],
  [z.boolean(), CheckboxField],
  [z.number(), NumberField],
] as const;

function FormContainer({
  children,
  onSubmit,
}: {
  children: ReactNode;
  onSubmit: () => void;
}) {
  return (
    <form onSubmit={onSubmit}>
      {children}
      <button>Submit</button>
    </form>
  );
}

export const Form = createTsForm(mapping, {
  FormComponent: FormContainer,
});
