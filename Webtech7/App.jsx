import { useState } from "react";
import Display from "./components/Display";
import ButtonSection from "./components/ButtonSection";

export default function App() {
  const [count, setCount] = useState(0);

  const increment = () => setCount((value) => value + 1);
  const decrement = () => setCount((value) => value - 1);

  return (
    <main className="app">
      <Display count={count} />
      <ButtonSection onIncrement={increment} onDecrement={decrement} />
    </main>
  );
}
