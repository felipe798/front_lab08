import axios from "axios"; 
import authHeader from "./auth-header";

const API_URL = "https://farmacia-back-2.onrender.com/api/";

const getPublicContent = () => {
  return axios.get(API_URL + "test/all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "test/user", { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "test/mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "test/admin", { headers: authHeader() });
};

// Servicios de Farmacia
const getMedicamentos = () => {
  return axios.get(API_URL + "medicamentos");
};

const getMedicamento = (id) => {
  return axios.get(API_URL + `medicamentos/${id}`);
};

const createMedicamento = (data) => {
  return axios.post(API_URL + "medicamentos", data, { headers: authHeader() });
};

const updateMedicamento = (id, data) => {
  return axios.put(API_URL + `medicamentos/${id}`, data, { headers: authHeader() });
};

const deleteMedicamento = (id) => {
  return axios.delete(API_URL + `medicamentos/${id}`, { headers: authHeader() });
};

const getLaboratorios = () => {
  return axios.get(API_URL + "laboratorios");
};

// Añadir la función que falta para crear laboratorios
const createLaboratorio = (data) => {
  return axios.post(API_URL + "laboratorios", data, { headers: authHeader() });
};

// Añadir también estas funciones para completar las operaciones CRUD de laboratorios
const updateLaboratorio = (id, data) => {
  return axios.put(API_URL + `laboratorios/${id}`, data, { headers: authHeader() });
};

const deleteLaboratorio = (id) => {
  return axios.delete(API_URL + `laboratorios/${id}`, { headers: authHeader() });
};

const createOrdenCompra = (detalles) => {
  return axios.post(API_URL + "ordenes", { detalles }, { headers: authHeader() });
};

const getOrdenes = () => {
  return axios.get(API_URL + "ordenes", { headers: authHeader() });
};

const UserService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  getMedicamentos,
  getMedicamento,
  createMedicamento,
  updateMedicamento,
  deleteMedicamento,
  getLaboratorios,
  createLaboratorio,  // Añadir esta función
  updateLaboratorio,  // Opcional, para completar el CRUD
  deleteLaboratorio,  // Opcional, para completar el CRUD
  createOrdenCompra,
  getOrdenes
};

export default UserService;