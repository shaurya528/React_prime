export interface Artwork {
  id: number
  title: string
  place_of_origin: string
  artist_display: string
  inscriptions: string
  date_start: number
  date_end: number
  image_id: string | null
}

export interface ArtworkApiResponse {
  data: Artwork[]
  pagination: {
    total: number
    limit: number
    offset: number
    total_pages: number
    current_page: number
  }
  config: {
    iiif_url: string
  };
}

export interface PaginationParams {
  page: number
  limit: number
}