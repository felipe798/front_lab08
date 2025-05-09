import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";

const BoardAdmin = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getAdminBoard().then(
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
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>Panel de Administrador</h3>
      </header>
      <p>Bienvenido al panel de administración. Aquí puede gestionar todo el sistema.</p>
      <div className="row">
        <div className="col-md-4 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Gestión de Medicamentos</h5>
              <p className="card-text">Administre el inventario de medicamentos.</p>
              <a href="/medicamentos" className="btn btn-primary">Ir a Medicamentos</a>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Gestión de Laboratorios</h5>
              <p className="card-text">Administre los laboratorios proveedores.</p>
              <a href="/laboratorios" className="btn btn-primary">Ir a Laboratorios</a>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Panel de Moderador</h5>
              <p className="card-text">Ver órdenes de compra y detalles.</p>
              <a href="/mod" className="btn btn-primary">Ir a Panel Moderador</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardAdmin;