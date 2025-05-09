import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";

const Medicamentos = () => {
  const [medicamentos, setMedicamentos] = useState([]);
  const [laboratorios, setLaboratorios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [currentUser, setCurrentUser] = useState(undefined);
  
  // Estado para el formulario
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    fechaVencimiento: "",
    laboratorioId: ""
  });

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }

    UserService.getMedicamentos().then(
      (response) => {
        setMedicamentos(response.data);
        setLoading(false);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setMessage(_content);
        setLoading(false);
      }
    );

    UserService.getLaboratorios().then(
      (response) => {
        setLaboratorios(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validación básica
    if (!formData.nombre || !formData.precio) {
      setMessage("El nombre y precio son obligatorios");
      return;
    }

    // Convertir valores numéricos
    const medicamentoData = {
      ...formData,
      precio: parseFloat(formData.precio),
      stock: parseInt(formData.stock),
      laboratorioId: parseInt(formData.laboratorioId)
    };

    UserService.createMedicamento(medicamentoData).then(
      (response) => {
        setMessage("Medicamento creado exitosamente");
        // Refrescar la lista
        UserService.getMedicamentos().then(
          (response) => {
            setMedicamentos(response.data);
          }
        );
        // Limpiar formulario
        setFormData({
          nombre: "",
          descripcion: "",
          precio: "",
          stock: "",
          fechaVencimiento: "",
          laboratorioId: ""
        });
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

  const eliminarMedicamento = (id) => {
    if (window.confirm("¿Está seguro de eliminar este medicamento?")) {
      UserService.deleteMedicamento(id).then(
        (response) => {
          setMessage("Medicamento eliminado exitosamente");
          // Refrescar la lista
          setMedicamentos(medicamentos.filter(med => med.id !== id));
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
    }
  };

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>Gestión de Medicamentos</h3>
      </header>

      {message && (
        <div className="alert alert-info" role="alert">
          {message}
        </div>
      )}

      {currentUser && (currentUser.roles.includes("ROLE_ADMIN") || currentUser.roles.includes("ROLE_MODERATOR")) && (
        <div className="row mb-4">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h4>Nuevo Medicamento</h4>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="nombre">Nombre</label>
                    <input
                      type="text"
                      className="form-control"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="descripcion">Descripción</label>
                    <textarea
                      className="form-control"
                      name="descripcion"
                      value={formData.descripcion}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group col-md-4">
                      <label htmlFor="precio">Precio</label>
                      <label htmlFor="precio">Precio</label>
                      <input
                        type="number"
                        step="0.01"
                        className="form-control"
                        name="precio"
                        value={formData.precio}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="form-group col-md-4">
                      <label htmlFor="stock">Stock</label>
                      <input
                        type="number"
                        className="form-control"
                        name="stock"
                        value={formData.stock}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="form-group col-md-4">
                      <label htmlFor="fechaVencimiento">Fecha Vencimiento</label>
                      <input
                        type="date"
                        className="form-control"
                        name="fechaVencimiento"
                        value={formData.fechaVencimiento}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="laboratorioId">Laboratorio</label>
                    <select
                      className="form-control"
                      name="laboratorioId"
                      value={formData.laboratorioId}
                      onChange={handleInputChange}
                    >
                      <option value="">Seleccione un laboratorio</option>
                      {laboratorios.map((lab) => (
                        <option key={lab.id} value={lab.id}>
                          {lab.nombre}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Guardar
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="row">
        {loading ? (
          <div className="col-md-12 text-center">
            <span className="spinner-border spinner-border-lg"></span>
          </div>
        ) : (
          <div className="col-md-12">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Vencimiento</th>
                  <th>Laboratorio</th>
                  {currentUser && (currentUser.roles.includes("ROLE_ADMIN") || currentUser.roles.includes("ROLE_MODERATOR")) && (
                    <th>Acciones</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {medicamentos.map((med) => (
                  <tr key={med.id}>
                    <td>{med.id}</td>
                    <td>{med.nombre}</td>
                    <td>{med.descripcion}</td>
                    <td>${med.precio}</td>
                    <td>{med.stock}</td>
                    <td>{med.fechaVencimiento ? new Date(med.fechaVencimiento).toLocaleDateString() : ""}</td>
                    <td>{med.laboratorio ? med.laboratorio.nombre : ""}</td>
                    {currentUser && (currentUser.roles.includes("ROLE_ADMIN") || currentUser.roles.includes("ROLE_MODERATOR")) && (
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => eliminarMedicamento(med.id)}
                        >
                          Eliminar
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Medicamentos;