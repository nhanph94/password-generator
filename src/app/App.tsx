import { PasswordGenerator } from "src/app/components";

import styles from "./App.module.css";

function App() {
  return (
    <main className={styles.appRoot}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Password Generator</h1>

        <hr className="mb-6" />

        <PasswordGenerator></PasswordGenerator>
      </div>
    </main>
  );
}

export default App;
