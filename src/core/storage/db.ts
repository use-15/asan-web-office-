import { openDB, type IDBPDatabase } from 'idb';

export interface AsanDocumentMetadata {
  id: string;
  name: string;
  type: 'word' | 'sheet' | 'slide' | 'pdf';
  lastModified: number;
  opfsPath?: string; // If stored in OPFS
}

const DB_NAME = 'AsanOfficeDB';
const STORE_NAME = 'documents';

export async function initDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    },
  });
}

export async function saveDocumentMetadata(db: IDBPDatabase, meta: AsanDocumentMetadata) {
  await db.put(STORE_NAME, meta);
}

export async function getAllDocuments(db: IDBPDatabase): Promise<AsanDocumentMetadata[]> {
  return db.getAll(STORE_NAME);
}
