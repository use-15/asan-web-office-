import { openDB } from 'idb';

export interface AsanDocumentMetadata {
  id: string;
  name: string;
  type: 'Word' | 'Sheet' | 'Slide' | 'PDF';
  lastModified: number;
  opfsPath?: string;
}

const DB_NAME = 'AsanOfficeDB';
const STORE_NAME = 'documents';

export async function initDB() {
  return openDB(DB_NAME, 2, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    },
  });
}

export async function saveDocumentMetadata(meta: AsanDocumentMetadata) {
  const db = await initDB();
  await db.put(STORE_NAME, meta);
}

export async function getAllDocuments(): Promise<AsanDocumentMetadata[]> {
  const db = await initDB();
  return db.getAll(STORE_NAME);
}

export async function deleteDocumentMetadata(id: string) {
  const db = await initDB();
  await db.delete(STORE_NAME, id);
}
