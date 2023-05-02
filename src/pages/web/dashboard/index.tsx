import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { useWeb } from "@/features";
import { CreateWebModal } from "@/features/web";

const CreateWeb = () => {
  const { setOpenCreateModal, openCreateWebModal, handleCloseCreateModal } =
    useWeb();

  return (
    <>
      <Stack
        justifyContent="center"
        alignItems="center"
        gap={3}
        sx={{ height: "100vh" }}
      >
        <Typography fontSize={30} color="primary">
          Create your web
        </Typography>
        <Button variant="contained" onClick={() => setOpenCreateModal(true)}>
          Create
        </Button>
      </Stack>
      <CreateWebModal
        open={openCreateWebModal}
        onClose={handleCloseCreateModal}
        title="Create Web"
        contentChildren={<Typography>haha</Typography>}
      />
    </>
  );
};

export default CreateWeb;
