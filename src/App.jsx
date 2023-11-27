import { useState } from "react";
import Load from "./components/Load";
import Tabla from "./components/Tabla";

const App = () => {

  const [loader, setLoader] = useState(false);

  return (
    <div>
      {loader ? (
        <Load  />
      ) : (
        <Tabla/>
        
      )}
    </div>
  );
};
export default App;
