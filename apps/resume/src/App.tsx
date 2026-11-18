import { ThemeProvider } from "./context/ThemeContext";
import ResumeBuilderPage from "./pages/ResumeBuilderPage";
import "./styles/index.scss";

/** Root application component that wraps the resume builder in a ThemeProvider. */
function App() {
  return (
    <ThemeProvider>
      <ResumeBuilderPage />
    </ThemeProvider>
  );
}

export default App;
