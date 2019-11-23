import { environment } from '../environments/environment';

/**
 * It is a class for all global constants/strings.
 */
export class PresentationUrlEndpointInfo {
  static get keys(): Keys {
    return {
      user: 'user/sess',
      post: 'post',
    };
  }

  static get baseUrl(): string {
    return `${environment.baseUrl}`;
  }

  static get loginUrl(): string {
    return `${this.baseUrl}/auth/login`;
  }
}

interface Keys {
  user: string;
  post: string;
}
