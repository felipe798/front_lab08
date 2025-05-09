import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";

const BoardUser = () => {
  const [content, setContent] = useState("");
  const [medicamentos, setMedicamentos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    UserService.getUserBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );

    UserService.getMedicamentos().then(
      (response) => {
        setMedicamentos(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  const agregarAlCarrito = (medicamento) => {
    const existeEnCarrito = carrito.find(item => item.id === medicamento.id);
    
    if (existeEnCarrito) {
      setCarrito(
        carrito.map(item =>
          item.id === medicamento.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      );
    } else {
      setCarrito([...carrito, { ...medicamento, cantidad: 1 }]);
    }
    
    setMessage(`${medicamento.nombre} agregado al carrito`);
    
    // Limpiar mensaje después de 3 segundos
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const eliminarDelCarrito = (id) => {
    setCarrito(carrito.filter(item => item.id !== id));
  };

  const realizarOrden = () => {
    if (carrito.length === 0) {
      setMessage("El carrito está vacío");
      return;
    }

    const detalles = carrito.map(item => ({
      medicamentoId: item.id,
      cantidad: item.cantidad
    }));

    UserService.createOrdenCompra(detalles).then(
      (response) => {
        setMessage("Orden creada exitosamente");
        setCarrito([]);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
      }
    );
  };

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>Panel de Usuario</h3>
      </header>

      {message && (
        <div className="alert alert-info" role="alert">
          {message}
        </div>
      )}

      <div className="row">
        <div className="col-md-8">
          <h4>Medicamentos Disponibles</h4>
          <div className="row">
            {medicamentos.map((med) => (
              <div className="col-md-4 mb-3" key={med.id}>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{med.nombre}</h5>
                    <p className="card-text">{med.descripcion}</p>
                    <p><strong>Precio:</strong> ${med.precio}</p>
                    <p><strong>Stock:</strong> {med.stock}</p>
                    <button 
                      className="btn btn-primary"
                      onClick={() => agregarAlCarrito(med)}
                      disabled={med.stock <= 0}
                    >
                      Agregar al carrito
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h4>Carrito de Compras</h4>
            </div>
            <div className="card-body">
              {carrito.length === 0 ? (
                <p>El carrito está vacío</p>
              ) : (
                <>
                  <ul className="list-group mb-3">
                    {carrito.map((item) => (
                      <li className="list-group-item d-flex justify-content-between align-items-center" key={item.id}>
                        {item.nombre} x {item.cantidad}
                        <span>${(item.precio * item.cantidad).toFixed(2)}</span>
                        <button 
                          className="btn btn-sm btn-danger"
                          onClick={() => eliminarDelCarrito(item.id)}
                        >
                          X
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className="d-flex justify-content-between">
                    <strong>Total:</strong>
                    <span>
                      ${carrito.reduce((total, item) => total + item.precio * item.cantidad, 0).toFixed(2)}
                    </span>
                  </div>
                  <button 
                    className="btn btn-success mt-3 w-100"
                    onClick={realizarOrden}
                  >
                    Realizar Orden
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardUser;