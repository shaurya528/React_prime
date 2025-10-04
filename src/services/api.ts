import axios from 'axios'
import type { Artwork, ArtworkApiResponse, PaginationParams } from '../types'

 const API_BASE_URL = 'https://api.artic.edu/api/v1/artworks'

export const artworkService = {
  async getArtworks(params: PaginationParams): Promise<ArtworkApiResponse> {
    try {
      const { page, limit } = params
      
        
         const response = await axios.get<ArtworkApiResponse>(
        `${API_BASE_URL}?page=${page}&limit=${limit}`
      );
      
      return response.data;
    } catch (error) {
      console.error('Error fetcing artworks:', error)
        throw new Error('Failed to fetch artworks');
    }
  },

  getImageUrl(imageId: string | null, iiifUrl: string): string | null {
    if (!imageId) return null
    return `${iiifUrl}/${imageId}/full/200,/0/default.jpg`
  }
}