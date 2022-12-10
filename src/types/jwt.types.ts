import { AuthorizationGranted } from "@/services/spotify/Spotify.types";

export interface AppJwtPayload {
  accessToken: AuthorizationGranted['access_token']
}