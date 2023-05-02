import * as React from "react";

import type { Field } from "@/features";
import { useForm, Controller } from "react-hook-form";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

interface Props {
  fields: Field[];
  // eslint-disable-next-line no-unused-vars
  onSubmit: (data: unknown) => void;
  childrenInput?: React.ReactNode;
}

export const Form = React.memo(function Form({
  fields,
  onSubmit,
  childrenInput,
}: Props) {
  const { handleSubmit, control } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((fieldInput, index) => (
        <>
          {fieldInput.type === "select" ? (
            <Controller
              render={({ field }) => (
                // <Box sx={{ width: "100%", marginBottom: 3 }}>
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
                // </Box>
              )}
              control={control}
              name={fieldInput.name}
              defaultValue={fieldInput.defaultValue}
            />
          ) : (
            <Controller
              key={index}
              render={({ field }) => (
                <TextField
                  {...field}
                  size="small"
                  type={fieldInput.type}
                  sx={{ width: "100%", marginBottom: 3 }}
                  label={fieldInput.label}
                />
              )}
              control={control}
              name={fieldInput.name}
            />
          )}
        </>
      ))}
      {/* <Controller
        render={({ field }) => (
          // <Box sx={{ width: "100%", marginBottom: 3 }}>
          <>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="select-theme">Theme</InputLabel>
              <Select
                {...field}
                labelId="select-theme"
                label="Theme"
                size="small"
                sx={{ width: "100%", marginBottom: 3 }}
              >
                {webThemes.map((theme) => (
                  <MenuItem key={theme.id} value={theme.id}>
                    {theme.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </>
          // </Box>
        )}
        control={control}
        name="theme"
        defaultValue="light"
      /> */}
      {childrenInput}
      <Button disableRipple type="submit" variant="contained">
        Submit
      </Button>
    </form>
  );
});
