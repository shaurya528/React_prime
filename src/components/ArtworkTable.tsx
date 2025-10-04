import React, { useState, useEffect, useRef } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator'
import { Toast } from 'primereact/toast'
import { artworkService } from '../services/api'
import type { Artwork, PaginationParams } from '../types'
import SelectionPanel from './SelectionPanel'

  const ArtworkTable: React.FC = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [selectedArtworks, setSelectedArtworks] = useState<Artwork[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 1,
    limit: 10
  });
  const [iiifUrl, setIiifUrl] = useState<string>('');

  const toast = useRef<Toast>(null);

  const loadArtworks = async () => {
    setLoading(true);
    try {
      const response = await artworkService.getArtworks(pagination);
      setArtworks(response.data);
      setTotalRecords(response.pagination.total);
      setIiifUrl(response.config.iiif_url);
    } catch (error) {
      toast.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to artworks',
        life: 3000
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArtworks();
  }, [pagination]);

  // Handle page change
  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setPagination({
      page: event.page + 1,
      limit: event.rows
    });
  };

  // Handle row selection
  const onSelectionChange = (e: { value: Artwork[] }) => {
    setSelectedArtworks(e.value);
  };

  // Handle select all across pages
  const onSelectAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedArtworks([...artworks])
    } else {
      setSelectedArtworks([])
    }
  };

  const clearSelection = () => {
    setSelectedArtworks([])
  };

  // Selection header template
  const selectionHeaderTemplate = () => {
    return (
      <div className="flex align-items-center gap-2">
        <input
          type="checkbox"
          checked={selectedArtworks.length === artworks.length && artworks.length > 0}
          onChange={onSelectAllChange}
        />
       <p> Select All</p>
      </div>
    );
  };
  const imageTemplate = (rowData: Artwork) => {
    const imageUrl = artworkService.getImageUrl(rowData.image_id, iiifUrl);
    
    if (!imageUrl) {
      return (
        <div className="flex align-items-center justify-content-center w-4rem h-4rem surface-200 border-round">
          <i className="pi pi-image text-400"></i>
        </div>
      );
    }

    return (
      <img 
        src={imageUrl} 
        alt={rowData.title}
        className="w-4rem h-4rem border-round shadow-1"
        style={{ objectFit: 'cover' }}
      />
    );
  };

  const titleTemplate = (rowData: Artwork) => {
    return (
      <span title={rowData.title} className="text-overflow-ellipsis white-space-nowrap overflow-hidden">
        {rowData.title || 'Untitled'}
      </span>
    );
  };

  const artistTemplate = (rowData: Artwork) => {
    return (
      <span title={rowData.artist_display} className="text-overflow-ellipsis white-space-nowrap overflow-hidden">
        {rowData.artist_display || 'Unknown Artist'}
      </span>
    );
  };


  const placeOfOriginTemplate = (rowData: Artwork) => {
    return (
      <span title={rowData.place_of_origin} className="text-overflow-ellipsis white-space-nowrap overflow-hidden">
        {rowData.place_of_origin || 'Unknown'}
      </span>
    );
  };


  const inscriptionsTemplate = (rowData: Artwork) => {
    return (
      <span title={rowData.inscriptions} className="text-overflow-ellipsis white-space-nowrap overflow-hidden">
        {rowData.inscriptions || 'None'}
      </span>
    );
  };


  const dateRangeTemplate = (rowData: Artwork) => {
    const start = rowData.date_start || 'Unknown'
    const end = rowData.date_end || 'Unknown'
    
    if (start === end) {
      return <span>{start}</span>;
    }
    
    return <span>{start} - {end}</span>;
  };

  return (
    <div className="card">
      <Toast ref={toast} />
      
      <SelectionPanel 
        selectedArtworks={selectedArtworks}
        onClearSelection={clearSelection}
      />

      <DataTable
        value={artworks}
        loading={loading}
        selection={selectedArtworks}
        onSelectionChange={onSelectionChange}
        dataKey="id"
        selectionMode="checkbox"
        className="p-datatable-sm"
        scrollable
        scrollHeight="flex"
      >
        <Column 
          selectionMode="multiple" 
          headerStyle={{ width: '3rem' }}
          header={selectionHeaderTemplate}
        />
        <Column 
          field="image_id" 
          header="Image" 
          body={imageTemplate}
          style={{ width: '80px' }} 
        />
        <Column 
          field="title" 
          header="Title" 
          body={titleTemplate}
          style={{ width: '20%', minWidth: '200px' }} 
        />
        <Column 
          field="place_of_origin" 
          header="Place of Origin" 
          body={placeOfOriginTemplate}
          style={{ width: '15%' }} 
        />
        <Column 
          field="artist_display" 
          header="Artist" 
          body={artistTemplate}
          style={{ width: '20%', minWidth: '200px' }} 
        />
        <Column 
          field="inscriptions" 
          header="Inscriptions" 
          body={inscriptionsTemplate}
          style={{ width: '15%' }} 
        />
        <Column 
          header="Date Range" 
          body={dateRangeTemplate}
          style={{ width: '15%' }} 
        />
      </DataTable>

      <Paginator
        first={(pagination.page - 1) * pagination.limit}
        rows={pagination.limit}
        totalRecords={totalRecords}
        onPageChange={onPageChange}
        template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} artworks"
        rowsPerPageOptions={[5, 10, 20, 50]}
      />
    </div>
  );
};

export default ArtworkTable;