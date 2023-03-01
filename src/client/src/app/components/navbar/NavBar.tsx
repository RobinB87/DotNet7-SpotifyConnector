import { Box, AppBar, Toolbar, Typography, Button, Stack } from "@mui/material";

const NavBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Stack spacing={1} direction="row">
            <Button href={"/playlists"} variant="contained" color="secondary" size="small">
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Playlists
              </Typography>
            </Button>

            <Button href={"/tracks-add"} variant="contained" color="secondary" size="small">
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Add songs
              </Typography>
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
