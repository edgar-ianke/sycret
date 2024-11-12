import { useEffect, useState } from "react";
import HomeComponent from "../home";
import { apiService } from "../../utils/api";
import style from "./App.module.css";
import { Routes, Route } from "react-router-dom";
import PurchasePage from "../purchase";
import PaidPage from "../paid";
import { useDispatch } from "react-redux";
import { getCertificates } from "../../services/features/slice";

function App() {
  const [certificates, setCertificates] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCertificates())
  }, []);
  return (
    <section className={style.main}>
      <div className={style.content}>
        <Routes>
          <Route path="/home" element={<HomeComponent />} />
          <Route path="/purchase" element={<PurchasePage />} />
          <Route path="/paid" element={<PaidPage/> } />
        </Routes>
      </div>
    </section>
  );
}

export default App;
