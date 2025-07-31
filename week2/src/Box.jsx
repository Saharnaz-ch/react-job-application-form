import { useLanguage } from "./LanguageContext";

function Box() {
  return (
    <div>
      {/* {languages.map((item) => (
        <Language key={item.id} item={item} />
      ))} */}
      <Language />
    </div>
  );
}
export default Box;

function Language() {
  const { selectedLanguageData: item } = useLanguage();
  return (
    <div className="box">
      <h2 className="title">
        <img style={{ width: "25px", height: "20px" }} src={item.icon} />

        <span> {item.title}</span>
      </h2>
      <div className="paragraph">
        <span>{item.sentence}s</span>
        <span>{item.description}</span>
      </div>
    </div>
  );
}
