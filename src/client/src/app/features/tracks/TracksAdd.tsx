import { Box, Button, Card, CardActions, CardContent, Input, TextField, Typography } from "@mui/material";

const TracksAdd = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Box sx={{ width: "75%", m: 2 }}>
        <Card variant="outlined">
          <CardContent>
            <div style={{ marginBottom: "8px" }}>
              <Input placeholder="Playlist id" sx={{ width: "100%" }} disableUnderline={true} />
            </div>
            <TextField label="Uri list" variant="outlined" multiline rows={8} sx={{ width: "100%" }} />
          </CardContent>
          <CardActions style={{ justifyContent: "flex-end" }}>
            <Button variant="contained">Save</Button>
          </CardActions>
        </Card>
      </Box>
    </div>
  );
};

export default TracksAdd;
