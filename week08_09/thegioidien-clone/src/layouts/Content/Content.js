import PrdsBlock from "../../components/ui/PrdsBlock/PrdsBlock";
import RegisterBlock from "../../components/ui/RegisterBlock/RegisterBlock";
import LoginBlock from "../../components/ui/LoginBlock/LoginBlock";
import ForgotPwBlock from "../../components/ui/ForgotPwBlock/ForgotPwBlock";
import PrdDetailsBlock from "../../components/ui/PrdDetailsBlock/PrdDetailsBlock";

import { useParams } from "react-router-dom";

export default function Content({ pathname }) {
  const { prdName } = useParams();
  const url_tensp = `/sanpham/${encodeURIComponent(prdName)}`;

  function renderContent() {
    switch (pathname) {
      case "/":
        return <PrdsBlock />;
      case "/dangky":
        return <RegisterBlock />;
      case "/dangnhap":
        return <LoginBlock />;
      case "/quenmatkhau":
        return <ForgotPwBlock />;
      case url_tensp:
        return <PrdDetailsBlock />;
      default:
        return;
    }
  }

  return <div className="content w-full z-[1]">{renderContent()}</div>;
}
