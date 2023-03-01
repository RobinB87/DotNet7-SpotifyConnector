import { Box, Card, CardContent, Typography } from "@mui/material";

import agent from "../../api/agent";
import useFetchDataAndValidateRef from "../../hooks/useFetchDataAndValidateRef";
import { Library } from "../../models/library";
import PlaylistList from "./PlaylistList";

const LibraryDashboard = () => {
  const { data } = useFetchDataAndValidateRef<Library | null>({
    initialState: null,
    callback: () => agent.Playlists.get(),
  });

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ width: "50%", m: 2, maxHeight: 700, overflow: "auto" }}>
          <Card>
            <CardContent>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div style={{ width: "95%", display: "flex", justifyContent: "center" }}>
                  <Typography sx={{ fontSize: 18, width: "95%", marginBottom: 3 }} color="secondary.dark">
                    Number of playlists:
                  </Typography>
                  <Typography sx={{ fontSize: 18, width: "5%" }} color="secondary.dark">
                    {data?.total}
                  </Typography>
                </div>
              </div>

              {data?.playlists && <PlaylistList playlists={data.playlists} />}
            </CardContent>
          </Card>
        </Box>
      </div>
    </>
  );
};

export default LibraryDashboard;
