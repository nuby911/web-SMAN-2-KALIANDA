/**
 * Data Service Facade
 * 
 * Modul ini telah direfaktor menjadi arsitektur modular standar industri:
 * - Data statis: dipisahkan ke @/data/
 * - Layanan CRUD: dipisahkan ke @/services/newsService, extracurricularService, ppdbService, storageService
 * - React Hook: dipisahkan ke @/hooks/useSchoolData
 * 
 * File ini bertindak sebagai facade yang mengekspor seluruh modul untuk kompatibilitas penuh.
 */

export * from './index';
