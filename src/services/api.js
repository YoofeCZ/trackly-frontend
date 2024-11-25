//services/api.js
import axios from 'axios';
import superagent from "superagent";

const API_URL = 'http://localhost:5000/api'; // URL backendu

// Funkce pro získání všech techniků
export const getTechnicians = async () => {
  const response = await fetch('http://localhost:5000/api/technicians');
  return response.json();
};

// Funkce pro nahrání souboru ke klientovi
export const uploadClientFile = async (clientId, formData) => {
  try {
    const response = await axios.post(`${API_URL}/clients/${clientId}/files`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Správné nastavení hlavičky
      },
    });
    return response.data;
  } catch (error) {
    console.error('Chyba při nahrávání souboru:', error);
    throw error;
  }
};

// Přihlášení uživatele
export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, { username, password });
    return response.data; // Očekáváme token
  } catch (error) {
    console.error('Chyba při přihlášení:', error.response?.data || error.message);
    throw error;
  }
};

// Vytvoření nového uživatele (pouze pro adminy)
export const createUser = async (userData, token) => {
  try {
    const response = await axios.post(`${API_URL}/users/create`, userData, {
      headers: {
        Authorization: `Bearer ${token}`, // Tento token musí být předán správně
      },
    });
    return response.data;
  } catch (error) {
    console.error('Chyba při vytváření uživatele:', error.response?.data || error.message);
    throw error;
  }
};


// Získání všech uživatelů (pouze pro adminy)
export const getUsers = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/users/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Chyba při získávání uživatelů:', error.response?.data || error.message);
    throw error;
  }
};

// Funkce pro vytvoření nové složky pro klienta
export const createClientFolder = async (clientId, folderPath) => {
  try {
    const response = await axios.post(`${API_URL}/clients/${clientId}/folders`, { folderPath });
    return response.data;
  } catch (error) {
    console.error('Chyba při vytváření složky:', error);
    throw error;
  }
};



// Funkce pro přiřazení OP kódu klientovi
export const assignClientOpCode = async (clientId, opCode) => {
  try {
    const response = await axios.post(`${API_URL}/clients/${clientId}/assign-op`, { opCode });
    return response.data;
  } catch (error) {
    console.error('Chyba při přiřazení OP kódu klientovi:', error.response?.data || error.message);
    throw error;
  }
};


// Funkce pro vytvoření nového technika
export const createTechnician = async (technicianData) => {
  try {
    const response = await axios.post(`${API_URL}/technicians`, technicianData);
    return response.data;
  } catch (error) {
    console.error('Chyba při vytváření technika:', error);
    throw error;
  }
};

