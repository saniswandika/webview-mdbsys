
export enum ViewType {
  DASHBOARD = 'DASHBOARD',
  CHAT = 'CHAT',
  DISCOVER = 'DISCOVER',
  PROFILE = 'PROFILE'
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: number;
}

export interface NewsItem {
  title: string;
  uri: string;
  snippet: string;
}
