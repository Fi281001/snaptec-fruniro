import Page from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function Pagination() {
  return (
    <Stack spacing={3}>
      <Page count={3} variant="outlined" shape="rounded" />
    </Stack>
  );
}
