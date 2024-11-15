import MenuList from "./menulist";

// Function components with Anonymous Function
const Footer = function () {
  const copyrightYear = 2024;

  // it must return jsx
  return (
    <footer className="text-center bg-navy" style={{ color: "white" }}>
      <div>
        <MenuList userRole="" onLogout={() => {}} />
        <br />
        <p className="pb-3">
          <b>&copy;</b>Copyright {copyrightYear} | <b>INSTA LEARN</b>
        </p>
      </div>
    </footer>
  );
};
export default Footer;
