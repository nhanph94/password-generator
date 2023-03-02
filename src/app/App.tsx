import { PasswordGenerator } from "src/app/components";

import styles from "./App.module.css";

function App() {
  return (
    <main className={styles.appRoot}>
      <div className={styles.wrapper}>
        <header className="mb-4">
          <h1 className={styles.title}>Password Generator</h1>
          <h3>A simple app help generate password</h3>
        </header>

        <hr className="mb-6" />

        <div className="mb-4">
          <PasswordGenerator />
        </div>

        <footer>
          <div className="text-center text-gray-400 italic text-sm">
            Copyright &copy; 2023; Code by Nhan Phan. <br />
            Version v0.1.0 build 20230302
          </div>
        </footer>
      </div>
    </main>
  );
}

export default App;
