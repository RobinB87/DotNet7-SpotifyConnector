import { Box, Card, CardContent, Typography } from "@mui/material";
import { useState } from "react";

import agent from "../../api/agent";
import useFetchDataAndValidateRef from "../../hooks/useFetchDataAndValidateRef";
import { Library } from "../../models/library";
import PlaylistList from "./PlaylistList";

const LibraryDashboard = () => {
  const [overview, setOverview] = useState<Library | null>(null);
  useFetchDataAndValidateRef(async () => setOverview(await agent.Playlists.get()));

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
