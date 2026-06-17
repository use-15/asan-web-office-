export async function getRootHandle() {
  return await navigator.storage.getDirectory();
}

export async function saveToOPFS(filename: string, content: ArrayBuffer) {
  const root = await getRootHandle();
  const fileHandle = await root.getFileHandle(filename, { create: true });
  const writable = await fileHandle.createWritable();
  await writable.write(content);
  await writable.close();
  return filename;
}

export async function readFromOPFS(filename: string): Promise<ArrayBuffer> {
  const root = await getRootHandle();
  const fileHandle = await root.getFileHandle(filename);
  const file = await fileHandle.getFile();
  return await file.arrayBuffer();
}
