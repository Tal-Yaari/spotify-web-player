export interface Categories {
  href: string;
  id: string;
  name: string;
  icons: Icon[];
}

export interface Icon {
  height: number;
  url: string;
  width: string;
}

export interface Playlist {
  collaborative: boolean;
  description: string;
  external_urls: { spotify: string };
  href: string;
  id: string;
  images: PlaylistImages[];
  name: string;
  owner: {
    display_name: string;
    external_urls: { spotify: string };
    href: string;
    id: string;
    type: string;
  };
  primary_color: string;
  public: string;
  snapshot_id: string;
  tracks: { href: string; total: number };
  type: string;
  uri: string;
}

export interface PlaylistImages {
  height: number;
  url: string;
  width: number;
}
