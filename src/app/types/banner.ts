export interface Banner {
    id: number;
    name: string;
    banner_text: string;
    flash_sales_text: string;
    flash_banner_color: string;
    flash_colortimer_color: string;
    flash_image?: string;
    desktop_banner?: string;
    mobile_banner?: string;
    start_at: string;
    end_at: string;
    is_active: boolean;
    status: string;
    _id: string;
  }
  
  export interface BannerFormData {
    name: string;
    banner_text: string;
    flash_sales_text: string;
    flash_banner_color: string;
    flash_colortimer_color: string;
    flash_image?: File;
    desktop_banner?: File;
    mobile_banner?: File;
    start_at: string;
    end_at: string;
  }