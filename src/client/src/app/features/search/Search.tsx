import { useState } from "react";
import { Box, Button, Card, CardActions, CardContent, InputLabel, TextField } from "@mui/material";

import agent from "../../api/agent";

const Search = () => {
  const [content, setContent] = useState("");

  const handleSearchChange = (event: any) => {
    setContent(event.target.value);
  };

  const handleSubmit = async () => {
    if (!content) console.log("not valid..");
    await agent.Playlists.search({ content });
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Box sx={{ width: "75%", m: 2 }}>
        <Card variant="outlined">
          <form>
            <CardContent>
              <InputLabel>
                Semicolon separated list of tracks in the format: <b>artistname - trackname</b>
              </InputLabel>
              <TextField
                label="Semicolon separated list"
                variant="outlined"
                multiline
                rows={8}
                sx={{ width: "100%" }}
                onChange={handleSearchChange}
                value={content}
              />
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

export default Search;
