import { Button, Dialog } from "@mui/material";

import agent from "../../api/agent";
import { PlaylistTracks } from "../../models/playlistTracks";
import useFetchDataAndValidateRef from "../../hooks/useFetchDataAndValidateRef";

export interface PlaylistTracksProps {
  id: string;
  onClose: () => void;
  open: boolean;
}

const PlaylistTracksDialog = (props: PlaylistTracksProps) => {
  const { id, onClose, open } = props;

  const { data } = useFetchDataAndValidateRef<PlaylistTracks | null>({
    initialState: null,
    callback: () => agent.Playlists.getTracksByPlaylistId(id),
  });

  const handleClose = () => {
    onClose();
  };

  const createFullName = (artist: string, track: string) => {
    const fullName = `${artist} - ${track}`;
    const maxLength = 65;
    return fullName.length > maxLength ? fullName.substring(0, maxLength).concat("...") : fullName;
  };

  return (
    <Dialog onClose={handleClose} open={open} fullWidth={true}>
      <div style={{ backgroundColor: "#e60063" }}>
        <Button href={`/tracks-add/${id}`} variant="contained" sx={{ width: "98%", m: "1%" }}>
          Add tracks to this playlist
        </Button>
        {data?.trackSummaries &&
          data.trackSummaries.map((x) => (
            <div key={x.track.id} style={{ paddingLeft: 5 }}>
              {createFullName(x?.track?.artists?.[0]?.name, x?.track?.name)}
            </div>
          ))}
      </div>
    </Dialog>
  );
};

export default PlaylistTracksDialog;
