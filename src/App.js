import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {

  const [venta, setVenta] = useState({
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
  });

  const [vendedores, setVendedores] = useState([
    "angel",
    "jesus",
    "zepeda"
  ]);

  useEffect(() => {
    const getVendedores = async () => {
      const response = await axios.get('http://armoniacorporal.com.mx/app/descargar_catalogos.php');
      console.log(response);
    }
    getVendedores();

  }, [])

  const handleChange = e => setVenta({ ...venta, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    localStorage.setItem('data', JSON.stringify(venta));
    console.log(localStorage.getItem('data'));
  }

  const addDays = e => {
    console.log(e.target.value)
    setVenta({
      ...venta,
      fecha_enganche: e.target.value + 7
    })
  }

  const sendData = e => {
    e.preventDefault();
    console.log("Sincronizar con base de datos");
  }

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
          id="form_edicion" autoComplete="off">
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
                vendedores.map(vendedor => (
                  <option value={vendedor} key={vendedor}>{vendedor}</option>
                ))
              }
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="id_ventas">Cuenta:</label>
            <input onChange={handleChange} className="form-control" name="id_ventas" id="id_ventas" />
          </div>

          <div className="form-group">
            <label htmlFor="fecha_ventas">Fecha:</label>
            <input value={venta.fecha_ventas} onChange={handleChange} className="form-control mb-2" type="date" name="fecha_ventas" id="fecha_ventas" />
          </div>

          <div className="form-group">
            <label htmlFor="cliente">Cliente:</label>
            <input onChange={handleChange} className="form-control" name="cliente" id="cliente" />
          </div>
          <div className="form-group">
            <label htmlFor="telefono">Teléfono:</label>
            <input onChange={handleChange} className="form-control " name="telefono" id="telefono" />
          </div>

          <div className="form-group">
            <label htmlFor="membresia">Membresía:</label>
            <input onChange={handleChange} className="form-control " name="membresia" id="membresia" />
          </div>

          <div className="form-group">
            <label htmlFor="calle">Calle:</label>
            <input onChange={handleChange} className="form-control " name="calle" id="calle" />
          </div>

          <div className="form-group">
            <label htmlFor="lado">A Lado De:</label>
            <input onChange={handleChange} className="form-control " name="lado" id="lado" />
          </div>

          <div className="form-group">
            <label htmlFor="frente">Frente:</label>
            <input onChange={handleChange} className="form-control " name="frente" id="frente" />
          </div>

          <div className="form-group">
            <label htmlFor="entre_calles">Entre Calles:</label>
            <input onChange={handleChange} className="form-control " name="entre_calles" id="entre_calles" />
          </div>

          <div className="form-group">
            <label htmlFor="fachada">Fachada:</label>
            <input onChange={handleChange} className="form-control " name="fachada" id="fachada" />
          </div>

          <div className="form-group">
            <label htmlFor="ubicacion">Ubicación:</label>
            <input onChange={handleChange} className="form-control " name="ubicacion" id="ubicacion" />
          </div>

          <hr />

          <div className="form-group">
            <label htmlFor="nombre_productos">Producto:</label>
            <select onChange={handleChange} className="form-control" id="nombre_productos" name="nombre_productos" >
              <option>COLAGENO</option>
              <option>MANGOSTAN</option>
              <option>TICTIL</option>
              <option>ALCACHOFA</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="importe">Importe:</label>
            <input onChange={handleChange} type="number" className="form-control " name="importe" id="importe" />
          </div>

          <div className="form-group">
            <label htmlFor="descuento">Descuento:</label>
            <input onChange={handleChange} type="number" className="form-control " name="descuento" id="descuento" />
          </div>

          <div className="form-group">
            <label htmlFor="enganche">Enganche:</label>
            <input onChange={handleChange} type="number" className="form-control " name="enganche" id="enganche" />
          </div>
          <div className="form-group">
            <label htmlFor="dia_cobranza">Día de Cobro:</label>
            <select onChange={handleChange, addDays} className="form-control" name="dia_cobranza" id="dia_cobranza" required>
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
            <input onChange={handleChange} type="number" className="form-control " name="abono" id="abono" />
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