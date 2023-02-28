import { Box, Card, CardContent, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";

import agent from "../../api/agent";
import { Library } from "../../models/library";
import PlaylistList from "./PlaylistList";

const LibraryDashboard = () => {
  const dataFetchedRef = useRef(false);
  const [overview, setOverview] = useState<Library | null>(null);

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
            <CardContent>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div style={{ width: "95%", display: "flex", justifyContent: "center" }}>
                  <Typography sx={{ fontSize: 18, width: "95%", marginBottom: 3 }} color="primary">
                    Number of playlists:
                  </Typography>
                  <Typography sx={{ fontSize: 18, width: "5%" }} color="primary">
                    {overview?.total}
                  </Typography>
                </div>
              </div>

              {overview?.playlists && <PlaylistList playlists={overview.playlists} />}
            </CardContent>
          </Card>
        </Box>
      </div>
    </>
  );
};

export default LibraryDashboard;
