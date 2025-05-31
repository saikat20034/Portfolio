import axios from 'axios';

export const imgbbImageUpload = async image => {
  const formData = new FormData();
  formData.append('image', image);
  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
    formData
  );
  const imageUrl = data.data.display_url;
  return imageUrl;
};
