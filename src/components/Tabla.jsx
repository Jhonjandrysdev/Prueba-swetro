import { useState } from "react";
import Prueba from "./Prueba";
import TituloTabla from "./TituloTabla";
import Pagination from "./Pagination";
import { ToggleSwitch } from "flowbite-react";
const Tabla = (props) => {
  const datos = props.data;
  const [filtroActivo, setFiltroActivo] = useState(false);
  const [itemsPage, setItemsPage] = useState(1000);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const lastIndex = currentPage * itemsPage;
  const firstIndex = lastIndex - itemsPage;

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const clearSearch = () => {
    setSearchTerm("");
  };

  const items = datos.length;
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

  const getEstiloFila = (actividad) => {
    const {
      AverageHeartRateInBeatsPerMinute,
      DurationInSeconds,
      DistanceInMeters,
    } = actividad;

    const dateAverageDistanceInMetersHigh = DurationInSeconds / 60;
    const exactlyAverageDistanceInMetersHigh = parseInt(
      dateAverageDistanceInMetersHigh
    );
    let mensaje = "";
    if (
      AverageHeartRateInBeatsPerMinute < averageHeartRateLow ||
      AverageHeartRateInBeatsPerMinute > averageHeartRateHigh
    ) {
      mensaje = "Este rango esta sospechoso";
    }

    if (
      DurationInSeconds / 60 === averageDurationLow ||
      DurationInSeconds / 60 === averageDurationHigh
    ) {
      mensaje += "Tiempo sospechoso";
    }

    if (
      exactlyAverageDistanceInMetersHigh === averageDistanceInMetersLow ||
      exactlyAverageDistanceInMetersHigh >= averageDistanceInMetersHigh
    ) {
      mensaje += "Distancia irregular";
    }

    const esSospechosa =
      AverageHeartRateInBeatsPerMinute === 0 ||
      DurationInSeconds === 0 ||
      DistanceInMeters === 0 ||
      AverageHeartRateInBeatsPerMinute < averageHeartRate / 2 ||
      DurationInSeconds > averageDuration * 2 ||
      DistanceInMeters > averageDistanceInMeters * 2;

    if (esSospechosa) {
      mensaje = `Distancia: ${DistanceInMeters}
       | Ritmo cardiado : ${AverageHeartRateInBeatsPerMinute} | Duración: ${DurationInSeconds} seg 
        Los resultados no son coherentes entre si `;
    }

    return esSospechosa ? { backgroundColor: "#e92a2a", mensaje: mensaje } : {};
  };

  const toggleFiltro = () => {
    setFiltroActivo(!filtroActivo);
  };

  const actividadesFiltradas = datos
    .slice(firstIndex, lastIndex)
    .filter((actividad) => {
      if (filtroActivo) {
        return (
          (actividad.AverageHeartRateInBeatsPerMinute < 90 &&
            actividad.DurationInSeconds > 2 * 2775.86) ||
          actividad.DistanceInMeters > 2 * 6494.885
        );
      } else {
        return true;
      }
    })
    .filter((actividad) => {
      // Filtrado basado solo en el ID si hay un término de búsqueda
      return searchTerm ? actividad.Id.toString() === searchTerm : true;
    });

  return (
    <>
      <div className="w-full bg-gradient-to-r from-blue-600">
        <div className="container mx-auto h-auto border-b border-white">
          <Prueba />
          <div className="container flex items-center my-2 mx-2 text-white justify-center gap-5 ">
            <ToggleSwitch checked={filtroActivo} onChange={toggleFiltro} />
            <h5 className="italic text-sm font-bold">
              Activar Filtro - Rangos Actividad Sospechosa
            </h5>
            <div className="flex gap-2 items-center mb-3">
              <input
                type="text"
                className="text-black px-3 py-2 border rounded-lg focus:border-blue-300"
                placeholder="Buscar por ID"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <button 
              onClick={clearSearch}
              className=" px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-indigo-400">
                Limpiar
                </button>
            </div>
          </div>

          <table className="mx-2 table-fixed text-center items-center h-[70vh] p-2 bg-gradient-to-l from-blue-600 border-r-2 border-white rounded-t-lg rounded-r-lg text-white shadow-md italic">
            <thead>
              <tr>
                <TituloTabla
                  text="Id"
                  className="border-b border-r border-white p-3 text-base"
                />
                <TituloTabla
                  text="UserId"
                  className="border-b border-r border-white p-3 text-base"
                />
                <TituloTabla
                  text="Tiempo inicial en segundos"
                  className="border-b border-r border-white p-3 text-base"
                />
                <TituloTabla
                  text="Duración en segundos"
                  className="border-b border-r border-white p-3 text-base"
                />
                <TituloTabla
                  text="Distancia en metros"
                  className="border-b border-r border-white p-3 text-base"
                />
                <TituloTabla
                  text="Pasos"
                  className="border-b border-r border-white p-3 text-base"
                />
                <TituloTabla
                  text="Velocidad media metros por segundos"
                  className="border-b border-r border-white p-3 text-base"
                />
                <TituloTabla
                  text="Ritmo medio en minutos por Km"
                  className="border-b border-r border-white p-3 text-base"
                />
                <TituloTabla
                  text="Ritmo cardiaco medio"
                  className="border-b border-r border-white p-3 text-base"
                />
                <TituloTabla
                  text="Actividad sospechosa"
                  className="border-b border-r border-white p-3 text-base"
                />
              </tr>
            </thead>
            <tbody>
              {actividadesFiltradas.map((item) => {
                console.log(item.UserId)
                const res = getEstiloFila(item);
                const { mensaje, ...estilos } = res;

                return (
                  <tr
                    key={item.Id}
                    className="mt-3 transition-all duration-300 "
                  >
                    <td className="mt-3 border-r-2 border-white w-[5%]">
                      {item.Id}
                    </td>
                    <td className="mt-3 border-r-2 border-white w-[5%]"
                    style={estilos}>
                      {item.UserId}
                    </td>
                    <td className="mt-3 border-r-2 border-white ">
                      {item.StartTimeInSeconds}
                    </td>
                    <td
                      className="mt-3 border-r-2 border-white "
                      style={estilos}
                    >
                      {item.DurationInSeconds}
                    </td>
                    <td
                      className="mt-3 border-r-2 border-white "
                      style={estilos}
                    >
                      {item.DistanceInMeters}
                    </td>
                    <td className="mt-3 border-r-2 border-white ">
                      {item.Steps}
                    </td>
                    <td className="mt-3 border-r-2 border-white ">
                      {item.AverageSpeedInMetersPerSecond}
                    </td>
                    <td className="mt-3 border-r-2 border-white ">
                      {item.AveragePaceInMinutesPerKilometer}
                    </td>
                    <td
                      className="mt-3 border-r-2 border-white "
                      style={estilos}
                    >
                      {item.AverageHeartRateInBeatsPerMinute}
                    </td>
                    <td
                      className="mt-3 border-r-2 border-white  w-[28%]"
                      style={estilos}
                    >
                      <p className="text-xs flex text-center p-2">{mensaje}</p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Pagination
            itemsPage={itemsPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            items={items}
          />
        </div>
      </div>
    </>
  );
};

export default Tabla;
