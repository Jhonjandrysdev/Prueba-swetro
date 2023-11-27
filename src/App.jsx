import { useEffect, useState } from "react";
import Prueba from "./components/Prueba";
import TituloTabla from "./components/TituloTabla";
const App = () => {

  const [datos, setDatos] = useState([]);
  const [sospechoso, setSospechoso] = useState([])

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


useEffect(() => {
  const data = [
    {
      Id: 1,
      UserId: 10,
      StartTimeInSeconds: 1665239344,
      DurationInSeconds: 1500,
      DistanceInMeters: 234234234324234,
      Steps: 4224,
      AverageSpeedInMetersPerSecond: 2.962,
      AveragePaceInMinutesPerKilometer: 5.626829,
      TotalElevationGainInMeters: 16.02,
      AverageHeartRateInBeatsPerMinute: 165,
    },
    {
      Id: 2,
      UserId: 10,
      StartTimeInSeconds: 1665325877,
      DurationInSeconds: 1800,
      DistanceInMeters: 5262.85,
      Steps: 4864,
      AverageSpeedInMetersPerSecond: 2.924,
      AveragePaceInMinutesPerKilometer: 5.6999545,
      TotalElevationGainInMeters: 80.48,
      AverageHeartRateInBeatsPerMinute: 0,
    },
    {
      Id: 6,
      UserId: 10,
      StartTimeInSeconds: 1667740865,
      DurationInSeconds: 0,
      DistanceInMeters: 123.3,
      Steps: 5084,
      AverageSpeedInMetersPerSecond: 2.951,
      AveragePaceInMinutesPerKilometer: 5.6478033,
      TotalElevationGainInMeters: 7.24,
      AverageHeartRateInBeatsPerMinute: 167,
    },
    {
      Id: 7,
      UserId: 10,
      StartTimeInSeconds: 1667831813,
      DurationInSeconds: 540,
      DistanceInMeters: 303.52,
      Steps: 1108,
      AverageSpeedInMetersPerSecond: 0.562,
      AveragePaceInMinutesPerKilometer: 29.65599,
      TotalElevationGainInMeters: 0,
      AverageHeartRateInBeatsPerMinute: 112,
    },
    {
      Id: 10,
      UserId: 10,
      StartTimeInSeconds: 1668348621,
      DurationInSeconds: 1727,
      DistanceInMeters: 5004.66,
      Steps: 4730,
      AverageSpeedInMetersPerSecond: 2.898,
      AveragePaceInMinutesPerKilometer: 5.7510924,
      TotalElevationGainInMeters: 205.09,
      AverageHeartRateInBeatsPerMinute: 158,
    },
    {
      Id: 12,
      UserId: 10,
      StartTimeInSeconds: 1665927809,
      DurationInSeconds: 1800,
      DistanceInMeters: 5123.38,
      Steps: 5026,
      AverageSpeedInMetersPerSecond: 2.846,
      AveragePaceInMinutesPerKilometer: 5.8561726,
      TotalElevationGainInMeters: 24.62,
      AverageHeartRateInBeatsPerMinute: 159,
    },
  ];

  setDatos(data)
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
    (`Estas actividades presentan incongruencia:  Distancia: ${DistanceInMeters} - Ritmo cardiado : ${AverageHeartRateInBeatsPerMinute} - Duración: ${DurationInSeconds}`);
  }
  console.log("Se esta ejecutando")

  return esSospechosa ? { backgroundColor: 'red' } : {};
};
  

  return (
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
              <tr key={item.Id} className="border-b border-gray-800" style={getEstiloFila(item)} >
                <td className="border-r  border-gray-800">{item.Id}</td>
                <td className="border-r  border-gray-800">{item.StartTimeInSeconds}</td>
                <td className="border-r  border-gray-800">{item.DurationInSeconds}</td>
                <td className="border-r  border-gray-800">{item.DistanceInMeters}</td>
                <td className="border-r  border-gray-800">{item.Steps}</td>
                <td className="border-r  border-gray-800">{item.AverageSpeedInMetersPerSecond}</td>
                <td className="border-r  border-gray-800">{item.AveragePaceInMinutesPerKilometer}</td>
                <td className="border-r  border-gray-800">{item.AverageHeartRateInBeatsPerMinute}</td>
                <td className="border-r  border-gray-800">{}</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default App;
