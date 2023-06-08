import React, { useEffect, useRef, useState } from 'react'
import '../styles/Accesos.css'
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextProvider';

import QRCode from 'qrcode.react';
import Modal from 'react-modal';

import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';


export default function Accesos() {
  const { setNotification } = useStateContext()

  const [selectedTab, setSelectedTab] = useState('manual');

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };



  const [ingreso, setIngreso] = useState('');
  const [salida, setSalida] = useState('');
  const [duracion, setDuracion] = useState('');
  const [costo, setCosto] = useState('');

  //contantes parte 1
  const [isEditable, setIsEditable] = useState(true);

  const handleSelect = () => {
    setIsEditable(false);
  };

  const handleEdit = () => {
    setIsEditable(true);
    setSpaceId('');
  };

  //constantes parte 2



  const [numbers, setNumbers] = useState([]);
  const [letters, setLetters] = useState([]);
  const [selectedNumber, setSelectedNumber] = useState("");
  const [selectedLetter, setSelectedLetter] = useState("");

  const handleNumberChange = (e) => {
    setSelectedNumber(e.target.value);
  };

  const handleLetterChange = (e) => {
    setSelectedLetter(e.target.value);
  };

  const [spaceId, setSpaceId] = useState("");

  //constantes parte 3

  const [licensePlate, setLicensePlate] = useState('');

  const handleInputChange = (e) => {
    setLicensePlate(e.target.value);
  };

  const handleRegister = () => {
    if (!isEditable) {
      console.log(licensePlate);
      console.log('hola');
      axiosClient.post('registrar-ingreso', {
        placa: licensePlate,
      })
        .then((response) => {
          setSpaceId(response.data.id_espacio);
          setNotification('Se ha registrado el ingreso')
        })
        .catch((error) => {
          if (error.response) {
            console.error('Server responded with status code', error.response.status);
            console.error('Response data:', error.response.data);
          } else if (error.request) {
            console.error('No response was received', error.request);
          } else {
            console.error('Error', error.message);
          }
        });
    }
  };

  //constantes parte 4

  const [isEditable2, setIsEditable2] = useState(true);

  const handleSelect2 = () => {
    setIsEditable2(false);
  };

  const handleEdit2 = () => {
    setIsEditable2(true);
    setDatoSalida('');
    setIngreso('');
    setSalida('');
    setCosto('');
    setDuracion('');
  };

  const [licensePlate2, setLicensePlate2] = useState('');

  const handleInputChange2 = (e) => {
    setLicensePlate2(e.target.value);
  };

  //constantes parte 5
  const [datoSalida, setDatoSalida] = useState([]);
  const [idDeuda, setIdDeuda] = useState();

  const handleRegister2 = () => {
    if (!isEditable2) {
      console.log(licensePlate2);
      console.log('hola2');
      axiosClient.post('registrar-salida', {
        placa: licensePlate2,
      })
        .then((response) => {
          setDatoSalida(response.data);
          setIngreso(response.data.hora_ingreso);
          setSalida(response.data.hora_salida);
          setDuracion(response.data.tiempo_estadia);
          setCosto(response.data.costo);
          setIdDeuda(response.data.id_deuda);
          setNotification('Se ha registrado la salida')
        })
        .catch((error) => {
          if (error.response) {
            console.error('Server responded with status code', error.response.status);
            console.error('Response data:', error.response.data);
          } else if (error.request) {
            console.error('No response was received', error.request);
          } else {
            console.error('Error', error.message);
          }
        });
    }
  };

  //constantes parte 6
      //Efectivo
      const [modalIsOpen2, setIsOpen2] = useState(false);

      const openModal2 = () => {
        setIsOpen2(true);
      }
    
      const closeModal2 = () => {
        setIsOpen2(false);
      }
 
      
     //QR
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  const facturaRef = useRef();

  const downloadPDF = () => {
    const printButtons = document.getElementsByClassName('no-print');
    for (let i = 0; i < printButtons.length; i++) {
      printButtons[i].style.display = 'none';
    }

    html2canvas(facturaRef.current).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', [canvas.width * 0.2645833333, canvas.height * 0.2645833333]); // Crear PDF con dimensiones basadas en tamaño de imagen
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width * 0.2645833333, canvas.height * 0.2645833333);
      pdf.save("factura.pdf");

      for (let i = 0; i < printButtons.length; i++) {
        printButtons[i].style.display = 'block';
      }
    });
  }

  useEffect(() => {
    getNumerosLetras();

    // Aquí puedes obtener los valores desde la ruta y asignarlos a los estados correspondientes
    // Por ejemplo:
    // const data = obtenerValoresDesdeRuta();
    // setIngreso(data.ingreso);
    // setSalida(data.salida);
    // setDuracion(data.duracion);
    // setCosto(data.costo);
  }, []);

  //espacio 2
  const getNumerosLetras = () => {
    axiosClient.get('/espacios-libres')
      .then(res => {
        const response = res.data;
        let tempNumbers = [];
        let tempLetters = [];

        for (let i = 0; i < response.length; i++) {
          let number = response[i].match(/\d+/)[0]; // extract number
          let letter = response[i].match(/[a-zA-Z]+/)[0]; // extract letter

          if (!tempNumbers.includes(number)) {
            tempNumbers.push(number);
          }
          if (!tempLetters.includes(letter)) {
            tempLetters.push(letter);
          }
        }

        setNumbers(tempNumbers);
        setLetters(tempLetters);
      });
  }

  const getIdEspacio = () => {
    axiosClient.get('/obtenerEspacio')
      .then(res => {
        setSpaceId(res.data);
      });
  }

  return (
    // <div className="container">
    //   <div className="top">
    //     <div className="section"></div>
    //     <div className="section"></div>
    //     <div className="section"></div>
    //   </div>
    //   <div className="bottom"></div>

    // </div>
    <div className="container">
      <div className="top">
        <div className="part part1">
          <h2>Ingreso:</h2>
          <p>Placa Vehiculo:</p>
          <input
            type="text"
            className={isEditable ? "textbox" : "textbox non-editable"}
            readOnly={!isEditable}
            value={licensePlate}
            onChange={handleInputChange}
          />
          <div>
            <button onClick={handleSelect}>Seleccionar</button>
            <button onClick={handleEdit}>Editar</button>
          </div>
        </div>

        <div className="part part2">
          <div>
            <div className="tab-container">
              <div
                className={`tab ${selectedTab === 'manual' ? 'selected' : ''}`}
                onClick={() => handleTabChange('manual')}
              >
                Manual
              </div>
              <div
                className={`tab ${selectedTab === 'automatico' ? 'selected' : ''}`}
                onClick={() => handleTabChange('automatico')}
              >
                Automatico
              </div>
            </div>

            <div className={`content ${selectedTab}`}>
              {selectedTab === 'manual' ? (
                <div className='automatico-container'>
                  <p>Seleccionar espacio:</p>
                  <div className="dropdown-container">
                    <div className="dropdown">
                      <label htmlFor="numberDropdown">Número:</label>
                      <select id="numberDropdown" value={selectedNumber} onChange={handleNumberChange}>
                        <option value="">Seleccionar número</option>
                        {numbers.map((number, index) => (
                          <option key={index} value={number}>{number}</option>
                        ))}
                      </select>
                    </div>

                    <div className="dropdown">
                      <label htmlFor="letterDropdown">Letra:</label>
                      <select id="letterDropdown" value={selectedLetter} onChange={handleLetterChange}>
                        <option value="">Seleccionar letra</option>
                        {letters.map((letter, index) => (
                          <option key={index} value={letter}>{letter}</option>
                        ))}
                      </select>
                    </div>



                  </div>
                  <div className="combination-box">

                    {selectedNumber && selectedLetter && (
                      <h2>
                        {selectedNumber}{selectedLetter}
                      </h2>
                    )}
                  </div>


                </div>
              ) : (
                <div>
                  <div className='automatico-container'>

                    <p>Espacio:</p>
                    <div className="combination-box">
                      <h2>
                        {spaceId}
                      </h2>
                    </div>


                  </div>


                </div>
              )}
            </div>
          </div>


        </div>
        <div className="part part3">
          <button className="registerButton" onClick={handleRegister}>Registrar</button>

        </div>
      </div>
      <div className="bottom">
        <div className="part part4">

          <h2>Salida:</h2>
          <p>Placa Vehiculo:</p>
          <input
            type="text"
            className={isEditable2 ? "textbox" : "textbox non-editable"}
            readOnly={!isEditable2}
            value={licensePlate2}
            onChange={handleInputChange2}
          />
          <div>
            <button onClick={handleSelect2}>Seleccionar</button>
            <button onClick={handleEdit2}>Editar</button>
            <div />
          </div>
        </div>

        <div className="part part5">
          <button className="registerButton" onClick={handleRegister2}>Registrar</button>
        </div>
        <div className="part part6">

          <div className="form-container">
            <div className="form-row">
              <label>Hora de ingreso:</label>
              <input type="text" value={ingreso} readOnly />
            </div>
            <div className="form-row">
              <label>Hora de salida:</label>
              <input type="text" value={salida} readOnly />
            </div>
            <div className="form-row">
              <label>Duración de la estadía:</label>
              <textarea value={duracion} readOnly />
            </div>
            <div className="form-row">
              <label>Costo:</label>
              <input type="number" value={costo} readOnly />
            </div>
          </div>

          <div>
            Pagar:
            <div>
              <button onClick={openModal2}>Efectivo</button>
              <Modal
                isOpen={modalIsOpen2}
                onRequestClose={closeModal2}
                contentLabel="Modal de Pago"
                className="modal"
              >
                <div className="factura" ref={facturaRef}>
                  <div className="detalles">
                    <p>Deuda nº: {idDeuda}</p>
                    <p>Costo: {costo}</p>
                    <p>Duracion: {duracion}</p>
                    <p>Costo primera hora: x</p>
                    <p>Costo hora adicional: x</p>
                  </div>
                  <div className="buttons no-print">
                    <button onClick={downloadPDF}>Imprimir</button>
                    <button>Pagar</button>
                  </div>
                </div>
              </Modal>
            


              <button onClick={openModal}>Qr</button>
              <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Modal de Pago"
                className="modal"
              >
                <div className="factura" ref={facturaRef}>
                  <div className="detalles">
                    <p>Deuda nº: {idDeuda}</p>
                    <p>Costo: {costo}</p>
                    <p>Duracion: {duracion}</p>
                    <p>Costo primera hora: x</p>
                    <p>Costo hora adicional: x</p>
                  </div>
                  <QRCode value={`http://localhost:8000/${idDeuda}`} />
                  <div className="buttons no-print">
                    <button onClick={downloadPDF}>Imprimir</button>
                    <button>Pagar</button>
                  </div>
                </div>
              </Modal>

            </div>

          </div>

        </div>
      </div>
    </div>
  )
}
