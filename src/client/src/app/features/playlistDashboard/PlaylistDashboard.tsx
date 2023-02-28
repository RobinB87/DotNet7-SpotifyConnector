import { useEffect, useRef, useState } from "react";

import agent from "../../api/agent";
import { PlaylistData } from "../../models/playlistData";

const PlaylistDashboard = () => {
  const dataFetchedRef = useRef(false);
  const [overview, setOverview] = useState<PlaylistData | null>(null);

  const fetchData = async () => {
    setOverview(await agent.Playlists.get());
  };

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    fetchData();
  });

  return (
    <>
      <div>Playlist overview</div>
      {overview?.playlists && overview.playlists.map((p) => <li key={p.name}>{p.name}</li>)}
    </>
  );
};

export default PlaylistDashboard;
