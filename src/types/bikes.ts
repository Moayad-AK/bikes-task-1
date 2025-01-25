export interface IBikesResponse {
  bikes: Bike[];
}

export interface Bike {
  date_stolen: number;
  description?: string;
  frame_colors: string[];
  frame_model?: string;
  id: number;
  is_stock_img: boolean;
  large_img?: string;
  location_found: any;
  manufacturer_name: string;
  external_id: any;
  registry_name: any;
  registry_url: any;
  serial: string;
  status: string;
  stolen: boolean;
  stolen_coordinates?: number[];
  stolen_location: string;
  thumb?: string;
  title: string;
  url: string;
  year?: number;
  propulsion_type_slug: string;
  cycle_type_slug: string;
}
