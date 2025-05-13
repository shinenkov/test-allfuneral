import { useCallback, useRef } from 'react';
import styles from './styles.module.css';
import Button from '../../shared/Button';
import Add from '../../assets/icons/addPhoto.svg?react';
import Trash from '../../assets/icons/trash.svg?react';
import { CompanyType } from '../../store/company/model/types';
import {
  useDeleteImageCompanyAsyncMutation,
  useAddImageCompanyAsyncMutation,
} from '../../store/company';
import { useAuth } from '../../context/AuthContext';
import Loading from '../Loading';
import { getUrlPath } from './utils';

const Photos = ({ company }: { company: CompanyType }) => {
  const token = useAuth().token;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [deletePhoto, { isLoading: isDeleting }] =
    useDeleteImageCompanyAsyncMutation();
  const [addPhoto, { isLoading: isAdding }] = useAddImageCompanyAsyncMutation();

  const handleDeletePhoto = useCallback(
    (photoId: string) => {
      deletePhoto({
        id: company.id,
        auth: token,
        name: photoId,
      });
    },
    [company.id, deletePhoto, token]
  );

  const handleFileSelect = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      try {
        const formData = new FormData();
        formData.append('file', file);

        await addPhoto({
          id: company.id,
          auth: token,
          file: formData,
        }).unwrap();

        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } catch (error) {
        console.error('Failed to upload photo:', error);
      }
    },
    [addPhoto, company.id, token]
  );

  const handleAddPhoto = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Photos</h2>
        <Button
          variant="flattened"
          icon={<Add />}
          label="Add"
          onClick={handleAddPhoto}
          disabled={isAdding}
        />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />
      </div>

      <div className={styles.photoGrid}>
        {isDeleting || isAdding ? (
          <Loading height="108px" />
        ) : (
          <>
            {company.photos.map((photo) => (
              <div key={photo.name} className={styles.photoCard}>
                <img
                  src={getUrlPath(photo)}
                  alt={photo.name}
                  className={styles.photoImage}
                />
                <Button
                  variant="filled"
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                  }}
                  icon={<Trash />}
                  onClick={() => handleDeletePhoto(photo.name)}
                />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Photos;
