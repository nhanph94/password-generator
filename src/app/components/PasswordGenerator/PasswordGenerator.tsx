import { useEffect, useRef, useState } from "react";

import Checkbox from "src/app/components/Checkbox/Checkbox";
import Slider from "src/app/components/Slider/Slider";
import { passwordGenerator } from "src/app/services";
import styles from "./PasswordGenerator.module.css";

type PasswordSettings = {
  length: number;
  lowercase: boolean;
  uppercase: boolean;
  numeric: boolean;
  symbol: boolean;
};

const PasswordGenerator = () => {
  const config = {
    passLength: {
      defaultValue: 12,
      min: 6,
      max: 50,
    },
    passStrengthRegex: {
      strong: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/g,
      medium:
        /((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))/g,
    },
  };
  const outputRef = useRef<HTMLInputElement>(null);
  const [settings, setSettings] = useState<PasswordSettings>({
    length: config.passLength.defaultValue,
    lowercase: true,
    uppercase: true,
    numeric: true,
    symbol: true,
  });
  const [password, setPassword] = useState<string>("");
  const [pwdStrengthPoint, setPwdStrengthPoint] = useState();

  const generatePassword = () => {
    const pwd = passwordGenerator(settings);
    setPassword(pwd);
  };

  const updateSetting = (settingUpdated: {
    [key: string]: boolean | number;
  }) => {
    setSettings({
      ...settings,
      ...settingUpdated,
    });
    generatePassword();
  };

  const copyClipboard = () => {
    const clipboard = navigator.clipboard;

    clipboard
      .writeText(outputRef.current?.value + "")
      .then(() => alert("password copied!!!"));
  };

  useEffect(() => {
    generatePassword();
  }, []);

  return (
    <form
      className={styles.formRoot}
      onSubmit={(e) => {
        e.preventDefault();
        generatePassword();
      }}
    >
      <div className={styles.outputField}>
        <input ref={outputRef} type="text" value={password} readOnly />

        <button
          type="button"
          className={styles.copyPass}
          onClick={copyClipboard}
        >
          <svg height="24" viewBox="0 0 24 24" width="24">
            <path
              d="m13 20a5.006 5.006 0 0 0 5-5v-8.757a3.972 3.972 0 0 0 -1.172-2.829l-2.242-2.242a3.972 3.972 0 0 0 -2.829-1.172h-4.757a5.006 5.006 0 0 0 -5 5v10a5.006 5.006 0 0 0 5 5zm-9-5v-10a3 3 0 0 1 3-3s4.919.014 5 .024v1.976a2 2 0 0 0 2 2h1.976c.01.081.024 9 .024 9a3 3 0 0 1 -3 3h-6a3 3 0 0 1 -3-3zm18-7v11a5.006 5.006 0 0 1 -5 5h-9a1 1 0 0 1 0-2h9a3 3 0 0 0 3-3v-11a1 1 0 0 1 2 0z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>

      <div className={styles.passStrength}>
        <span className={styles.actived}></span>
        <span></span>
        <span></span>
      </div>

      <div className={styles.passLength}>
        <div className="flex justify-between">
          <label className="font-bold">Password Length</label>
          <input
            className={styles.passLengthValue}
            type="number"
            min={config.passLength.min}
            max={config.passLength.max}
            value={settings.length}
            onChange={(e) => updateSetting({ length: +e.target.value })}
          />
        </div>

        <Slider
          min={config.passLength.min}
          max={config.passLength.max}
          value={settings.length}
          onChange={(e) => updateSetting({ length: +e.target.value })}
        />
      </div>

      <div className={styles.settings}>
        <label className="font-bold block mb-3">Password Settings</label>

        <div className={styles.row}>
          <Checkbox
            name="lowercase"
            label="Lowercase (a-z)"
            checked={!!settings.lowercase}
            onChange={(e) =>
              updateSetting({ [e.target.name + ""]: e.target.checked })
            }
          />

          <Checkbox
            name="uppercase"
            label="Uppercase (A-Z)"
            checked={!!settings.uppercase}
            onChange={(e) =>
              updateSetting({ [e.target.name + ""]: e.target.checked })
            }
          />

          <Checkbox
            name="numeric"
            label="Number (0-9)"
            checked={!!settings.numeric}
            onChange={(e) =>
              updateSetting({ [e.target.name + ""]: e.target.checked })
            }
          />

          <Checkbox
            name="symbol"
            label="Symbol (!@#$%...)"
            checked={!!settings.symbol}
            onChange={(e) =>
              updateSetting({ [e.target.name + ""]: e.target.checked })
            }
          />
        </div>
      </div>

      <div className="actions">
        <button
          className="w-full py-4 uppercase bg-blue-400 rounded hover:shadow-lg hover:shadow-blue-500/50 text-white transition-all duration-300 font-semibold"
          type="submit"
        >
          Generate Password
        </button>
      </div>
    </form>
  );
};

export default PasswordGenerator;
