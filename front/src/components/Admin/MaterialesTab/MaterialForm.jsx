function MaterialForm({
  formMaterial,
  onChange,
  onArchivoChange,
  onSubmit,
  onCancelar,
}) {
  return (
    <div className="form-section">
      <h2>{formMaterial.id ? 'Editar Material' : 'Agregar Nuevo Material'}</h2>
      <form onSubmit={onSubmit} className="material-form">
        <div className="form-group">
          <label htmlFor="nombre">
            Nombre / Título del Material
            <span className="char-count">{formMaterial.nombre.length}/100</span>
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formMaterial.nombre}
            onChange={onChange}
            required
            minLength={3}
            maxLength={100}
            placeholder="Ej: Programa de Formación 2024"
          />
        </div>

        <div className="form-group">
          <label htmlFor="archivo">
            Archivo {formMaterial.id && '(opcional para edición)'}
            <span className="file-info">
              Formatos: PDF, Word, Excel (máx 10MB)
            </span>
          </label>
          <input
            type="file"
            id="archivo"
            name="archivo"
            accept=".pdf,.doc,.docx,.xls,.xlsx"
            onChange={onArchivoChange}
            required={!formMaterial.id}
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-guardar">
            {formMaterial.id ? 'Actualizar Material' : 'Subir Material'}
          </button>
          {formMaterial.id && (
            <button type="button" onClick={onCancelar} className="btn-cancelar">
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default MaterialForm;
