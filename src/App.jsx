import { useState,useEffect } from "react";
import Load from "./components/Load";
import Tabla from "./components/Tabla";

const App = () => {

  const [loader, setLoader] = useState(false);
  const [datos, setDatos] = useState([]);

  const endpoint = "https://www.towired.com/acamilae/endpoint.php";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoader(true);
        const response = await fetch(endpoint);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setDatos(data);
        // Trabaja con los datos obtenidos aquí
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoader(false);
      }
    };
    fetchData();
  }, [setLoader]);

  return (
    <div>
      {loader ? (
        <Load  />
      ) : (
        <Tabla data={datos}/>
        
      )}
    </div>
  );
}
export default App