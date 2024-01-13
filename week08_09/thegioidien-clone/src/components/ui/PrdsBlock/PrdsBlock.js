import PrdsBlockContent from "./PrdsBlockCt/PrdsBlockContent";
import PrdsBlockSub from "./PrdsBlockSub/PrdsBlockSub";
import PrdsBlockHeader from "./PrdsBlockHd/PrdsBlockHeader";

import prdsData from "./data/prdsData.json";

export default function PrdsBlock() {
  return (
    <>
      {prdsData.map((prd, index) => (
        <div
          key={index}
          className="w-full mt-4 border border-solid border-[#B21E02]"
        >
          <PrdsBlockHeader prdWrp={prd} />
          <PrdsBlockSub prdWrp={prd} />
          <PrdsBlockContent prdWrp={prd} />
        </div>
      ))}
    </>
  );
}
