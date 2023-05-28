import * as React from "react";

import { TestImportAlias } from "@/features";
import { Api } from "@/api";

const App = React.memo(function App() {
  const testApi = async () => {
    const { data } = await Api.get("/test-server-run");
    console.log("test response: ", data);
  };

  return (
    <>
      <h1>Hello from home</h1>
      <TestImportAlias />
      <button onClick={testApi}>test api and check console</button>
    </>
  );
});

export default App;
