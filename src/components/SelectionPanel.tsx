import React from 'react';

// Define interface locally
interface Artwork {
  id: number
  title: string
  artist_display: string
  date_display: string
  medium_display: string
  dimensions: string
  is_public_domain: boolean
  is_on_view: boolean
  image_id: string | null
}

interface SelectionPanelProps {
  selectedArtworks: Artwork[]
  onClearSelection: () => void
}

const SelectionPanel: React.FC<SelectionPanelProps> = ({ 
  selectedArtworks, 
  onClearSelection 
}) => {
  if (selectedArtworks.length === 0) return null

  return (
    <div className="p-3 surface-100 border-1 border-200 border-round mb-3">
      <div className="flex align-items-center justify-content-between">
        <div className="flex align-items-center gap-3">
          <i className="pi pi-images text-primary"></i>
          <span className="font-semibold">
            {selectedArtworks.length} artwork(s) selected
          </span>
        </div>
        <button 
          className="p-button p-button-outlined p-button-sm"
          onClick={onClearSelection}
        >
          <i className="pi pi-times mr-2"></i>
          Clear Selection
        </button>
      </div>
      
      {selectedArtworks.length > 0 && (
        <div className="mt-2 text-sm">
          <strong>Selected:</strong> {selectedArtworks.map(artwork => 
            artwork.title || 'Untitled'
          ).join(', ')}
        </div>
      )}
    </div>
  );
};

export default SelectionPanel