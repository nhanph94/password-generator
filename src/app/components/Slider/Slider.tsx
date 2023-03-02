import { forwardRef, InputHTMLAttributes, useRef } from "react";

import styles from "./Slider.module.css";

const Slider = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  const { value = 6, min = 1, max = 99 } = props;
  const sliderRef = ref || useRef<HTMLInputElement>(null);

  return (
    <div className={styles.sliderRoot}>
      <input
        type="range"
        ref={sliderRef}
        {...props}
        style={
          {
            "--range": `${
              ((+value == +min ? 1 : +value - +min) / (+max - +min)) * 100
            }%`,
          } as React.CSSProperties
        }
      />
    </div>
  );
});

export default Slider;
