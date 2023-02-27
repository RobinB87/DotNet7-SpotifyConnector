import { useEffect, useRef, useState } from "react";

import agent from "../../api/agent";
import TokenService from "../../services/tokenService";
import { PlaylistOverview } from "../../models/playlist";

const Playlists = () => {
  const dataFetchedRef = useRef(false);
  const [overview, setOverview] = useState<PlaylistOverview | null>(null);

  const fetchData = async () => {
    const token = TokenService.getToken();
    setOverview(await agent.Playlists.get(token));
  };

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    fetchData();
  });

  return (
    <>
      <div>Playlist overview</div>
      {overview?.items && overview.items.map((p) => <li key={p.name}>{p.name}</li>)}
    </>
  );
};

export default Playlists;
