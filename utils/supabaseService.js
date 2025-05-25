import supabase from "../config/supabase.js";
import CustomError from "./CustomError.js";

export const uploadFile = async (basePath, file) => {
  const fileName = `${Date.now()}_${file.originalname}`;
  const filePath = `${basePath}/${fileName}`;

  const { error } = await supabase.storage
    .from(process.env.SUPABASE_BUCKET)
    .upload(filePath, file.buffer, {
      contentType: file.mimetype,
      upsert: true,
    });

  if (error) throw new CustomError("Supabase: " + error.message, 500);

  const {
    data: { publicUrl },
  } = supabase.storage.from(process.env.SUPABASE_BUCKET).getPublicUrl(filePath);

  return publicUrl;
};
