import './App.css'
import PaymentForm from './components/PaymentForm'
import TemaContext from './components/kontekst'
import { useState } from 'react';

function App() {

  const [theme, setTheme] = useState("light");

  const toggleTheme = (e) => {
    e.preventDefault();
    setTheme(theme == "light" ? "dark" : "light");
  }

  return (
    <TemaContext.Provider value={theme}>
      <PaymentForm action={toggleTheme} />
    </TemaContext.Provider>
  );
}

export default App
