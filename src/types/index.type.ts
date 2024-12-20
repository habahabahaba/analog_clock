export type ArrowType = 'hour' | 'minute' | 'second';

export type TimeObject = {
  hours: number;
  minutes: number;
  seconds: number;
};

export enum TimeZones {
  // America
  America_New_York = 'America/New_York',
  America_Chicago = 'America/Chicago',
  America_Denver = 'America/Denver',
  America_Los_Angeles = 'America/Los_Angeles',
  America_Phoenix = 'America/Phoenix',
  America_Anchorage = 'America/Anchorage',
  America_Honolulu = 'America/Honolulu',
  America_Sao_Paulo = 'America/Sao_Paulo',
  America_Mexico_City = 'America/Mexico_City',
  America_Argentina_Buenos_Aires = 'America/Argentina/Buenos_Aires',
  America_Caracas = 'America/Caracas',
  America_Bogota = 'America/Bogota',
  America_Lima = 'America/Lima',
  America_Montevideo = 'America/Montevideo',

  // Europe
  Europe_London = 'Europe/London',
  Europe_Berlin = 'Europe/Berlin',
  Europe_Paris = 'Europe/Paris',
  Europe_Madrid = 'Europe/Madrid',
  Europe_Rome = 'Europe/Rome',
  Europe_Amsterdam = 'Europe/Amsterdam',
  Europe_Moscow = 'Europe/Moscow',
  Europe_Zurich = 'Europe/Zurich',
  Europe_Prague = 'Europe/Prague',
  Europe_Warsaw = 'Europe/Warsaw',
  Europe_Athens = 'Europe/Athens',
  Europe_Istanbul = 'Europe/Istanbul',
  Europe_Oslo = 'Europe/Oslo',
  Europe_Stockholm = 'Europe/Stockholm',
  Europe_Bucharest = 'Europe/Bucharest',

  // Asia
  Asia_Tokyo = 'Asia/Tokyo',
  Asia_Seoul = 'Asia/Seoul',
  Asia_Shanghai = 'Asia/Shanghai',
  Asia_Hong_Kong = 'Asia/Hong_Kong',
  Asia_Singapore = 'Asia/Singapore',
  Asia_Kolkata = 'Asia/Kolkata',
  Asia_Dubai = 'Asia/Dubai',
  Asia_Tehran = 'Asia/Tehran',
  Asia_Karachi = 'Asia/Karachi',
  Asia_Jakarta = 'Asia/Jakarta',
  Asia_Manila = 'Asia/Manila',
  Asia_Kathmandu = 'Asia/Kathmandu',
  Asia_Baghdad = 'Asia/Baghdad',
  Asia_Dhaka = 'Asia/Dhaka',
  Asia_Riyadh = 'Asia/Riyadh',

  // Africa
  Africa_Cairo = 'Africa/Cairo',
  Africa_Johannesburg = 'Africa/Johannesburg',
  Africa_Algiers = 'Africa/Algiers',
  Africa_Lagos = 'Africa/Lagos',
  Africa_Nairobi = 'Africa/Nairobi',
  Africa_Casablanca = 'Africa/Casablanca',
  Africa_Addis_Ababa = 'Africa/Addis_Ababa',

  // Australia / Oceania
  Australia_Sydney = 'Australia/Sydney',
  Australia_Melbourne = 'Australia/Melbourne',
  Australia_Brisbane = 'Australia/Brisbane',
  Australia_Perth = 'Australia/Perth',
  Australia_Adelaide = 'Australia/Adelaide',
  Pacific_Auckland = 'Pacific/Auckland',
  Pacific_Fiji = 'Pacific/Fiji',
  Pacific_Guam = 'Pacific/Guam',
  Pacific_Honolulu = 'Pacific/Honolulu',
  Pacific_Chatham = 'Pacific/Chatham',
  Pacific_Tahiti = 'Pacific/Tahiti',
  Pacific_Port_Moresby = 'Pacific/Port_Moresby',

  // Antarctica
  Antarctica_Palmer = 'Antarctica/Palmer',
  Antarctica_Rothera = 'Antarctica/Rothera',
  Antarctica_South_Pole = 'Antarctica/South_Pole',
  Antarctica_McMurdo = 'Antarctica/McMurdo',

  // UTC Offsets
  Etc_UTC = 'Etc/UTC',
  Etc_GMT = 'Etc/GMT',
  Etc_GMT_Plus_1 = 'Etc/GMT+1',
  Etc_GMT_Minus_1 = 'Etc/GMT-1',
  Etc_GMT_Plus_12 = 'Etc/GMT+12',
  Etc_GMT_Minus_12 = 'Etc/GMT-12',
}

export type TimeZone = (typeof TimeZones)[keyof typeof TimeZones];
