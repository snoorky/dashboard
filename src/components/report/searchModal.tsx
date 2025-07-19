export function SearchModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed bottom-6 left-4 right-4 p-2 bg-light border rounded-full shadow-lg z-50 flex items-center">
      <input
        autoFocus
        type="text"
        placeholder="Buscar na equipe..."
        className="flex-1 px-4 py-2 rounded-full outline-none"
      />
      <button onClick={onClose} className="ml-2 text-sm text-blue-600">Cancelar</button>
    </div>
  )
}