import Content from "../../layouts/Content/Content";
import Footer from "../../layouts/Footer/Footer";
import Header from "../../layouts/Header/Header";

export default function Home() {
  return (
    <div className="w-full h-full bg-white">
      <Header />
      <Content />
      <Footer />
    </div>
  );
}
