import React from 'react';
import './TransferenciaTab.css';

function TransferenciaTab({ datos, loading, onChange, onSubmit }) {
    if (loading) {
        return <div className="tab-content loading">Cargando datos...</div>;
    }

    return (
        <div className="tab-content">
            <div className="form-card">
                <h2>Datos de Transferencia Bancaria</h2>
                <p className="form-instruction">
                    Estos datos se mostrarán a los alumnos al momento de realizar la inscripción para que puedan efectuar el pago.
                </p>

                <form onSubmit={onSubmit} className="admin-form">
                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="nombreCuenta">Nombre de la Cuenta</label>
                            <input
                                type="text"
                                id="nombreCuenta"
                                name="nombreCuenta"
                                value={datos.nombreCuenta}
                                onChange={onChange}
                                placeholder="Ej: Natalia Luhmann"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="alias">Alias</label>
                            <input
                                type="text"
                                id="alias"
                                name="alias"
                                value={datos.alias}
                                onChange={onChange}
                                placeholder="Ej: aleman.para.vos"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="cvu">CVU / CBU</label>
                            <input
                                type="text"
                                id="cvu"
                                name="cvu"
                                value={datos.cvu}
                                onChange={onChange}
                                placeholder="00000031000XXXXXXXXX"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="btn-primary">
                            Guardar Cambios
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default TransferenciaTab;
