import { useEffect } from "react";
import { useCallback } from "react";
import { useState, useRef } from "react";

function App() {
  const [len, setLen] = useState(8);
  const [numAllowed, setnumAllowed] = useState(false);
  const [symbolAllowed, setsymbolAllowed] = useState(false);
  const [pass, setPass] = useState("");

  const passwordInputRef = useRef(null);

  const generatePassword = useCallback(() => {
    let p = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let num = "0123456789";
    let syb = "!@#$%^&*()-=_+[]{}|;:,.<>?";

    if (numAllowed) {
      str += num;
    }
    if (symbolAllowed) {
      str += syb;
    }

    for (let i = 1; i < len; i++) {
      const index = Math.floor(Math.random() * str.length + 1);
      p += str.charAt(index);
    }

    setPass(p);
  }, [len, numAllowed, symbolAllowed]);

  useEffect(() => {
    generatePassword();
  }, [len, numAllowed, symbolAllowed]);

  function copyPass() {
    window.navigator.clipboard.writeText(pass);
    passwordInputRef.current?.select();
    setCopy(true);
  }

  return (
    <>
      <div className="text-white border-2 rounded-lg p-4 mt-44  overflow-hidden w-80 lg:w-full ">
        <h1 className="text-center mb-4">Password Generator</h1>
        <input
          type="text"
          value={pass}
          className="w-3/4 p-2 rounded-l-lg outline-none text-slate-500"
          placeholder="Password"
          readOnly
          ref={passwordInputRef}
        />
        <button
          className="w-1/4 bg-slate-500 p-2 rounded-r-lg"
          onClick={copyPass}
        >
          Copy
        </button>
        <div className="mt-5 mb-5 flex text-sm justify-center items-center ">
          <input
            type="range"
            name="len"
            id="len"
            min={6}
            value={len}
            max={56}
            onChange={(e) => setLen(e.target.value)}
            className="mr-1 w-16 ml-5 "
          />
          <label htmlFor="len" className="mr-3">
            <h1 className="text-nowrap">Length : {len}</h1>
          </label>

          <input
            type="checkbox"
            defaultChecked={numAllowed}
            onChange={() => {
              setnumAllowed((previous) => !previous);
            }}
            name="num"
            id="num"
            className="mr-1 "
          />
          <label htmlFor="num">Numbers</label>
          <input
            type="checkbox"
            defaultChecked={symbolAllowed}
            onChange={() => {
              setsymbolAllowed((previous) => !previous);
            }}
            name="symbol;"
            id="symbol"
            className="mr-1 ml-2"
          />
          <label htmlFor="upper" className="mr-5">
            Symbols
          </label>
        </div>
      </div>
    </>
  );
}

export default App;
