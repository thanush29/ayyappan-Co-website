import { supabase } from './supabase';

export interface UploadResult {
  path: string;
  publicUrl: string;
  error: Error | null;
}

export async function uploadFile(
  bucket: string,
  path: string,
  file: File
): Promise<UploadResult> {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    return {
      path: '',
      publicUrl: '',
      error: new Error(error.message),
    };
  }

  const { data: urlData } = supabase.storage
    .from(bucket)
    .getPublicUrl(data.path);

  return {
    path: data.path,
    publicUrl: urlData.publicUrl,
    error: null,
  };
}

export async function deleteFile(bucket: string, path: string): Promise<boolean> {
  const { error } = await supabase.storage.from(bucket).remove([path]);
  return !error;
}

export function generateFileName(prefix: string, file: File): string {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 10);
  const ext = file.name.split('.').pop();
  return `${prefix}/${timestamp}-${randomString}.${ext}`;
}
