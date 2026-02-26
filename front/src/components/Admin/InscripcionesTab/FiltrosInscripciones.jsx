function FiltrosInscripciones({ filtro, setFiltro, contadores }) {
  const filtros = [
    { id: 'todas', label: 'Todas', count: contadores.todas || 0 },
    { id: 'pendiente', label: 'Pendientes', count: contadores.pendiente || 0 },
    {
      id: 'confirmada',
      label: 'Confirmadas',
      count: contadores.confirmada || 0,
    },
  ];

  return (
    <div className="filtros">
      <select
        className="admin-dropdown"
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
      >
        {filtros.map((f) => (
          <option key={f.id} value={f.id}>
            {f.label} ({f.count})
          </option>
        ))}
      </select>

      <div className="filtros-buttons">
        {filtros.map((f) => (
          <button
            key={f.id}
            className={`filtro-btn ${filtro === f.id ? 'active' : ''}`}
            onClick={() => setFiltro(f.id)}
          >
            {f.label} ({f.count})
          </button>
        ))}
      </div>
    </div>
  );
}

export default FiltrosInscripciones;
