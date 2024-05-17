import './App.css'
import AbilityRow from './components/AbilityRow';
import Card from './components/Card';
import DataRow from './components/DataRow';
import Header from './components/Header';

function App() {
  return (
    <>
      <Header preWord="Bru" title="Batman" imgURL="./src/images/batman-logo.png" />
      <Card title="Opći podaci">
        <DataRow data="Datum rođenja" dataValue="30. ožujka, 1988." />
        <DataRow data="Adresa" dataValue="Batman Cave 1, Gotham City" />
        <DataRow data="Kontakt" dataValue="Bat-Signal" />
      </Card>
      <Card title="Sposobnosti">
        <AbilityRow ability="Detektivske vještine" abilityValue={100} />
        <AbilityRow ability="Borilačke vještine" abilityValue={90} />
        <AbilityRow ability="Javascript vještine" abilityValue={77} />
      </Card>
    </>
  );
}

export default App
