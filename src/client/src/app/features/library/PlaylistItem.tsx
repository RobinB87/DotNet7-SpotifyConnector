import { useEffect, useRef, useState } from "react";
import { Dialog } from "@mui/material";

import agent from "../../api/agent";
import { PlaylistOverview } from "../../models/playlistOverview";

export interface PlaylistProps {
  id: string;
  onClose: () => void;
  open: boolean;
}

const PlaylistItem = (props: PlaylistProps) => {
  const { id, onClose, open } = props;
  const handleClose = () => {
    onClose();
    console.log("closing...");
  };

  const fetchData = async () => {
    setOverview(await agent.Playlists.getById(id));
  };

  const dataFetchedRef = useRef(false);
  const [overview, setOverview] = useState<PlaylistOverview | null>(null);
  //   useEffect(() => {
  //     if (dataFetchedRef.current) return;
  //     dataFetchedRef.current = true;
  //     fetchData();
  //   });

  return (
    <Dialog onClose={handleClose} open={open}>
      <div>PLAYLIST PAGE</div>
    </Dialog>
  );
};

export default PlaylistItem;
