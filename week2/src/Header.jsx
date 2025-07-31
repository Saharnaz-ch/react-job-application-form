import { useLanguage } from "./LanguageContext";

function Header() {
  const { changeLanguage } = useLanguage();

  return (
    <div>
      <img
        src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/2560px-Flag_of_the_United_States.svg.png"
        alt=""
        onClick={() => changeLanguage("english")}
        style={{
          height: "15px",
          width: "25px",
          paddingRight: "5px",
          cursor: "pointer",
        }}
      />
      <img
        src="https://www.countryflags.com/wp-content/uploads/france-flag-png-xl.png"
        alt=""
        onClick={() => changeLanguage("french")}
        style={{
          height: "15px",
          width: "25px",
          paddingRight: "5px",
          cursor: "pointer",
        }}
      />
      <img
        src="https://www.countryflags.com/wp-content/uploads/russia-flag-png-xl.png"
        alt=""
        onClick={() => changeLanguage("russian")}
        style={{
          height: "15px",
          width: "25px",
          paddingRight: "5px",
          cursor: "pointer",
        }}
      />
    </div>
  );
}
export default Header;
