import React, { useEffect, useState, createRef } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import moment from "moment";

export default function NewsCard({
  index,
  publishedAt,
  title,
  url,
  image,
  activeArticle,
}) {
  const [elRefs, setElRefs] = useState([]);
  const scrollToRef = (ref) => window.scroll(0, ref.current.offsetTop - 50);

  useEffect(() => {
    setElRefs((refs) =>
      Array(20)
        .fill()
        .map((_, j) => refs[j] || createRef())
    );
  }, []);

  useEffect(() => {
    if (index === activeArticle && elRefs[activeArticle]) {
      scrollToRef(elRefs[activeArticle]);
    }
  }, [index, activeArticle, elRefs]);

  return (
    <Card
      ref={elRefs[index]}
      sx={{ maxWidth: 345, marginBottom: 5 }}
      style={{
        height: 500,
        backgroundColor: index === activeArticle ? "rgba(0, 0, 0, 0.2)" : null,
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={image}
        alt="article-image"
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          textAlign="center"
        >
          {title}
        </Typography>
      </CardContent>
      <br />
      <div style={{ textAlign: "center" }}>
        <Typography variant="caption">
          {moment(publishedAt).format("MMMM Do YYYY, h:mm:ss a")}
        </Typography>
      </div>
      <CardActions style={{ display: "flex" }}>
        <Button size="small" href={url} target="_blank" style={{ flex: 1 }}>
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