// Funkce pro získání reportu podle ID
export const getReportById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/reports/${id}`);
    return response.data;
  } catch (error) {
    console.error('Chyba při získávání reportu:', error);
    throw error;
  }
};

// Funkce pro aktualizaci technika
export const updateTechnician = async (id, technicianData) => {
  try {
    const response = await axios.put(`${API_URL}/technicians/${id}`, technicianData);
    return response.data;
  } catch (error) {
    console.error('Chyba při aktualizaci technika:', error);
    throw error;
  }
};

// Funkce pro smazání technika
export const deleteTechnician = async (id) => {
  try {
    await axios.delete(`${API_URL}/technicians/${id}`);
    return { message: 'Technik smazán' };
  } catch (error) {
    console.error('Chyba při mazání technika:', error);
    throw error;
  }
};

// Funkce pro získání všech klientů
export const getClients = async () => {
  try {
    const response = await axios.get(`${API_URL}/clients`);
    return response.data;
  } catch (error) {
    console.error('Chyba při získávání klientů:', error);
    throw error;
  }
};

// Funkce pro vytvoření nového klienta
export const createClient = async (clientData) => {
  try {
    console.log("Odesílám data do backendu:", clientData); // Přidáme logování
    const response = await fetch('http://localhost:5000/api/clients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(clientData),
    });
    if (!response.ok) {
      throw new Error('Failed to create client');
    }
    const data = await response.json();
    console.log("Odpověď backendu:", data); // Logujeme odpověď backendu
    return data;
  } catch (error) {
    console.error('Chyba při vytváření klienta:', error);
    throw error;
  }
};




// Funkce pro získání všech reportů
export const getReports = async () => {
  try {
    const response = await axios.get(`${API_URL}/reports`);
    return response.data;
  } catch (error) {
    console.error('Chyba při získávání reportů:', error);
    throw error;
  }
};

export const calculateCosts = (materials = [], hourlyRate, travelCost) => {
  if (!Array.isArray(materials)) {
      throw new Error("Materials must be an array");
  }

  const materialCost = materials.reduce((sum, material) => {
      const cost = material.usedQuantity * material.price;
      return sum + (material.chargeCustomer ? cost : 0);
  }, 0);

  return materialCost + hourlyRate + travelCost;
};


// Funkce pro vytvoření nového reportu
export const createReport = async (reportData) => {
  try {
    const response = await axios.post(`${API_URL}/reports`, reportData);
    return response.data;
  } catch (error) {
    console.error("Chyba v odpovědi backendu:", error.response?.data || error.message);

    throw error;
  }
};

// Funkce pro získání úkolů podle technika
export const getTasksByTechnician = async (technicianId) => {
  try {
    const response = await axios.get(`${API_URL}/tasks?technicianId=${technicianId}`);
    return response.data;
  } catch (error) {
    console.error('Chyba při získávání úkolů pro technika:', error);
    throw error;
  }
};

// Funkce pro získání všech úkolů
export const getTasks = async () => {
  try {
    const response = await axios.get(`${API_URL}/tasks`);
    return response.data;
  } catch (error) {
    console.error('Chyba při získávání všech úkolů:', error);
    throw error;
  }
};

// Funkce pro vytvoření nového úkolu
export const createTask = async (taskData) => {
  try {
    const response = await axios.post(`${API_URL}/tasks`, taskData);
    return response.data;
  } catch (error) {
    console.error('Chyba při vytváření úkolu:', error);
    throw error;
  }
};



// Funkce pro aktualizaci úkolu
export const updateTask = async (taskId, taskData) => {
  try {
    const response = await axios.put(`${API_URL}/tasks/${taskId}`, taskData);
    return response.data;
  } catch (error) {
    console.error('Chyba při aktualizaci úkolu:', error);
    throw error;
  }
};

// Funkce pro smazání úkolu
export const deleteTask = async (taskId) => {
  try {
    await axios.delete(`${API_URL}/tasks/${taskId}`);
    return { message: 'Úkol smazán' };
  } catch (error) {
    console.error('Chyba při mazání úkolu:', error);
    throw error;
  }
};

export const updateClient = async (clientId, clientData) => {
  const response = await fetch(`http://localhost:5000/api/clients/${clientId}`, { // Absolutní URL
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(clientData),
  });

  if (!response.ok) {
      throw new Error('Failed to update client');
  }

  return response.json();
};



export const deleteClient = async (id) => {
  const response = await fetch(`http://localhost:5000/api/clients/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Chyba při mazání klienta.');
  }

  return await response.json();
};

// Získání všech materiálů
export const getWarehouseItems = async () => {
  try {
    const response = await axios.get(`${API_URL}/warehouse`);
    return response.data;
  } catch (error) {
    console.error('Chyba při získávání materiálů:', error);
    throw error;
  }
};

// Přidání nového materiálu
export const addWarehouseItem = async (item) => {
  try {
    const response = await axios.post(`${API_URL}/warehouse`, item);
    return response.data;
  } catch (error) {
    console.error('Chyba při přidávání materiálu:', error);
    throw error;
  }
};


// Načtení materiálů ze skladu
export const fetchMaterialsFromWarehouse = async () => {
  try {
      const response = await superagent.get("http://localhost:5000/api/warehouse");
      return response.body;
  } catch (error) {
      console.error("Chyba při načítání materiálů ze skladu:", error);
      throw error;
  }
};

// Funkce pro aktualizaci skladového materiálu
// Aktualizace položky skladu
export const updateWarehouseItem = async (id, data) => {
  try {
      const response = await superagent
          .put(`http://localhost:5000/api/warehouse/${id}`)
          .send(data);
      return response.body;
  } catch (error) {
      console.error("Chyba při aktualizaci skladu:", error);
      throw error;
  }
};



// Smazání materiálu
export const deleteWarehouseItem = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/warehouse/${id}`);
    return response.data;
  } catch (error) {
    console.error('Chyba při mazání materiálu:', error);
    throw error;
  }
};
