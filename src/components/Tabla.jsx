import { useState } from "react";
import Prueba from "./Prueba";
import TituloTabla from "./TituloTabla";
import Pagination from "./Pagination";
import { ToggleSwitch } from "flowbite-react";
import Running from '../assets/pexels-pixabay-54326.jpg';
const Tabla = (props) => {
  const datos = props.data;
  const [itemsPage, setItemsPage] = useState(1500);
  const [currentPage, setCurrentPage] = useState(1);

  const lastIndex = currentPage * itemsPage;
  const firstIndex = lastIndex - itemsPage;

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
      Id,
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
      mensaje += "Este rango esta sospechoso";
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
      mensaje += `Distancia: ${DistanceInMeters} m
       | Ritmo cardiado : ${AverageHeartRateInBeatsPerMinute} | Duración: ${DurationInSeconds} seg  No son congruentes estas medidas para la actividad `;
    }

    return esSospechosa ? { backgroundColor: "red", mensaje: mensaje } : {};
  };

  const [filtroActivo, setFiltroActivo] = useState(false);

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
    });

  return (
    <>
      <div className="w-full bg-white"
      >
        <div className="container mx-auto my-3 h-auto border-2 border-black"
           style={
            {
              backgroundImage : `url(${Running})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }
          } >
            <Prueba />
            <div className="container flex gap-3 items-center my-2 mx-2 ">
            <ToggleSwitch checked={filtroActivo} onChange={toggleFiltro} />
            <h5 className="italic text-sm font-bold text-white">
              Activar Filtro - Rangos Actividad Sospechosa
            </h5>
          </div>
          <table className="table-auto text-center border-2 border-black items-center text-white h-[70%] p-2 ">
            <thead>
              <tr className="">
                <TituloTabla
                  text="Id"
                  className="border-2 border-black p-3 text-sm"
                  />
                <TituloTabla
                  text="Tiempo inicial en segundos"
                  className="border-2 border-black p-3 text-sm"
                  />
                <TituloTabla
                  text="Duración en segundos"
                  className="border-2 border-black p-3 text-sm"
                  />
                <TituloTabla
                  text="Duración en metros"
                  className="border-2 border-black p-3 text-sm"
                  />
                <TituloTabla
                  text="Pasos"
                  className="border-2 border-black p-3 text-sm"
                  />
                <TituloTabla
                  text="Velocidad media metros por segundos"
                  className="border-2 border-black p-3 text-sm"
                  />
                <TituloTabla
                  text="Ritmo medio en minutos por Km"
                  className="border-2 border-black p-3 text-sm"
                  />
                <TituloTabla
                  text="Ritmo cardiaco medio"
                  className="border-2 border-black p-3 text-sm"
                  />
                <TituloTabla
                  text="Actividad sospechosa"
                  className="border-2 border-black p-3 text-sm"
                  />
              </tr>
            </thead>
            <tbody>
              {actividadesFiltradas.map((item) => {
                const res = getEstiloFila(item);
                const { mensaje, ...estilos } = res;
                
                return (
                  <tr key={item.Id} className="border-b-2 border-black">
                    <td className="border-r-2  border-black">{item.Id}</td>
                    <td className="border-r-2  border-black">
                      {item.StartTimeInSeconds}
                    </td>
                    <td className="border-r-2  border-black" style={estilos}>
                      {item.DurationInSeconds}
                    </td>
                    <td className="border-r-2  border-black" style={estilos}>
                      {item.DistanceInMeters}
                    </td>
                    <td className="border-r-2  border-black">{item.Steps}</td>
                    <td className="border-r-2  border-black">
                      {item.AverageSpeedInMetersPerSecond}
                    </td>
                    <td className="border-r-2  border-black">
                      {item.AveragePaceInMinutesPerKilometer}
                    </td>
                    <td className="border-r-2  border-black" style={estilos}>
                      {item.AverageHeartRateInBeatsPerMinute}
                    </td>
                    <td className="border-r-2  border-black" style={estilos}>
                      <p className="text-sm flex flex-row">{mensaje}</p>
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
