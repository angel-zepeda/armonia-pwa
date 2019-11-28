import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';
import './autcomplete.css';

const App = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [files, setFiles] = useState([]);
  const [value, setValue] = useState('');
  const [ventas, setVentas] = useState([]);
  const [venta, setVenta] = useState({
    fecha_final: '',
    zona: '',
    id_ventas: '',
    observaciones: '',
    id_vendedores: '',
    fecha_ventas: new Date().toJSON().slice(0, 10),
    dia_cobranza: '',
    fecha_enganche: '',
    abono: '',
    periodo: '',
    importe: '',
    cliente: '',
    calle: '',
    colonia: '',
    lado: '',
    frente: '',
    entre_calles: '',
    fachada: '',
    municipio: '',
    telefono: '',
    descuento: '',
    enganche: '',
    membresia: '',
    nombre_productos: '',
    file1: '',
    file2: ''
  });
  let telefono = 'S/T';
  let colonia = 'S/C';
  let observaciones = '';
  // const [vendedores, setVendedores] = useState([]);
  // const [zonas, setZonas] = useState([]);
  // const [clientes, setClientes] = useState([]);
  // const [productos, setProductos] = useState([]);
  const escapeRegexCharacters = (str) => { return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
  const getSuggestions = (value) => {
    const escapedValue = escapeRegexCharacters(value.trim());
    if (escapedValue === '') return [];
    const regex = new RegExp('^' + escapedValue, 'i');
    return JSON.parse(localStorage.getItem('clientes')).filter(cliente => regex.test(cliente.name));
  }
  const getSuggestionValue = (suggestion) => {
    telefono = suggestion.telefono;
    colonia = suggestion.colonia;
    observaciones = suggestion.observaciones;
    return suggestion.name;
  };
  const renderSuggestion = (suggestion) => { return (<span>{suggestion.name}</span>); }

  useEffect(() => {
    const getVendedores = async () => {
      const response = await axios.get('https://armoniacorporal.com.mx/app/descargar_catalogos.php');
      // setVendedores(response.data.vendedores);
      // setClientes(response.data.clientes);
      localStorage.setItem('vendedores', JSON.stringify(response.data.vendedores));
      localStorage.setItem('clientes', JSON.stringify(response.data.clientes));
      localStorage.setItem('productos', JSON.stringify(response.data.productos));
    }
    getVendedores();
  }, [])


  const handleChange = e => {
    if (e.target.files) {
      setVenta({ ...venta, [e.target.name]: e.target.files[0].name });
      setFiles([...files, e.target.files[0]]);
    } else { setVenta({ ...venta, [e.target.name]: e.target.value }); }
  }

  const sendFiles = async () => {

    for (let i = 0; i <= files.length; i++) {
      let reader = new FileReader();
      reader.onloadend = function () {
        var b64 = reader.result.replace(/^data:.+;base64,/, '');
        console.log(b64);
      };

      reader.readAsDataURL(files[i]);
    }


  }

  const handleSubmit = e => {
    e.preventDefault();
    sendFiles();
    setVentas([...ventas, venta]);
    setVenta({
      fecha_final: '',
      zona: '',
      id_ventas: '',
      id_vendedores: '',
      fecha_ventas: new Date().toJSON().slice(0, 10),
      dia_cobranza: '',
      fecha_enganche: '',
      abono: '',
      periodo: '',
      importe: '',
      cliente: '',
      calle: '',
      colonia: '',
      lado: '',
      ubicacion: '',
      frente: '',
      entre_calles: '',
      fachada: '',
      municipio: '',
      telefono: '',
      descuento: '',
      enganche: '',
      observaciones: '',
      membresia: '',
      nombre_productos: '',
    });
    alert("Se guardó correctamente");
  }

  localStorage.setItem('data', JSON.stringify(ventas));

  const sendData = async () => {
    await axios.post('https://armoniacorporal.com.mx/app/subir_ventas.php', JSON.parse(localStorage.getItem('data')));
  }

  const onChange = (event, { newValue, method }) => {
    setValue(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }) => {

    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    // console.log("CLICK", value, telefono);
    setVenta({ ...venta, cliente: value, telefono: telefono, colonia: colonia, observaciones: observaciones })
    setSuggestions([]);
  };

  return (
    <div >

      <nav className="navbar navbar-light bg-secondary">
        <div className="navbar-brand">
          <img src="icono.jpeg" width="30" height="30" className="d-inline-block align-top rounded text-white" alt="" />
        </div>
        <div className="float-right">

          <button
            type="submit"
            onClick={sendData}
            className="btn btn-light text-primary"
          >
            <i style={{ fontSize: '2em', verticalAlign: 'middle' }} className="material-icons">sync</i>
          </button>
        </div>
      </nav>
      <div className="container p-4">
        <form
          onSubmit={handleSubmit}
          id="form_edicion" autoComplete="off"
        >
          <label>Cliente</label>
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={{
              placeholder: "Escribe el nombre del cliente",
              value,
              onChange: onChange
            }}
          />
          <div className="form-group">
            <label htmlFor="observaciones">Observaciones:</label>
            <textarea value={venta.observaciones} onChange={handleChange} className="form-control" name="observaciones" id="observaciones" />
          </div>

          <div className="form-group mb-2">
            <label htmlFor="zona">Zona:</label>
            <select
              onChange={handleChange}
              className="form-control" id="zona" name="zona">
              <option>A</option>
              <option>B</option>
              <option>C</option>
              <option>D</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="id_vendedores">Vendedor:</label>
            <select onChange={handleChange} className="form-control" name="id_vendedores">
              <option>Elige...</option>
              {
                JSON.parse(localStorage.getItem('vendedores')) === null ?
                  alert("Conectate a internet para descargar el catalogo de vendedores")
                  : JSON.parse(localStorage.getItem('vendedores')).map(vendedor => <option value={vendedor} key={vendedor}>{vendedor}</option>)
              }
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="id_ventas">Cuenta:</label>
            <input value={venta.id_ventas} onChange={handleChange} className="form-control" name="id_ventas" id="id_ventas" />
          </div>

          <div className="form-group">
            <label htmlFor="fecha_ventas">Fecha:</label>
            <input value={venta.fecha_ventas} onChange={handleChange} className="form-control mb-2" type="date" name="fecha_ventas" id="fecha_ventas" />
          </div>

          <div className="form-group">
            <label htmlFor="cliente">Cliente:</label>
            <input value={venta.cliente} className="form-control" name="cliente" id="cliente" />
          </div>

          <div className="form-group">
            <label htmlFor="ubicacion">Ubicación:</label>
            <input value={venta.ubicacion} onChange={handleChange} className="form-control " name="ubicacion" id="ubicacion" />
          </div>

          <div className="form-group">
            <label htmlFor="telefono">Teléfono:</label>
            <input value={venta.telefono} onChange={handleChange} className="form-control " name="telefono" id="telefono" />
          </div>

          <div className="form-group">
            <label htmlFor="membresia">Membresía:</label>
            <input value={venta.membresia} onChange={handleChange} className="form-control " name="membresia" id="membresia" />
          </div>

          <div className="form-group">
            <label htmlFor="calle">Colonia:</label>
            <input value={venta.colonia} onChange={handleChange} className="form-control " name="colonia" id="colonia" />
          </div>

          <div className="form-group">
            <label htmlFor="calle">Calle:</label>
            <input value={venta.calle} onChange={handleChange} className="form-control " name="calle" id="calle" />
          </div>

          <div className="form-group">
            <label htmlFor="lado">A Lado De:</label>
            <input value={venta.lado} onChange={handleChange} className="form-control " name="lado" id="lado" />
          </div>

          <div className="form-group">
            <label htmlFor="frente">Frente:</label>
            <input value={venta.frente} onChange={handleChange} className="form-control " name="frente" id="frente" />
          </div>

          <div className="form-group">
            <label htmlFor="entre_calles">Entre Calles:</label>
            <input value={venta.entre_calles} onChange={handleChange} className="form-control " name="entre_calles" id="entre_calles" />
          </div>

          <div className="form-group">
            <label htmlFor="fachada">Fachada:</label>
            <input value={venta.fachada} onChange={handleChange} className="form-control " name="fachada" id="fachada" />
          </div>
          <hr />
          <div className="form-group">
            <label htmlFor="nombre_productos">Producto:</label>
            <select onChange={handleChange} className="form-control" id="nombre_productos" name="nombre_productos" >
              <option>Elige...</option>
              {
                JSON.parse(localStorage.getItem('productos')) === null ?
                  alert("Conectate a internet para descargar el catalogo de productos")
                  : JSON.parse(localStorage.getItem('productos')).map(producto => <option value={producto} key={producto}>{producto}</option>)
              }
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="importe">Importe:</label>
            <input value={venta.importe} onChange={handleChange} type="number" className="form-control " name="importe" id="importe" />
          </div>

          <div className="form-group">
            <label htmlFor="descuento">Descuento:</label>
            <input value={venta.descuento} onChange={handleChange} type="number" className="form-control " name="descuento" id="descuento" />
          </div>

          <div className="form-group">
            <label htmlFor="enganche">Enganche:</label>
            <input value={venta.enganche} onChange={handleChange} type="number" className="form-control " name="enganche" id="enganche" />
          </div>
          <div className="form-group">
            <label htmlFor="dia_cobranza">Día de Cobro:</label>

            <select onChange={handleChange} className="form-control" name="dia_cobranza" id="dia_cobranza" required>
              <option value="" >Elige...</option>
              <option value="LUNES">LUNES</option>
              <option value="MARTES">MARTES</option>
              <option value="MIÉRCOLES">MIÉRCOLES</option>
              <option value="JUEVES">JUEVES</option>
              <option value="VIERNES">VIERNES</option>
              <option value="SÁBADO">SÁBADO</option>
              <option value="DOMINGO">DOMINGO</option>
              <option value="SEMANAL">SEMANAL</option>
              <option value="QUINCENAL">QUINCENAL</option>
              <option value="MENSUAL">MENSUAL</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="enganche">Fecha de Primer Pago:</label>
            <input value={venta.fecha_enganche} onChange={handleChange} type="text" className="form-control " name="fecha_enganche" id="fecha_enganche" />
          </div>

          <div className="form-group">
            <label htmlFor="enganche">Abono:</label>
            <input value={venta.abono} onChange={handleChange} type="number" className="form-control " name="abono" id="abono" />
          </div>
          <div className="form-group">
            <label >Período:</label>
            <select onChange={handleChange} className="form-control mb-2" name="periodo" id="periodo" required>
              <option value="" >Elige..</option>
              <option>SEMANAL</option>
              <option >QUINCENAL</option>
              <option >MENSUAL</option>
            </select>
          </div>
          <div className="custom-file">
            <input onChange={handleChange} type="file" name="file1" className="custom-file-input" />
            <label className="custom-file-label" htmlFor="inputGroupFile02">Elige un archivo</label>
          </div>
          <hr />
          <div className="custom-file">
            <input onChange={handleChange} type="file" name="file2" className="custom-file-input" />
            <label className="custom-file-label" htmlFor="inputGroupFile02">Elige un archivo</label>
          </div>
          <button
            type="submit"
            className="btn btn-primary col-12 mt-2"
          >
            Enviar
        </button>
        </form>
      </div>
    </div >
  );
}

export default App;