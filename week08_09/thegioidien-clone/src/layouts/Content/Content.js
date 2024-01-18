import ForgotPwBlock from "../../components/ui/ForgotPwBlock/ForgotPwBlock";
import LoginBlock from "../../components/ui/LoginBlock/LoginBlock";
import PrdsBlock from "../../components/ui/PrdsBlock/PrdsBlock";
import RegisterBlock from "../../components/ui/RegisterBlock/RegisterBlock";

export default function Content({ pathname }) {
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
      default:
        return;
    }
  }

  return <div className="content w-full z-[1]">{renderContent()}</div>;
}
