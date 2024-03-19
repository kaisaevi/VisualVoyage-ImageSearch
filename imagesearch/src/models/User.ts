import { ImageObject } from "./ImageObject";

export interface User {
  userId: string;
  email: string;
  favorites: ImageObject[];
}
