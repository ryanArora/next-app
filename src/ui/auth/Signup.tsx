import { signupSchema } from "@/common/schema/auth";
import { Form } from "@/ui/form/Form";
import { api } from "@/utils/api";
import { type FC } from "react";

export const Signup: FC = () => {
  const signup = api.auth.signup.useMutation();

  return (
    <div>
      <h1>Sign Up</h1>
      <Form
        schema={signupSchema}
        onSubmit={(data) => {
          signup.mutate(data);
          alert(signup.data?.id);
        }}
        props={{
          password: {
            hidden: true,
          },
        }}
      />
    </div>
  );
};
