// supabase/schema.sql 과 1:1로 대응하는 타입 정의입니다.
// 실제 프로젝트를 연결한 뒤에는 아래 명령으로 자동 생성된 타입으로 교체할 수 있습니다.
//   npx supabase gen types typescript --project-id <PROJECT_ID> > src/types/supabase.ts

export type ConsultationStatus = "대기" | "완료";

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      banners: {
        Row: {
          id: string;
          title: string;
          subtitle: string | null;
          image_url: string | null;
          link_url: string | null;
          is_active: boolean;
          display_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          subtitle?: string | null;
          image_url?: string | null;
          link_url?: string | null;
          is_active?: boolean;
          display_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          subtitle?: string | null;
          image_url?: string | null;
          link_url?: string | null;
          is_active?: boolean;
          display_order?: number;
          created_at?: string;
        };
        Relationships: [];
      };
      consultations: {
        Row: {
          id: string;
          name: string;
          phone: string;
          message: string | null;
          status: ConsultationStatus;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          phone: string;
          message?: string | null;
          status?: ConsultationStatus;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          phone?: string;
          message?: string | null;
          status?: ConsultationStatus;
          created_at?: string;
        };
        Relationships: [];
      };
      notices: {
        Row: {
          id: string;
          title: string;
          content: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          content: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          content?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      reviews: {
        Row: {
          id: string;
          name: string;
          review_date: string;
          content: string;
          image_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          review_date?: string;
          content: string;
          image_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          review_date?: string;
          content?: string;
          image_url?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      site_settings: {
        Row: {
          id: number;
          site_name: string;
          site_description: string | null;
          keywords: string | null;
          favicon_url: string | null;
          og_title: string | null;
          og_description: string | null;
          og_image_url: string | null;
          company_name: string;
          owner_name: string | null;
          business_number: string | null;
          mos_number: string | null;
          address: string | null;
          phone: string | null;
          fax: string | null;
          email: string | null;
          copyright_text: string | null;
          updated_at: string;
        };
        Insert: {
          id?: number;
          site_name?: string;
          site_description?: string | null;
          keywords?: string | null;
          favicon_url?: string | null;
          og_title?: string | null;
          og_description?: string | null;
          og_image_url?: string | null;
          company_name?: string;
          owner_name?: string | null;
          business_number?: string | null;
          mos_number?: string | null;
          address?: string | null;
          phone?: string | null;
          fax?: string | null;
          email?: string | null;
          copyright_text?: string | null;
          updated_at?: string;
        };
        Update: {
          id?: number;
          site_name?: string;
          site_description?: string | null;
          keywords?: string | null;
          favicon_url?: string | null;
          og_title?: string | null;
          og_description?: string | null;
          og_image_url?: string | null;
          company_name?: string;
          owner_name?: string | null;
          business_number?: string | null;
          mos_number?: string | null;
          address?: string | null;
          phone?: string | null;
          fax?: string | null;
          email?: string | null;
          copyright_text?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      consultation_status: ConsultationStatus;
    };
    CompositeTypes: Record<string, never>;
  };
}

// ---------------------------------------------------------------------------
// 편의용 도메인 타입 (컴포넌트/쿼리 헬퍼에서 사용)
// ---------------------------------------------------------------------------
export type Banner = Database["public"]["Tables"]["banners"]["Row"];
export type BannerInsert = Database["public"]["Tables"]["banners"]["Insert"];

export type Consultation = Database["public"]["Tables"]["consultations"]["Row"];
export type ConsultationInsert =
  Database["public"]["Tables"]["consultations"]["Insert"];

export type Notice = Database["public"]["Tables"]["notices"]["Row"];
export type NoticeInsert = Database["public"]["Tables"]["notices"]["Insert"];

export type Review = Database["public"]["Tables"]["reviews"]["Row"];
export type ReviewInsert = Database["public"]["Tables"]["reviews"]["Insert"];

export type SiteSettings = Database["public"]["Tables"]["site_settings"]["Row"];
export type SiteSettingsUpdate =
  Database["public"]["Tables"]["site_settings"]["Update"];
