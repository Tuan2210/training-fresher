import PrdsCarousel from "../../components/ui/PrdsCarousel/PrdsCarousel";
import FooterCenterBlock from "../../components/ui/FooterCenterBlock/FooterCenterBlock";

export default function Footer() {
  return (
    <div className="footer w-full mt-4 flex flex-col gap-4">
      <PrdsCarousel />
      <div className="footer-center grid grid-cols-3 gap-4">
        <FooterCenterBlock />
      </div>
    </div>
  );
}
