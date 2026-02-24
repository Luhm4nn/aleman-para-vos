import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../contexts/ToastContext";
import { useLoading } from "../../../contexts/LoadingContext";

export function useDatosTransferencia() {
    const navigate = useNavigate();
    const { showSuccess, showError } = useToast();
    const { startLoading, stopLoading } = useLoading();
    const [datos, setDatos] = useState({
        alias: "",
        cvu: "",
        nombreCuenta: "",
    });
    const [loading, setLoading] = useState(true);

    const getAuthHeaders = () => {
        const token = localStorage.getItem("token");
        return {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        };
    };

    const cargarDatos = async () => {
        setLoading(true);
        startLoading("Cargando datos de transferencia...");
        try {
            const apiUrl = import.meta.env.VITE_API_URL;
            const response = await fetch(`${apiUrl}/datos-transferencia`);
            if (!response.ok) throw new Error("Error al cargar los datos");
            const data = await response.json();
            setDatos({
                alias: data.alias || "",
                cvu: data.cvu || "",
                nombreCuenta: data.nombreCuenta || "",
            });
        } catch (error) {
            showError("Error al cargar los datos de transferencia");
        } finally {
            setLoading(false);
            stopLoading();
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDatos((prev) => ({ ...prev, [name]: value }));
    };

    const guardarDatos = async (e) => {
        e.preventDefault();
        startLoading("Guardando cambios...");
        try {
            const apiUrl = import.meta.env.VITE_API_URL;
            const response = await fetch(`${apiUrl}/datos-transferencia`, {
                method: "PATCH",
                headers: getAuthHeaders(),
                body: JSON.stringify(datos),
            });

            if (response.status === 401) {
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                navigate("/login");
                return;
            }

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Error al guardar los datos");
            }

            showSuccess("Datos de transferencia actualizados correctamente");
        } catch (error) {
            showError(error.message || "Error al guardar los datos");
        } finally {
            stopLoading();
        }
    };

    useEffect(() => {
        cargarDatos();
    }, []);

    return {
        datos,
        loading,
        handleChange,
        guardarDatos,
        reargar: cargarDatos,
    };
}
