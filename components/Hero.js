import { Card } from "./ui/index";

const Hero = ({ imageUrl }) => {
  return (
    <Card noPadding noBorder sx={{ height: "320px" }}>
      <img
        src={imageUrl}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
        }}
      />
    </Card>
  );
};

export default Hero;
