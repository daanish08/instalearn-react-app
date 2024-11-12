import MenuList from "./menulist";


// Function components with Anonymous Function
const Footer = function () {
  const copyrightYear = 2024;

  // it must return jsx
  return (
    <footer className="text-center">
      <div>
        <hr />
        <p>
          <b>&copy;</b>copyright {copyrightYear} | <b>INSTA LEARN APP</b>
        </p>
        <MenuList />
      </div>
    </footer>
  );
};
export default Footer;
