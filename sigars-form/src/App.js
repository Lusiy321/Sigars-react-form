import "./App.css";
import { useEffect } from "react";
import Button from "./components/Button/Button";
export const tg = window.Telegram.WebApp;
function App() {
  useEffect(() => {
    tg.ready();
  }, []);

  const onClose = () => {
    tg.close();
  };

  return (
    <div className="App">
      <Button onClick={onClose} />
    </div>
  );
}

export default App;
