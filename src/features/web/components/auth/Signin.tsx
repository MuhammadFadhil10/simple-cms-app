import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Form } from "@/features";
import { useAuth } from "@/features/web";
import { useAuthUtility } from "./hooks/useAuthUtility";
import Link from "next/link";

export const Signin = React.memo(function Signin() {
  const { signinFields } = useAuthUtility();
  const { handleSignin, signinError, signinLoading } = useAuth();

  return (
    <Stack alignItems="center" justifyContent="center" sx={{ height: "100vh" }}>
      <Box sx={{ width: "300px" }}>
        <Typography color="primary" fontSize={26} marginBottom={2}>
          Lets sign you in!
        </Typography>
        <Form
          fields={signinFields}
          onSubmit={handleSignin}
          loading={signinLoading}
          submitErrorMessage={signinError}
        >
          <Typography>
            Doesn&apos;t have an account?{" "}
            <Link href="/signup" style={{ color: "#B05A7A" }}>
              Sign up
            </Link>
          </Typography>
        </Form>
      </Box>
    </Stack>
  );
});
