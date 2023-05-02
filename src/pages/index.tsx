import * as React from "react";

import { TestImportAlias } from "@/features";

const App = React.memo(function App() {
  return (
    <>
      <h1>Hello from home</h1>
      <TestImportAlias />
    </>
  );
});

export default App;
