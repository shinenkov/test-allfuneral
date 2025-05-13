import { PhotoType } from '../../store/company/model/types';

export const getUrlPath = (photo: PhotoType) => {
  const baseUrl = process.env.MOCK_HOST;
  if (baseUrl === undefined) return `proxy/${photo.name}`;
  const urlParts = photo.thumbpath.split(baseUrl);
  if (urlParts.length < 2) return `proxy/${photo.name}`;
  else return `proxy/${urlParts[1]}`;
};
