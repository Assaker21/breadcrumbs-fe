import "leaflet/dist/leaflet.css";
import Map from "./Map";
import { useState } from "react";
import Form from "./Form";

export default function App() {
  const [passcode, setPasscode] = useState("");

  if (!passcode) {
    return <Form onSubmit={setPasscode} />;
  }

  return <Map passcode={passcode} />;
}
