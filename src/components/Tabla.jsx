import TituloTabla from "./TituloTabla";
import Prueba from "./Prueba";
import { useState, useEffect } from "react";
import { ToggleSwitch } from "flowbite-react";
import Pagination from "./Pagination";

const Tabla = () => {
  const [datos, setDatos] = useState([]);
  const [loader, setLoader] = useState(false);
  const [itemsPage, setItemsPage] = useState(50)
  const [currentPage, setCurrentPage] = useState(1)
  const averageHeartRateHigh = 201;
  const averageHeartRate = 149.2;
  const averageHeartRateLow = 90;
  // Medidas ritmo cardiaco

  const averageDurationHigh = 127271;
  const averageDuration = 2775.86;
  const averageDurationLow = 0;
  // Medidas tiempo por segundo

  const averageDistanceInMetersHigh = 116827.43;
  const averageDistanceInMeters = 6494.885;
  const averageDistanceInMetersLow = 0;
  //Medidas de distancia en metros

  const endpoint = "https://www.towired.com/acamilae/endpoint.php";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoader(true);
        loader;
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

  const getEstiloFila = (actividad) => {
    const {
      Id,
      AverageHeartRateInBeatsPerMinute,
      DurationInSeconds,
      DistanceInMeters,
    } = actividad;

    const dateAverageDistanceInMetersHigh = DurationInSeconds / 60;
    const exactlyAverageDistanceInMetersHigh = parseInt(
      dateAverageDistanceInMetersHigh
    );

    if (
      AverageHeartRateInBeatsPerMinute < averageHeartRateLow &&
      AverageHeartRateInBeatsPerMinute > averageHeartRateHigh
    ) {
      console.log("Este rango esta sospechoso");
    } else {
      console.log("Tiene buen ritmo cardiaco");
    }

    if (
      DurationInSeconds / 60 === averageDurationLow &&
      DurationInSeconds / 60 === averageDurationHigh
    ) {
      console.log("Tiempo sospechoso");
    } else {
      console.log("Tiempo adecuado para su actividad");
    }

    if (
      exactlyAverageDistanceInMetersHigh === averageDistanceInMetersLow &&
      exactlyAverageDistanceInMetersHigh >= averageDistanceInMetersHigh
    ) {
      console.log("Distancia irregular");
    } else {
      console.log("Distancia adecuada");
    }

    const esSospechosa =
      AverageHeartRateInBeatsPerMinute === 0 ||
      DurationInSeconds === 0 ||
      DistanceInMeters === 0 ||
      AverageHeartRateInBeatsPerMinute < averageHeartRate / 2 ||
      DurationInSeconds > averageDuration * 2 ||
      DistanceInMeters > averageDistanceInMeters * 2;

    if (esSospechosa) {
      console.log(
        `Actividad sospechosa - ID: ${Id} Distancia: ${DistanceInMeters} - Ritmo cardiado : ${AverageHeartRateInBeatsPerMinute} - Duración: ${DurationInSeconds} - No es congruente estas medidas para la actividad `
      );
    }

    return esSospechosa ? { backgroundColor: "red" } : {};
  };

  const [filtroActivo, setFiltroActivo] = useState(false);

  const toggleFiltro = () => {
    setFiltroActivo(!filtroActivo);
  };

  const actividadesFiltradas = datos.filter((actividad) => {
    if (filtroActivo) {
      return (
        actividad.AverageHeartRateInBeatsPerMinute < 90 &&
        actividad.DurationInSeconds > 2 * 2775.86 ||
        actividad.DistanceInMeters > 2 * 6494.885
      );
    } else {
      return true;
    }
  });

  return (
    <>
      <div className="w-full">
        <div className="container mx-auto my-5">
          <Prueba />
          <div className="container flex gap-3 mb-3 items-center">
            
              <ToggleSwitch checked={filtroActivo} onChange={toggleFiltro} />
              <h5 className="italic text-sm font-bold">Activar Filtro - Rangos Actividad Sospechosa</h5>
            
          </div>
          <table className="table-auto text-center items-center p-3 border text-black">
            <thead>
              <tr className="border border-gray-800">
                <TituloTabla
                  text="Id"
                  className="border border-gray-800 p-3 text-sm"
                />
                <TituloTabla
                  text="Tiempo inicial en segundos"
                  className="border border-gray-800 p-3 text-sm"
                />
                <TituloTabla
                  text="Duración en segundos"
                  className="border border-gray-800 p-3 text-sm"
                />
                <TituloTabla
                  text="Duración en metros"
                  className="border border-gray-800 p-3 text-sm"
                />
                <TituloTabla
                  text="Pasos"
                  className="border border-gray-800 p-3 text-sm"
                />
                <TituloTabla
                  text="Velocidad media metros por segundos"
                  className="border border-gray-800 p-3 text-sm"
                />
                <TituloTabla
                  text="Ritmo medio en minutos por Km"
                  className="border border-gray-800 p-3 text-sm"
                />
                <TituloTabla
                  text="Ritmo cardiaco medio"
                  className="border border-gray-800 p-3 text-sm"
                />
                <TituloTabla
                  text="Actividad sospechosa"
                  className="border border-gray-800 p-3 text-sm"
                />
              </tr>
            </thead>
            <tbody>
              {actividadesFiltradas.map((item) => (
                <tr key={item.Id} className="border-b border-gray-800">
                  <td className="border-r  border-gray-800">{item.Id}</td>
                  <td className="border-r  border-gray-800">
                    {item.StartTimeInSeconds}
                  </td>
                  <td
                    className="border-r  border-gray-800"
                    style={getEstiloFila(item)}
                  >
                    {item.DurationInSeconds}
                  </td>
                  <td
                    className="border-r  border-gray-800"
                    style={getEstiloFila(item)}
                  >
                    {item.DistanceInMeters}
                  </td>
                  <td
                    className="border-r  border-gray-800"
                  >
                    {item.Steps}
                  </td>
                  <td className="border-r  border-gray-800">
                    {item.AverageSpeedInMetersPerSecond}
                  </td>
                  <td className="border-r  border-gray-800">
                    {item.AveragePaceInMinutesPerKilometer}
                  </td>
                  <td
                    className="border-r  border-gray-800"
                    style={getEstiloFila(item)}
                  >
                    {item.AverageHeartRateInBeatsPerMinute}
                  </td>
                  <td
                    className="border-r  border-gray-800"
                    style={getEstiloFila(item)}
                  ></td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination/>
        </div>
      </div>
    </>
  );
};

export default Tabla;
