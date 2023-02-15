import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { FirestoreProvider } from "./context";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <FirestoreProvider
    key={null}
    type={""}
    props={undefined}
  >
    <App />
  </FirestoreProvider>
);
