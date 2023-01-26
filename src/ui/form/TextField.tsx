import { useDescription, useTsController } from "@ts-react/form";

export function TextField({ hidden }: { hidden?: boolean }) {
  const {
    field: { onChange, value },
    error,
  } = useTsController<string>();

  const { label, placeholder } = useDescription();

  return (
    <>
      <label>{label}</label>
      <br />
      <input
        value={value ? value : ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        type={hidden ? "password" : "text"}
      />
      {error && error.errorMessage}
      <br />
    </>
  );
}
