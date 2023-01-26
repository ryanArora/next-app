import { useTsController } from "@ts-react/form";

export function NumberField({ req }: { req: number }) {
  const {
    field: { onChange, value },
    error,
  } = useTsController<number>();
  return (
    <>
      <span>
        <span>{`req is ${req}`}</span>
        <input
          value={value !== undefined ? value.toString() : ""}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            if (isNaN(value)) onChange(undefined);
            else onChange(value);
          }}
        />
        {error && error.errorMessage}
      </span>
    </>
  );
}
