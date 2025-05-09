import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";

const BoardModerator = () => {
  const [content, setContent] = useState("");
  const [ordenes, setOrdenes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    UserService.getModeratorBoard().then(
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

    UserService.getOrdenes().then(
      (response) => {
        setOrdenes(response.data);
        setLoading(false);
      },
      (error) => {
        console.log(error);
        setLoading(false);
      }
    );
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>Panel de Moderador</h3>
      </header>

      <div className="card mb-4">
        <div className="card-header">
          <h4>Órdenes de Compra</h4>
        </div>
        <div className="card-body">
          {loading ? (
            <div className="text-center">
              <span className="spinner-border spinner-border-lg"></span>
            </div>
          ) : ordenes.length === 0 ? (
            <p>No hay órdenes registradas</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Usuario</th>
                    <th>Fecha</th>
                    <th>Estado</th>
                    <th>Total</th>
                    <th>Detalles</th>
                  </tr>
                </thead>
                <tbody>
                  {ordenes.map((orden) => (
                    <tr key={orden.id}>
                      <td>{orden.id}</td>
                      <td>{orden.user ? orden.user.username : ""}</td>
                      <td>{new Date(orden.fecha).toLocaleDateString()}</td>
                      <td>
                        <span className={`badge ${
                          orden.estado === "completada" ? "bg-success" : 
                          orden.estado === "cancelada" ? "bg-danger" : "bg-warning"
                        }`}>
                          {orden.estado}
                        </span>
                      </td>
                      <td>${orden.total}</td>
                      <td>
                        <button 
                          className="btn btn-info btn-sm" 
                          data-toggle="collapse" 
                          data-target={`#detalles-${orden.id}`}
                        >
                          Ver detalles
                        </button>
                        <div className="collapse mt-2" id={`detalles-${orden.id}`}>
                          <div className="card card-body">
                            <h6>Detalles de la orden:</h6>
                            <ul className="list-group">
                              {orden.detalleOrdenCompras && orden.detalleOrdenCompras.map((detalle, index) => (
                                <li className="list-group-item" key={index}>
                                  {detalle.medicamento ? detalle.medicamento.nombre : "Medicamento no disponible"} x {detalle.cantidad} = ${detalle.subtotal}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BoardModerator;