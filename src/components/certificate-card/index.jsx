import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import { Link, useLocation } from "react-router-dom";

export default function CertificateCard({ data }) {
  const location = useLocation();
  return (
    <Card sx={{ maxWidth: 300, borderRadius: "24px" }}>
      <CardContent>
        <Typography gutterBottom variant="h3" component="div">
          {parseInt(data.PRICE)}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {data.NAME}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Цена: {parseInt(data.SUMMA)}₽
        </Typography>
      </CardContent>
      <CardActions>
        <Link to="/purchase" state={{data, from: location}}>
          <Button size="small" color="primary">
            Оформить
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
