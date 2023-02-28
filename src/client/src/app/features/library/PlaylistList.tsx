import { Stack, Button, Typography } from "@mui/material";
import { Playlist } from "../../models/library";

export interface PlaylistListProps {
  playlists: Playlist[];
}

const PlaylistList = ({ playlists }: PlaylistListProps) => {
  return (
    <Stack spacing={1} direction="column">
      {playlists.map((p) => (
        <Button key={p.name} variant="contained" color="secondary">
          <Typography sx={{ fontSize: 16 }} style={{ width: "100%", display: "flex", justifyContent: "flex-start" }}>
            {p.name}
          </Typography>
          <Typography sx={{ fontSize: 16 }}>{p.tracks.total}</Typography>
        </Button>
      ))}
    </Stack>
  );
};

export default PlaylistList;
