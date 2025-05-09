import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";

const Home = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>Sistema de Gestión de Farmacia</h3>
      </header>
      <p>Bienvenido al sistema de gestión de farmacia. Inicie sesión para acceder a las funcionalidades.</p>
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h4>Características</h4>
            </div>
            <div className="card-body">
              <ul>
                <li>Gestión de medicamentos</li>
                <li>Gestión de laboratorios</li>
                <li>Órdenes de compra</li>
                <li>Control de inventario</li>
                <li>Sistema de autenticación y autorización basado en roles</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h4>Roles de Usuario</h4>
            </div>
            <div className="card-body">
              <ul>
                <li><strong>Usuario:</strong> Puede ver medicamentos y realizar órdenes</li>
                <li><strong>Moderador:</strong> Puede gestionar medicamentos</li>
                <li><strong>Administrador:</strong> Acceso completo al sistema</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;