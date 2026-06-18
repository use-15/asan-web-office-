import { openDB } from 'idb';

export interface AsanDocumentMetadata {
  id: string;
  name: string;
  type: 'Word' | 'Sheet' | 'Slide' | 'PDF';
  lastModified: number;
  content: unknown; // Serialized engine state
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

export async function saveDocument(meta: AsanDocumentMetadata) {
  const db = await initDB();
  await db.put(STORE_NAME, meta);
}

export async function getDocument(id: string): Promise<AsanDocumentMetadata | undefined> {
  const db = await initDB();
  return db.get(STORE_NAME, id);
}

export async function getAllDocuments(): Promise<AsanDocumentMetadata[]> {
  const db = await initDB();
  return db.getAll(STORE_NAME);
}
