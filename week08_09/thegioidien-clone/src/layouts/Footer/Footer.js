import PrdsCarousel from "../../components/ui/PrdsCarousel/PrdsCarousel";
import FooterCenterBlock from "../../components/ui/FooterCenterBlock/FooterCenterBlock";
import FooterBottomBlock from "../../components/ui/FooterBottomBlock/FooterBottomBlock";

export default function Footer() {
  return (
    <div className="footer w-full mt-4 flex flex-col gap-4">
      <PrdsCarousel />
      <div className="footer-center grid grid-cols-3 gap-4 mt-1">
        <FooterCenterBlock />
      </div>
      <div className="footer-bottom">
        <FooterBottomBlock />
      </div>
    </div>
  );
}
