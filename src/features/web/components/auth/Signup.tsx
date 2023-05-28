import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Form } from "@/features";
import { useAuth } from "@/features/web";
import { useAuthUtility } from "./hooks/useAuthUtility";
import Link from "next/link";

export const Signup = React.memo(function Signup() {
  const { signupFields } = useAuthUtility();
  const { handleSignup, signupError, signupLoading } = useAuth();

  return (
    <Stack alignItems="center" justifyContent="center" sx={{ height: "100vh" }}>
      <Box sx={{ width: "300px" }}>
        <Typography color="primary" fontSize={26} marginBottom={2}>
          Create account
        </Typography>
        <Form
          fields={signupFields}
          onSubmit={handleSignup}
          loading={signupLoading}
          submitErrorMessage={signupError}
        >
          <Typography>
            have an account?{" "}
            <Link href="/signin" style={{ color: "#B05A7A" }}>
              Sign in
            </Link>
          </Typography>
        </Form>
      </Box>
    </Stack>
  );
});
