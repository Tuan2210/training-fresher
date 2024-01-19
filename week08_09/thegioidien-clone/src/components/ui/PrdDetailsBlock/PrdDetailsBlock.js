import { useParams } from "react-router-dom";
import PrdDetailsMainNav from "./PrdDetailsMainNav";
import PrdDetailsBlockHd from "./PrdDetailsBlockHd";

export default function PrdDetailsBlock() {
  const { prdName } = useParams();
  return (
    <div className="w-full flex flex-col mt-4 gap-4">
      <PrdDetailsMainNav prdName={prdName} />
      <PrdDetailsBlockHd prdName={prdName} />
      <h2>Chi tiết tên sản phẩm: {prdName}</h2>
    </div>
  );
}
