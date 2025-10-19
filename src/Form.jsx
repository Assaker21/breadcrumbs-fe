import { useState } from "react";

export default function Form({ onSubmit }) {
  const [inputValue, setInputValue] = useState(
    localStorage.getItem("passcode")
  );

  return (
    <form
      className="w-[100vw] h-[100vh] flex items-center justify-center"
      onSubmit={(e) => {
        e.preventDefault();
        localStorage.setItem("passcode", inputValue);
        onSubmit(inputValue);
      }}
    >
      <div className="flex flex-col gap-4 items-end justify-center w-[calc(100%-40px)] max-w-[400px]">
        <h1 className="text-4xl font-bold tracking-tighter w-full mb-4">
          Breadcrumbs
        </h1>
        <input
          type="password"
          className="border border-gray-300 rounded-xl p-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-green-700 w-full"
          placeholder="Enter passcode"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
        <button
          autoFocus
          type="submit"
          disabled={!inputValue}
          className="bg-green-700 text-white font-medium rounded-xl px-3 py-2.5 w-full text-lg hover:ring-1 hover:ring-black cursor-pointer focus:ring-2 focus:ring-black"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
