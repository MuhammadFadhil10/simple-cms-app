import * as React from "react";
import type { Field } from "@/features";
import { useForm, Controller } from "react-hook-form";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

interface Props {
  fields: Field[];
  // eslint-disable-next-line no-unused-vars
  onSubmit: (data: any) => any | void | Promise<any>;
  submitErrorMessage?: string;
  loading?: boolean;
  childrenInput?: React.ReactNode;
  children?: React.ReactNode;
}

export const Form = React.memo(function Form({
  fields,
  onSubmit,
  submitErrorMessage,
  loading,
  childrenInput,
  children,
}: Props) {
  const { handleSubmit, control } = useForm();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: "flex", flexDirection: "column", width: "100%" }}
    >
      {!!submitErrorMessage?.length && (
        <Alert severity="error" sx={{ marginBottom: 2 }}>
          {submitErrorMessage}
        </Alert>
      )}
      {fields.map((fieldInput, index) => (
        <>
          {fieldInput.type === "select" ? (
            <Controller
              key={index}
              render={({ field }) => (
                <>
                  <FormControl sx={{ width: "100%" }}>
                    <InputLabel id={fieldInput.name}>
                      {fieldInput.label}
                    </InputLabel>
                    <Select
                      {...field}
                      labelId={fieldInput.name}
                      label={fieldInput.label}
                      size="small"
                      sx={{ width: "100%", marginBottom: 3 }}
                    >
                      {fieldInput.options?.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.optionLabel}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </>
              )}
              control={control}
              name={fieldInput.name}
              defaultValue={fieldInput.defaultValue}
            />
          ) : (
            <Controller
              key={index}
              // rules={{ maxLength: { value: 3, message: "max 3" } }}
              render={({ field }) => (
                <>
                  {/* {errors[fieldInput.name] && (
                    <p style={{ color: "red" }}>
                      {errors[fieldInput.name]?.message as string}
                    </p>
                  )} */}
                  <TextField
                    {...field}
                    size="small"
                    type={fieldInput.type}
                    sx={{ width: "100%", marginBottom: 3 }}
                    label={fieldInput.label}
                  />
                </>
              )}
              control={control}
              name={fieldInput.name}
            />
          )}
        </>
      ))}
      {childrenInput}
      <Button
        disableRipple
        type="submit"
        variant="contained"
        sx={{ marginBottom: 2 }}
      >
        {loading ? (
          <CircularProgress size={25} sx={{ color: "white" }} />
        ) : (
          "Submit"
        )}
      </Button>
      {children && <Box sx={{ alignSelf: "center" }}>{children}</Box>}
    </form>
  );
});
