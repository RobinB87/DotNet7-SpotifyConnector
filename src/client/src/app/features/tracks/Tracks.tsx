export interface ITracksProps {
  authCode: string | null;
}

const Tracks = (props: ITracksProps) => {
  console.log("authCode", props.authCode);
  return <>Tracksssss (logged in)</>;
};

export default Tracks;
