import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Button, Card, CardActions, CardContent, Input, InputLabel, TextField } from "@mui/material";
import agent from "../../api/agent";

const TracksAdd = () => {
  const { id } = useParams();
  const [playlistId, setPlaylistId] = useState("");
  const [uris, setUris] = useState("");

  const handlePlaylistIdChange = (event: any) => {
    setPlaylistId(event.target.value);
  };

  const handleUrisChange = (event: any) => {
    setUris(event.target.value);
  };

  // TODO: should be done in batches of max 20?
  const handleSubmit = async () => {
    if (!playlistId || !uris) console.log("not valid..");
    await agent.Playlists.add({ playlistId, uris });
  };

  useEffect(() => {
    if (id) setPlaylistId(id);
  }, [id]);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Box sx={{ width: "50%", m: 2 }}>
        <Card variant="outlined">
          <form>
            <CardContent>
              <div style={{ marginBottom: "8px" }}>
                <InputLabel>Playlist id</InputLabel>
                <Input
                  placeholder="Playlist id"
                  sx={{ width: "100%" }}
                  disableUnderline={true}
                  onChange={handlePlaylistIdChange}
                  value={playlistId}
                />
              </div>
              <div>
                <InputLabel>Semicolon separated uri list</InputLabel>
                <TextField
                  label="Uri list"
                  variant="outlined"
                  multiline
                  rows={8}
                  sx={{ width: "100%" }}
                  onChange={handleUrisChange}
                  value={uris}
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
