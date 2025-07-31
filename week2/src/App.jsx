import ThemeToggle from "./ThemeToggle";
import "./App.css";
import Box from "./Box";
import { LanguageProvider } from "./LanguageContext";
import Header from "./Header";
import JobApplication from "./JobApplication";

function App() {
  return (
    <>
      <LanguageProvider>
        <JobApplication />
        {/* <Header />
        <Box />
        <h1>Week2</h1>
        <ThemeToggle /> */}
      </LanguageProvider>
    </>
  );
}

export default App;
