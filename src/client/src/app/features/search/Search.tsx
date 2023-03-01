import { useState } from "react";
import { Box, Button, Card, CardActions, CardContent, InputLabel, TextField, Typography } from "@mui/material";

import agent from "../../api/agent";
import { SearchTracksSummary } from "../../models/searchTracksSummary";
import { Artist } from "../../models/playlistTracks";

interface TrackCardProps {
  id: string;
  artists: Artist[];
  track: string;
}

const TrackCard = ({ id, artists, track }: TrackCardProps) => {
  return (
    <Box sx={{ m: 1 }}>
      <Card variant="outlined" style={{ backgroundColor: "#e60063" }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }}>{track}</Typography>
          {artists &&
            artists.map((x) => (
              <Typography key={x.id} sx={{ fontSize: 12 }}>
                {x.name}
              </Typography>
            ))}
          <Typography sx={{ fontSize: 10 }}>uri: {id}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

const Search = () => {
  const [content, setContent] = useState("");
  const [tracksSummary, setTracksSummary] = useState<SearchTracksSummary | null>(null);

  const handleSearchChange = (event: any) => {
    setContent(event.target.value);
  };

  const handleSubmit = async () => {
    if (!content) console.log("not valid..");
    setTracksSummary(await agent.Playlists.search({ content }));
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ width: "50%", m: 2 }}>
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
                  Search
                </Button>
              </CardActions>
            </form>
          </Card>
        </Box>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        {tracksSummary?.tracks && (
          <Box sx={{ width: "50%", m: 2 }}>
            <Card variant="outlined">
              <CardContent>
                <Typography sx={{ fontSize: 16 }}>Tracks found: {tracksSummary.total}</Typography>
                {tracksSummary.tracks.map((x) => (
                  <TrackCard key={x.id} id={x.id} artists={x.artists} track={x.name} />
                ))}
              </CardContent>
            </Card>
          </Box>
        )}
      </div>
    </>
  );
};

export default Search;
