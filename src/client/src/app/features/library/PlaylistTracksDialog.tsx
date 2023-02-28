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

  const createFullName = (artist: string, song: string) => {
    const fullName = `${artist} - ${song}`;
    const maxLength = 65;
    return fullName.length > maxLength ? fullName.substring(0, maxLength).concat("...") : fullName;
  };

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    fetchData();
  });

  return (
    <Dialog onClose={handleClose} open={open} fullWidth={true}>
      <div style={{ backgroundColor: "#e60063" }}>
        {overview?.trackSummaries &&
          overview.trackSummaries.map((x) => (
            <div key={x.track.id} style={{ paddingLeft: 5 }}>
              {createFullName(x?.track?.artists?.[0]?.name, x?.track?.name)}
            </div>
          ))}
      </div>
    </Dialog>
  );
};

export default PlaylistTracksDialog;
