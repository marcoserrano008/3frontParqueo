import React, { useState, useEffect, useCallback } from 'react';

import '../../styles/ParqueoFormulario/Parqueo.css'
// import Modal from './Modal';
import axiosClient from '../../axios-client';

const Parqueo = ({ onParqueoClick }) => {
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [filaSeleccionada, setFilaSeleccionada] = useState(null);
  const [columnaSeleccionada, setColumnaSeleccionada] = useState(null);
  const [espacios, setEspacios] = useState({});

  useEffect(() => {
    axiosClient.get('/ver-espacios')
    .then(({data}) => {
      // convierte el array en un objeto para una búsqueda más eficiente
      const espaciosObj = {};
      data.forEach(espacio => {
        espaciosObj[espacio.id_espacio] = espacio.estado;
      });
      setEspacios(espaciosObj);
      setLoading(false);
    })
    .catch(error => {
      console.log(error);
    })
  }, []);

  const handleClick = useCallback((fila, columna) => {
    console.log(`Celda clicada: fila ${fila}, columna ${columna}`);
    setFilaSeleccionada(fila);
    setColumnaSeleccionada(columna);
    setModalOpen(false);
    onParqueoClick(fila, columna); 
  }, [onParqueoClick]);

  const handleCloseModal = () => {
    setModalOpen(false);
    setFilaSeleccionada(null);
    setColumnaSeleccionada(null);
  };

  const getEstadoEspacio = (fila, columna) => {
    return espacios[`${fila}${columna}`] || 'desconocido';
  };

  const filas = [3, 5, 7, 9];

  if (loading) {
    return <div>Cargando...</div>
  }

  return (
    <div className="parqueo">
      <div className="grillaTop">
        <div className="celda fila-titulo"></div>
        {[...Array(12)].map((_, j) => {
          return (
            <div key={j} className="celda fila-titulo">
              {String.fromCharCode(65 + j)}
            </div>
          );
        })}
        {[...Array(2)].map((fila, i) => {
          return [
            <div key={`fila-titulo-${i}`} className="celda fila-titulo">
              {i + 1}
            </div>,
            [...Array(12)].map((columna, j) => {
              const estadoEspacio = getEstadoEspacio(i + 1, String.fromCharCode(65 + j));
              const celdaClassName = `celda estado-${estadoEspacio}`;
              return (
                <div
                  key={`${i}-${j}`}
                  className={celdaClassName}
                  onClick={() => handleClick(i + 1, String.fromCharCode(65 + j))}
                >
                  {i + 1}
                  {String.fromCharCode(65 + j)}
                </div>
              );
            }),
          ];
        })}
      </div>

      {filas.map((fila) => (
        <div className="grillaBot" key={`fila-${fila}`}>
          {[...Array(2)].map((_, i) => (
            <React.Fragment key={`${fila}-${i}`}>
              <div className="celda fila-titulo">{fila + i}</div>
              {[...Array(12)].map((_, j) => {
                const estadoEspacio = getEstadoEspacio(fila + i, String.fromCharCode(65 + j));
                const celdaClassName = `celda estado-${estadoEspacio}`;
                return (
                  <div
                    key={`${fila}-${i}-${j}`}
                    className={celdaClassName}
                    onClick={() => handleClick(fila + i, String.fromCharCode(65 + j))}
                    >
                    {fila + i}
                    {String.fromCharCode(65 + j)}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      ))}
      {/* <Modal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        fila={filaSeleccionada}
        columna={columnaSeleccionada}
      /> */}
    </div>
  );
};

export default Parqueo;
