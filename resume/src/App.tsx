import { ThemeProvider } from "./context/ThemeContext";
import ResumeBuilderPage from "./pages/ResumeBuilderPage";
import "./styles/index.scss";

function App() {
  return (
    <ThemeProvider>
      <ResumeBuilderPage />
    </ThemeProvider>
  );
}

export default App;
