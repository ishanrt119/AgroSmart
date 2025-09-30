export enum Theme {
  LIGHT = 'light',
  DARK = 'dark'
}

export enum Language {
  EN = 'en',
  HI = 'hi',
  NE = 'ne'
}

export enum Role {
  FARMER = 'Farmer',
  EXPERT = 'Expert',
  ADMIN = 'Admin'
}

export interface User {
  name: string;
  mobile: string;
  role: Role;
}

export interface HourlyForecast {
  time: string;
  temp: number;
  humidity: number;
  rainfall: number;
  condition: string;
}

export interface WeatherData {
  temperature: number;
  humidity: number;
  rainfall: number;
  condition: string;
  hourlyForecast: HourlyForecast[];
}

export interface SoilData {
  ph: number;
  moisture: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
}

export interface WaterStorageData {
  levelPercent: number;
  capacityLiters: number;
}

export interface SensorDataPoint {
  time: string;
  value: number;
}

export interface MarketPrice {
  crop: string;
  price: number;
  change: number;
}

export interface ForumPost {
  id: number;
  author: string;
  title: string;
  replies: number;
}

export interface CropRecommendation {
    cropName: string;
    recommendationReasons: string[];
    sowingSeason: string;
    growingPeriod: string;
    waterNeeds: string;
}

export interface Advertisement {
  company: string;
  productName: string;
  description: string;
  imagePrompt: string;
  imageUrl?: string;
  callToActionText: string;
}

export interface GovernmentScheme {
  schemeName: string;
  issuingBody: string; // e.g., "Central Government", "State Government of Sikkim"
  description: string;
  benefits: string[];
  eligibility: string;
  link: string; // Fictional but plausible link
}

// Chat Interfaces
export interface ChatUser {
  id: string;
  name: string;
  avatar: string; // A single character for the avatar
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  name: string;
  members: ChatUser[];
  messages: ChatMessage[];
  isGroup: boolean;
  avatar: string; // A character or icon representation
}