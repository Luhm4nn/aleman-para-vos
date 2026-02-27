import './MaterialesTab.css';
import MaterialForm from './MaterialForm';
import MaterialCard from './MaterialCard';
import DeleteConfirmationModal from '../../shared/DeleteConfirmationModal';

function MaterialesTab({
  materiales,
  loading,
  formMaterial,
  onFormChange,
  onArchivoChange,
  onFormSubmit,
  onCancelar,
  onEditar,
  onEliminar,
  formatearFecha,
  deleteModal,
  onCerrarModalEliminar,
  onConfirmarEliminacion,
}) {
  return (
    <div className="tab-content">
      <MaterialForm
        formMaterial={formMaterial}
        onChange={onFormChange}
        onArchivoChange={onArchivoChange}
        onSubmit={onFormSubmit}
        onCancelar={onCancelar}
      />

      {loading ? (
        <div className="loading">Cargando materiales...</div>
      ) : materiales.length === 0 ? (
        <div className="empty-state">No hay materiales cargados</div>
      ) : (
        <div className="content-list">
          <h2>Materiales Existentes</h2>
          <div className="materiales-grid">
            {materiales.map((material) => (
              <MaterialCard
                key={material.id}
                material={material}
                onEditar={onEditar}
                onEliminar={onEliminar}
                formatearFecha={formatearFecha}
              />
            ))}
          </div>
        </div>
      )}

      <DeleteConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={onCerrarModalEliminar}
        onConfirm={onConfirmarEliminacion}
        title="Eliminar Material"
        message="¿Estás seguro de que deseas eliminar este material? Esta acción no se puede deshacer."
        itemName={deleteModal.name}
      />
    </div>
  );
}

export default MaterialesTab;
