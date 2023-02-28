import { Box, Card, CardContent, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";

import agent from "../../api/agent";
import { PlaylistData } from "../../models/playlistData";

interface LibraryCardProps {
  libraryName: string;
}

const LibraryCard = ({ libraryName }: LibraryCardProps) => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Box sx={{ width: "95%", m: 0.5 }}>
        <Card variant="outlined" style={{ backgroundColor: "#00e676" }}>
          <CardContent>
            <Typography sx={{ fontSize: 18 }} color="text.secondary">
              {libraryName}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

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
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ width: "75%", m: 2 }}>
          <Card style={{ backgroundColor: "	#282828" }}>
            <CardContent sx={{ marginBottom: 3 }}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div style={{ width: "95%", display: "flex", justifyContent: "center" }}>
                  <Typography sx={{ fontSize: 18, width: "95%" }} color="primary">
                    Playlist overview
                  </Typography>
                  <Typography sx={{ fontSize: 18, width: "5%" }} color="primary">
                    {overview?.total}
                  </Typography>
                </div>
              </div>
              {overview?.playlists && overview.playlists.map((p) => <LibraryCard key={p.name} libraryName={p.name} />)}
            </CardContent>
          </Card>
        </Box>
      </div>
    </>
  );
};

export default PlaylistDashboard;
