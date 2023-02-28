import { useEffect, useRef, useState } from "react";
import { Dialog } from "@mui/material";

import agent from "../../api/agent";
import { PlaylistTracks } from "../../models/playlistTracks";

export interface PlaylistTracksProps {
  id: string;
  onClose: () => void;
  open: boolean;
}

const PlaylistTracksDialog = (props: PlaylistTracksProps) => {
  const { id, onClose, open } = props;
  const dataFetchedRef = useRef(false);
  const [overview, setOverview] = useState<PlaylistTracks | null>(null);

  const handleClose = () => {
    onClose();
  };

  const fetchData = async () => {
    setOverview(await agent.Playlists.getTracksByPlaylistId(id));
  };

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    fetchData();
  });

  return (
    <Dialog onClose={handleClose} open={open}>
      <div>
        {overview?.trackSummaries && overview.trackSummaries.map((x) => <li key={x.track.id}>{x?.track?.name}</li>)}
      </div>
    </Dialog>
  );
};

export default PlaylistTracksDialog;
