import { Box, Button, Card, CardActions, CardContent, Input, TextField, Typography } from "@mui/material";
import { useState } from "react";

const TracksAdd = () => {
  const [playlistId, setPlaylistId] = useState("");
  const [uris, setUris] = useState("");

  const handlePlaylistIdChange = (event: any) => {
    setPlaylistId(event.target.value);
  };

  const handleUrisChange = (event: any) => {
    setUris(event.target.value);
  };

  const handleSubmit = () => {
    console.log(playlistId);
    console.log(uris);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Box sx={{ width: "75%", m: 2 }}>
        <Card variant="outlined">
          <form>
            <CardContent>
              <div style={{ marginBottom: "8px" }}>
                <Input
                  placeholder="Playlist id"
                  sx={{ width: "100%" }}
                  disableUnderline={true}
                  onChange={handlePlaylistIdChange}
                />
              </div>
              <div>
                <TextField
                  label="Uri list"
                  variant="outlined"
                  multiline
                  rows={8}
                  sx={{ width: "100%" }}
                  onChange={handleUrisChange}
                />
              </div>
            </CardContent>
            <CardActions style={{ justifyContent: "flex-end" }}>
              <Button variant="contained" onClick={handleSubmit}>
                Save
              </Button>
            </CardActions>
          </form>
        </Card>
      </Box>
    </div>
  );
};

export default TracksAdd;
