import { useState, useCallback } from 'react';
import { useToast } from '../../../contexts/ToastContext';
import { useLoading } from '../../../contexts/LoadingContext';

export function useCorreosEnviados() {
  const { showSuccess, showError } = useToast();
  const { startLoading, stopLoading } = useLoading();
  const [correos, setCorreos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paginacion, setPaginacion] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  });

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
  };

  const cargarHistorial = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(
        `${apiUrl}/correos-enviados?page=${page}&limit=20`,
        { headers: getAuthHeaders() }
      );

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          window.location.href = '/login';
          return;
        }
        throw new Error('Error al cargar historial');
      }

      const result = await response.json();

      if (result?.data && result?.pagination) {
        setCorreos(result.data);
        setPaginacion(result.pagination);
      }
    } catch (error) {
      showError('Error al cargar el historial de correos');
    } finally {
      setLoading(false);
    }
  }, [showError]);

  const eliminarCorreo = async (id, name) => {
    startLoading('Eliminando registro...');
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/correos-enviados/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          window.location.href = '/login';
          return;
        }
        throw new Error('Error al eliminar');
      }

      showSuccess('Registro eliminado correctamente');
      await cargarHistorial(paginacion.page);
    } catch (error) {
      showError('Error al eliminar el registro');
    } finally {
      stopLoading();
    }
  };

  return {
    correos,
    loading,
    paginacion,
    cargarHistorial,
    eliminarCorreo,
  };
}
