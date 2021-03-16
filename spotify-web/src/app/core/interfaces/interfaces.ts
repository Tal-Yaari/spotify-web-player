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
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: PlaylistImages[];
  name: string;
  owner:Owner;
  primary_color: string;
  public: string;
  snapshot_id: string;
  tracks: Tracks;
  type: string;
  uri: string;
}

export interface Owner {
  display_name: string;
    external_urls: ExternalUrls;
    href: string;
    id: string;
    type: string;
}


export interface PlaylistImages {
  height: number;
  url: string;
  width: number;
}

export interface Tracks {
  href: string;
  total: number;
  items?: TracksArr[];
}

export interface TracksArr {
  added_at: Date;
  added_by: {
    external_urls: ExternalUrls;
    href: string;
    id: string;
    type: string;
    uri: string;
  };
  is_local: boolean;
  track: {
    album: Album;
    artists: Artist[];
    available_markets: Array<string>;
    disc_number: number;
    duration_ms: number;
    duration_Time?: string;
    explicit: boolean;
    external_ids: {
      isrc: string;
    };
    external_urls: ExternalUrls;
    href: string;
    id: string;
    name: string;
    popularity: number;
    preview_url: string;
    track_number: number;
    type: string;
    uri: string;
  };
}

export interface Album {
  album_type: string;
  available_markets: Array<string>;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Images[];
  name: string;
  type: string;
  uri: string;
}

export interface Artist {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

export interface Images {
  height: number;
  url: string;
  width: number;
}

export interface ExternalUrls {
  spotify: string;
}
