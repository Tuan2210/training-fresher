import Content from "../../layouts/Content/Content";
import Header from "../../layouts/Header/Header";
import Footer from "../../layouts/Footer/Footer";

import GoupBtn from "../../components/ui/GoupBtn/GoupBtn";

import { useLocation } from "react-router-dom";

export default function Member() {
  return (
    <div className="home w-full bg-white">
      <Header />
      <Content pathname={useLocation().pathname} />
      <Footer />
      <GoupBtn />
    </div>
  );
}
