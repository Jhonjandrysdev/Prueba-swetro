import Prueba from "./components/Prueba";
import TituloTabla from "./components/TituloTabla";
const App = () => {
  const data = [
    {
      Id: 1,
      UserId: 10,
      StartTimeInSeconds: 1665239344,
      DurationInSeconds: 1500,
      DistanceInMeters: 4442.99,
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
      AverageHeartRateInBeatsPerMinute: 162,
    },
    {
      Id: 6,
      UserId: 10,
      StartTimeInSeconds: 1667740865,
      DurationInSeconds: 1800,
      DistanceInMeters: 5311.3,
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
                text="¿Hay trampa?"
                className="border-gray-800 p-3 text-sm"
              />
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.Id} className="border-b border-gray-800">
                <td>{item.Id}</td>
                <td>{item.StartTimeInSeconds}</td>
                <td>{item.DurationInSeconds}</td>
                <td>{item.DistanceInMeters}</td>
                <td>{item.Steps}</td>
                <td>{item.AverageSpeedInMetersPerSecond}</td>
                <td>{item.AveragePaceInMinutesPerKilometer}</td>
                <td>{item.AverageHeartRateInBeatsPerMinute}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default App;
