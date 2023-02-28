import { Box, Button, Card, CardContent, Stack, Typography } from "@mui/material";
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

              <Stack spacing={1} direction="column">
                {overview?.playlists &&
                  overview.playlists.map((p) => (
                    <Button key={p.name} variant="contained" color="secondary">
                      <Typography
                        sx={{ fontSize: 16 }}
                        style={{ width: "100%", display: "flex", justifyContent: "flex-start" }}
                      >
                        {p.name}
                      </Typography>
                      <Typography sx={{ fontSize: 16 }}>{p.tracks.total}</Typography>
                    </Button>
                  ))}
              </Stack>
            </CardContent>
          </Card>
        </Box>
      </div>
    </>
  );
};

export default PlaylistDashboard;
