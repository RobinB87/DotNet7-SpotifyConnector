import { Stack, Button, Typography } from "@mui/material";
import { useState } from "react";
import { PlaylistSummary } from "../../models/library";
import Playlist from "./PlaylistItem";

export interface PlaylistListProps {
  playlists: PlaylistSummary[];
}

const PlaylistList = ({ playlists }: PlaylistListProps) => {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  const handleClickOpen = (id: string) => {
    setOpen(true);
    setSelectedId(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Stack spacing={1} direction="column">
        {playlists.map((p) => (
          <Button key={p.name} variant="contained" color="secondary" onClick={() => handleClickOpen(p.id)}>
            <Typography sx={{ fontSize: 16 }} style={{ width: "100%", display: "flex", justifyContent: "flex-start" }}>
              {p.name}
            </Typography>
            <Typography sx={{ fontSize: 16 }}>{p.tracks.total}</Typography>
          </Button>
        ))}
      </Stack>
      <Playlist id={selectedId} open={open} onClose={handleClose} />
    </>
  );
};

export default PlaylistList;
