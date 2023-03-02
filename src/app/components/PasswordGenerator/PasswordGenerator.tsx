import { useEffect, useState } from "react";

import Checkbox from "src/app/components/Checkbox/Checkbox";
import Slider from "src/app/components/Slider/Slider";
import { passwordGenerator, passwordStrengthChecker } from "src/app/services";
import { PasswordSetting } from "src/app/types";

import styles from "./PasswordGenerator.module.css";

const PasswordGenerator = () => {
  const config = {
    passLength: {
      defaultValue: 12,
      min: 6,
      max: 50,
    },
  };

  const [settings, setSettings] = useState<PasswordSetting>({
    length: config.passLength.defaultValue,
    uppercase: true,
    numeric: true,
    symbol: true,
    excludeAmbiguous: false,
  });
  const [password, setPassword] = useState<string>("");
  const [pwdStrengthPoint, setPwdStrengthPoint] = useState<number>();

  const createPassword = () => {
    const pwd = passwordGenerator(settings);
    setPassword(pwd);
    const strengthPoint = passwordStrengthChecker(pwd);
    setPwdStrengthPoint(strengthPoint);
  };

  const updateSetting = (settingUpdated: {
    [key: string]: boolean | number;
  }) => {
    setSettings(
      (settings) =>
        (settings = {
          ...settings,
          ...settingUpdated,
        })
    );
  };

  const copyClipboard = () => {
    const clipboard = navigator.clipboard;

    clipboard.writeText(password).then(() => alert("password copied!!!"));
  };

  useEffect(() => {
    createPassword();
  }, [settings]);

  return (
    <form
      className={styles.formRoot}
      onSubmit={(e) => {
        e.preventDefault();
        createPassword();
      }}
    >
      <div className={styles.outputField}>
        <input type="text" value={password} readOnly />

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
            name="uppercase"
            label="Include Uppercase Characters (A-Z)"
            checked={!!settings.uppercase}
            onChange={(e) =>
              updateSetting({ [e.target.name + ""]: e.target.checked })
            }
          />

          <Checkbox
            name="numeric"
            label="Include Numbers (0-9)"
            checked={!!settings.numeric}
            onChange={(e) =>
              updateSetting({ [e.target.name + ""]: e.target.checked })
            }
          />

          <Checkbox
            name="symbol"
            label="Include Symbols (e.g !@#$%...)"
            checked={!!settings.symbol}
            onChange={(e) =>
              updateSetting({ [e.target.name + ""]: e.target.checked })
            }
          />

          <div className="col-span-2">
            <Checkbox
              name="excludeAmbiguous"
              label={`Exclude Ambiguous Characters ( { } [ ] ( ) / \ ' " \` ~ , ; : . < >)`}
              checked={!!settings.excludeAmbiguous}
              onChange={(e) =>
                updateSetting({ [e.target.name + ""]: e.target.checked })
              }
            />
          </div>
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
