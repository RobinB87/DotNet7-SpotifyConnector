import { Box, Button, Card, CardActions, CardContent, Typography } from "@mui/material";

import agent from "../../api/agent";
import useFetchDataAndValidateRef from "../../hooks/useFetchDataAndValidateRef";

const SpotifyLogin = () => {
  const { data } = useFetchDataAndValidateRef<string>({
    initialState: "",
    callback: async () => await agent.Auth.login(),
  });

  return (
    <>
      {data && (
        <>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Box sx={{ width: "50%", textAlign: "center", m: 20 }}>
              <Card variant="outlined">
                <CardContent>
                  <Typography sx={{ fontSize: 18 }} color="text.secondary">
                    Please login to Spotify
                  </Typography>
                </CardContent>
                <CardActions style={{ justifyContent: "center" }}>
                  <Button href={data} variant="contained" color="primary">
                    Login with Spotify
                  </Button>
                </CardActions>
              </Card>
            </Box>
          </div>
        </>
      )}
    </>
  );
};

export default SpotifyLogin;
