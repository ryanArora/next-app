import { type FC } from "react";
import { signupSchema } from "../../common/schema/auth";
import { api } from "../../utils/api";
import { Form } from "../form/Form";

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
