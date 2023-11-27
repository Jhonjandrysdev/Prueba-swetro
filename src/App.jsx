import { useEffect, useState } from "react";
import Prueba from "./components/Prueba";
import TituloTabla from "./components/TituloTabla";
import Load from './components/Load';
const App = () => {

  const [datos, setDatos] = useState([]);
  const [loader, setLoader] = useState(false);
  

  const averageHeartRateHigh = 201;
  const averageHeartRate = 149.2;
  const averageHeartRateLow = 90;
// Medidas ritmo cardiaco

  const averageDurationHigh = 127271
  const averageDuration = 2775.86;
  const averageDurationLow = 0
 // Medidas tiempo por segundo 

 const averageDistanceInMetersHigh = 116827.43
 const averageDistanceInMeters = 6494.885;
  const averageDistanceInMetersLow = 0;
  //Medidas de distancia en metros

  const endpoint = 'https://www.towired.com/acamilae/endpoint.php';

 useEffect(() => {
   const fetchData = async () => {
           try {
            setLoader(true)
             const response = await fetch(endpoint);          
             if (!response.ok) {
               throw new Error('Network response was not ok');
             }          
             const data = await response.json();
             setDatos(data)
             console.log('Datos obtenidos:', data);
             // Trabaja con los datos obtenidos aquí
           } catch (error) {
             console.error('Error fetching data:', error);
           } finally{
            setLoader(false)
           }
         };
         
   fetchData()
 }, [])

const getEstiloFila = (actividad) => {
  const {
    Id,
    AverageHeartRateInBeatsPerMinute,
    DurationInSeconds,
    DistanceInMeters,
  } = actividad;

  const dateAverageDistanceInMetersHigh = (DurationInSeconds / 60)
  const exactlyAverageDistanceInMetersHigh = parseInt(dateAverageDistanceInMetersHigh);

  if(AverageHeartRateInBeatsPerMinute < averageHeartRateLow && AverageHeartRateInBeatsPerMinute > averageHeartRateHigh){
    console.log("Este rango esta sospechoso")
  } else{
    console.log("Tiene buen ritmo cardiaco")
  }

  if((DurationInSeconds / 60) === averageDurationLow && (DurationInSeconds / 60 ) === averageDurationHigh){
    console.log("Tiempo sospechoso")
  } else{
    console.log("Tiempo adecuado para su actividad")
  }

  if(exactlyAverageDistanceInMetersHigh === averageDistanceInMetersLow && exactlyAverageDistanceInMetersHigh >= averageDistanceInMetersHigh ){
    console.log("Distancia irregular")
  } else{
    console.log("Distancia adecuada")
  }


  const esSospechosa =
    AverageHeartRateInBeatsPerMinute === 0 ||
    DurationInSeconds === 0 ||
    DistanceInMeters === 0 ||
    AverageHeartRateInBeatsPerMinute < averageHeartRate / 2 ||
    DurationInSeconds > averageDuration * 2 ||
    DistanceInMeters > averageDistanceInMeters * 2;

  if (esSospechosa) {
    console.log(`Actividad sospechosa - ID: ${Id} Distancia: ${DistanceInMeters} - Ritmo cardiado : ${AverageHeartRateInBeatsPerMinute} - Duración: ${DurationInSeconds} - No es congruente estas medidas para la actividad `);
  }

  return esSospechosa ? { backgroundColor: 'red' } : {};
};
  

  return (
    <div>
    {
      loader ?  
      ( <Load/> ) 
      : 
      (
        <>
        <div className="w-full">
      <div className="container mx-auto my-5">
        <Prueba />
        <table className="table-auto text-center items-center p-3 border-b">
          <thead>
            <tr className="border-b border-gray-800">
              <TituloTabla
                text="Id"
                className="border-r border-gray-800 p-3 text-sm"
              />
              <TituloTabla
                text="Tiempo inicial en segundos"
                className="border-r border-gray-800 p-3 text-sm"
              />
              <TituloTabla
                text="Duración en segundos"
                className="border-r border-gray-800 p-3 text-sm"
              />
              <TituloTabla
                text="Duración en metros"
                className="border-r border-gray-800 p-3 text-sm"
              />
              <TituloTabla
                text="Pasos"
                className="border-r border-gray-800 p-3 text-sm"
              />
              <TituloTabla
                text="Velocidad media metros por segundos"
                className="border-r border-gray-800 p-3 text-sm"
              />
              <TituloTabla
                text="Ritmo medio en minutos por Km"
                className="border-r border-gray-800 p-3 text-sm"
              />
              <TituloTabla
                text="Ritmo cardiaco medio"
                className="border-r border-gray-800 p-3 text-sm"
              />
              <TituloTabla
                text="Actividad sospechosa"
                className="border-r border-gray-800 p-3 text-sm"
              />
            </tr>
          </thead>
          <tbody>
            {datos.map((item) => (
              <tr key={item.Id} className="border-b border-gray-800">
                <td className="border-r  border-gray-800">{item.Id}</td>
                <td className="border-r  border-gray-800">{item.StartTimeInSeconds}</td>
                <td className="border-r  border-gray-800" style={getEstiloFila(item)}>{item.DurationInSeconds}</td>
                <td className="border-r  border-gray-800" style={getEstiloFila(item)}>{item.DistanceInMeters}</td>
                <td className="border-r  border-gray-800">{item.Steps}</td>
                <td className="border-r  border-gray-800">{item.AverageSpeedInMetersPerSecond}</td>
                <td className="border-r  border-gray-800">{item.AveragePaceInMinutesPerKilometer}</td>
                <td className="border-r  border-gray-800"style={getEstiloFila(item)}>{item.AverageHeartRateInBeatsPerMinute}</td>
                <td className="border-r  border-gray-800"style={getEstiloFila(item)}></td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
      )
    }
    </div>
  );
};
export default App;
