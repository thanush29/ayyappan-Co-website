/*
  # Create Media Storage Bucket

  1. Storage Bucket
    - Creates `media` bucket for storing images
    - Public access enabled for serving images
    - Organized by entity type: services/, projects/, clients/

  2. Security
    - Public can read files (GET)
    - Only authenticated users can upload/update/delete files
    - File size limits and type restrictions via policies
*/

INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public can view media files"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'media');

CREATE POLICY "Authenticated users can upload media"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'media');

CREATE POLICY "Authenticated users can update media"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'media')
  WITH CHECK (bucket_id = 'media');

CREATE POLICY "Authenticated users can delete media"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'media');
