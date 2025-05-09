import React from "react";
import AuthService from "../services/auth.service";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>Perfil de Usuario</h3>
      </header>
      {currentUser ? (
        <div>
          <p>
            <strong>Id:</strong> {currentUser.id}
          </p>
          <p>
            <strong>Usuario:</strong> {currentUser.username}
          </p>
          <p>
            <strong>Email:</strong> {currentUser.email}
          </p>
          <strong>Roles:</strong>
          <ul>
            {currentUser.roles &&
              currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
          </ul>
        </div>
      ) : (
        <div className="alert alert-danger">
          Por favor inicie sesión primero.
        </div>
      )}
    </div>
  );
};

export default Profile;