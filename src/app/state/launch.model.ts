export interface LaunchPatch {
  small: string | null;
  large: string | null;
}

export interface LaunchLinks {
  patch: LaunchPatch | null;
  reddit: {
    campaign: string | null;
    launch: string | null;
    media: string | null;
    recovery: string | null;
  } | null;
  flickr: {
    small: string[];
    original: string[];
  } | null;
  presskit: string | null;
  webcast: string | null;
  youtube_id: string | null;
  article: string | null;
  wikipedia: string | null;
}

export interface LaunchFailure {
  time: number;
  altitude: number | null;
  reason: string;
}

export interface Launch {
  id: string;
  name: string;
  flight_number: number;
  date_utc: string;
  date_local: string;
  success: boolean | null;
  details: string | null;
  upcoming: boolean;
  rocket: string;
  links: LaunchLinks | null;
  failures: LaunchFailure[];
}
