import { useSelector } from "react-redux";
import CertificateCard from "../certificate-card";
import style from "./styles.module.css";

export default function HomeComponent() {
  const certificates = useSelector((state) => state.certificates.data);
  return (
    <div className={style.certificates}>
      {certificates.map((data, i) => {
        return <CertificateCard data={data} key={i} />;
      })}
    </div>
  );
}
