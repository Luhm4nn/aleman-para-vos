import React, { useState } from 'react';

function CorreosTab({
    emails,
    form,
    loading,
    handleFormChange,
    toggleEmail,
    addEmail,
    removeEmail,
    enviarCorreos,
    copiarPrompt,
    correosEnviados,
    historialLoading,
    paginacionHistorial,
    onCambiarPaginaHistorial,
}) {
    const [newEmail, setNewEmail] = useState('');
    const [subtab, setSubtab] = useState('enviar');
    const [bodyModal, setBodyModal] = useState(null);
    const [destinatariosModal, setDestinatariosModal] = useState(null);

    const handleAddEmail = (e) => {
        e.preventDefault();
        if (newEmail.trim()) {
            addEmail(newEmail.trim());
            setNewEmail('');
        }
    };

    return (
        <div className="tab-content">
            <div className="tab-header">
                <h2>Correos</h2>
                <p className="tab-description">
                    Gestiona el envío de correos masivos y consulta el historial de envíos anteriores.
                </p>
            </div>

            <div className="correos-subtabs">
                <button
                    className={`correos-subtab-btn ${subtab === 'enviar' ? 'active' : ''}`}
                    onClick={() => setSubtab('enviar')}
                >
                    Enviar Correo
                </button>
                <button
                    className={`correos-subtab-btn ${subtab === 'historial' ? 'active' : ''}`}
                    onClick={() => {
                        setSubtab('historial');
                        if (correosEnviados.length === 0) {
                            onCambiarPaginaHistorial(1);
                        }
                    }}
                >
                    Historial
                </button>
            </div>

            {subtab === 'enviar' && (
                <div className="correos-container" style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                    <div className="correos-form" style={{ flex: '1 1 50%', minWidth: '300px' }}>
                        <form className="admin-form" onSubmit={enviarCorreos}>
                            <div className="form-group">
                                <label>Asunto</label>
                                <input
                                    type="text"
                                    name="asunto"
                                    value={form.asunto}
                                    onChange={handleFormChange}
                                    placeholder="Ej: Material de estudio módulo 1"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                    <label style={{ margin: 0 }}>Cuerpo del Correo (HTML soportado)</label>
                                    <button
                                        type="button"
                                        onClick={copiarPrompt}
                                        className="btn-editar"
                                        style={{ padding: '0.3rem 0.8rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem', borderRadius: '20px' }}
                                        title="Copia un prompt para generar el texto con ChatGPT u otra IA"
                                    >
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                                            <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                                        </svg>
                                        Copiar prompt sugerido
                                    </button>
                                </div>
                                <textarea
                                    name="cuerpo"
                                    value={form.cuerpo}
                                    onChange={handleFormChange}
                                    placeholder="<p>Hola a todos,</p><p>Adjunto material...</p>"
                                    rows="10"
                                    required
                                ></textarea>
                            </div>

                            {form.cuerpo && (
                                <div className="form-group">
                                    <label>Vista Previa del Mensaje:</label>
                                    <div
                                        style={{
                                            border: '1px solid #ddd',
                                            padding: '1rem',
                                            borderRadius: '8px',
                                            backgroundColor: '#fff',
                                            marginTop: '0.5rem',
                                            minHeight: '100px',
                                            maxHeight: '300px',
                                            overflowY: 'auto'
                                        }}
                                        dangerouslySetInnerHTML={{ __html: form.cuerpo }}
                                    />
                                </div>
                            )}

                            <button type="submit" className="submit-btn" disabled={loading}>
                                {loading ? 'Enviando...' : `Enviar a ${emails.filter(e => e.selected).length} destinatario(s)`}
                            </button>
                        </form>
                    </div>

                    <div className="correos-lista" style={{ flex: '1 1 30%', minWidth: '300px', backgroundColor: '#f9f9f9', padding: '1rem', borderRadius: '8px' }}>
                        <h3>Destinatarios</h3>

                        <form onSubmit={handleAddEmail} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                            <input
                                type="email"
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                                placeholder="Agregar otro email..."
                                style={{ flex: 1, padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }}
                            />
                            <button type="submit" className="btn btn-primary" style={{ padding: '0.5rem 1.5rem', borderRadius: '6px' }}>
                                Agregar
                            </button>
                        </form>

                        {loading ? (
                            <p>Cargando destinatarios sugeridos...</p>
                        ) : emails.length === 0 ? (
                            <p className="no-data">No hay destinatarios en la lista</p>
                        ) : (
                            <div className="emails-list" style={{ maxHeight: '600px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                {emails.map((item, index) => (
                                    <div
                                        key={index}
                                        className="email-item"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            padding: '0.5rem',
                                            backgroundColor: 'white',
                                            border: '1px solid #ddd',
                                            borderRadius: '4px',
                                            opacity: item.selected ? 1 : 0.6
                                        }}
                                    >
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', margin: 0, width: '100%' }}>
                                            <input
                                                type="checkbox"
                                                checked={item.selected}
                                                onChange={() => toggleEmail(item.email)}
                                            />
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                {item.nombre && <span style={{ fontWeight: 'bold', fontSize: '0.9rem', color: '#333' }}>{item.nombre}</span>}
                                                <span style={{ fontSize: '0.85rem', color: '#666' }}>{item.email}</span>
                                            </div>
                                        </label>
                                        <button
                                            type="button"
                                            onClick={() => removeEmail(item.email)}
                                            style={{ background: 'none', border: 'none', color: '#ff4d4f', cursor: 'pointer', fontSize: '1.2rem', padding: '0 0.5rem' }}
                                            title="Eliminar de la lista"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {subtab === 'historial' && (
                <div className="historial-container">
                    {historialLoading ? (
                        <div className="loading">Cargando historial...</div>
                    ) : correosEnviados.length === 0 ? (
                        <div className="empty-state">No hay correos enviados aún.</div>
                    ) : (
                        <>
                            <div className="historial-table-wrapper">
                                <table className="historial-table">
                                    <thead>
                                        <tr>
                                            <th>Fecha</th>
                                            <th>Asunto</th>
                                            <th>Destinatarios</th>
                                            <th style={{ width: '120px' }}>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {correosEnviados.map((correo) => (
                                            <tr key={correo.id}>
                                                <td className="fecha-cell">
                                                    {new Date(correo.createdAt).toLocaleDateString('es-AR', {
                                                        day: '2-digit',
                                                        month: '2-digit',
                                                        year: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                    })}
                                                </td>
                                                <td className="asunto-cell">{correo.asunto}</td>
                                                <td className="destinatarios-cell">
                                                    <span className="destinatarios-resumen">
                                                        {correo.destinatarios.slice(0, 2).join(', ')}
                                                        {correo.destinatarios.length > 2 && (
                                                            <span className="more-destinatarios">
                                                                {' '}y {correo.destinatarios.length - 2} más
                                                            </span>
                                                        )}
                                                    </span>
                                                    {correo.destinatarios.length > 2 && (
                                                        <button
                                                            className="btn-ver-todos"
                                                            onClick={() => setDestinatariosModal(correo.destinatarios)}
                                                            title="Ver todos los destinatarios"
                                                        >
                                                            Ver todos
                                                        </button>
                                                    )}
                                                </td>
                                                <td>
                                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                        <button
                                                            className="btn-ver"
                                                            onClick={() => setBodyModal(correo)}
                                                        >
                                                            Ver cuerpo
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {paginacionHistorial.totalPages > 1 && (
                                <div className="paginacion">
                                    <button
                                        disabled={paginacionHistorial.page <= 1}
                                        onClick={() => onCambiarPaginaHistorial(paginacionHistorial.page - 1)}
                                    >
                                        Anterior
                                    </button>
                                    <span>Página {paginacionHistorial.page} de {paginacionHistorial.totalPages}</span>
                                    <button
                                        disabled={paginacionHistorial.page >= paginacionHistorial.totalPages}
                                        onClick={() => onCambiarPaginaHistorial(paginacionHistorial.page + 1)}
                                    >
                                        Siguiente
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}

            {bodyModal && (
                <div className="modal-overlay" onClick={() => setBodyModal(null)}>
                    <div className="modal-content modal-lg" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>{bodyModal.asunto}</h3>
                            <button className="modal-close" onClick={() => setBodyModal(null)}>×</button>
                        </div>
                        <div className="modal-body">
                            <div className="modal-meta">
                                <p>
                                    <strong>Destinatarios ({bodyModal.destinatarios.length}):</strong>{' '}
                                    {bodyModal.destinatarios.slice(0, 3).join(', ')}
                                    {bodyModal.destinatarios.length > 3 && (
                                        <button
                                            className="btn-ver-todos-inline"
                                            onClick={() => setDestinatariosModal(bodyModal.destinatarios)}
                                        >
                                            ver todos
                                        </button>
                                    )}
                                </p>
                                <p><strong>Fecha:</strong> {new Date(bodyModal.createdAt).toLocaleString('es-AR')}</p>
                            </div>
                            <hr />
                            <div className="cuerpo-preview">
                                <div
                                    dangerouslySetInnerHTML={{ __html: bodyModal.cuerpo }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {destinatariosModal && (
                <div className="modal-overlay" onClick={() => setDestinatariosModal(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
                        <div className="modal-header">
                            <h3>Destinatarios ({destinatariosModal.length})</h3>
                            <button className="modal-close" onClick={() => setDestinatariosModal(null)}>×</button>
                        </div>
                        <div className="modal-body">
                            <div className="destinatarios-lista">
                                {destinatariosModal.map((email, i) => (
                                    <div key={i} className="destinatario-item">
                                        {email}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CorreosTab;
