import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function PaidPage() {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (!(location.state && location.state.from === "/purchase")) {
      navigate("/home");
    }
  }, [location.state, navigate]);

  return <h2>Оплата...</h2>;
}
