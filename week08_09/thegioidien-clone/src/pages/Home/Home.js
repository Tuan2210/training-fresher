import Content from "../../layouts/Content/Content";
import Footer from "../../layouts/Footer/Footer";
import Header from "../../layouts/Header/Header";

import GoupBtn from "../../components/ui/GoupBtn/GoupBtn";

export default function Home() {
  return (
    <div className="home w-full bg-white">
      <Header />
      <Content />
      <Footer />
      <GoupBtn />
    </div>
  );
}
