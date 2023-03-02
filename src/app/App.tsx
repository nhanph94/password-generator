declare const __APP_VERSION__: string;
declare const __APP_NAME__: string;
declare const __APP_DESCRIPTION__: string;
declare const __BUILD_VERSION__: string;

import { PasswordGenerator } from "src/app/components";

import styles from "./App.module.css";

function App() {
  return (
    <main className={styles.appRoot}>
      <div className={styles.wrapper}>
        <header className="mb-4">
          <h1 className={styles.title}>{__APP_NAME__}</h1>
          <h2>{__APP_DESCRIPTION__}</h2>
        </header>

        <hr className="mb-6" />

        <div className="mb-4">
          <PasswordGenerator />
        </div>

        <footer>
          <div className="text-center text-gray-400 italic text-sm">
            <div>
              Copyright &copy; {new Date().getFullYear()}; Code by Nhan Phan.
            </div>
            <div>
              Version v{__APP_VERSION__} build {__BUILD_VERSION__}
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}

export default App;
