import PrdsBlockContent from "./PrdsBlockCt/PrdsBlockContent";
import PrdsBlockSub from "./PrdsBlockSub/PrdsBlockSub";
import PrdsBlockHeader from "./PrdsBlockHd/PrdsBlockHeader";

export default function PrdsBlock() {
  return (
    <div className="w-full">
      <PrdsBlockHeader />
      <PrdsBlockSub />
      <PrdsBlockContent />
    </div>
  );
}
