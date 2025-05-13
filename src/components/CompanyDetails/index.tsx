import { useState, useCallback } from 'react';
import { CompanyType } from '../../store/company/model/types';
import styles from './styles.module.css';
import Input from '../../shared/Input';
import Button from '../../shared/Button';
import Select from '../../shared/Select';
import Edit from '../../assets/icons/edit.svg?react';
import Check from '../../assets/icons/check.svg?react';
import Delete from '../../assets/icons/delete.svg?react';
import { usePatchCompanyAsyncMutation } from '../../store/company';
import Loading from '../Loading';
import { useAuth } from '../../context/AuthContext';
import { getDateString } from './utils';

const CompanyDetails = ({ company }: { company: CompanyType }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { token } = useAuth();
  const [updateCompany, { isLoading }] = usePatchCompanyAsyncMutation();

  const [formData, setFormData] = useState<Partial<CompanyType>>({
    contract: {
      no: company.contract.no ?? '',
      issue_date: company.contract.issue_date ?? '',
    },
    businessEntity: company.businessEntity, // 'Partnership'
    type: company.type, // ['funeral_home', 'logistics_services']
  });

  const handleSaveChanges = useCallback(() => {
    setIsEditing(false);
    const { contract, businessEntity, type } = formData;
    const newCompany = {
      contract: contract,
      businessEntity: businessEntity,
      type: type,
    };
    updateCompany({
      id: company.id,
      auth: token,
      ...newCompany,
    });
  }, [company, formData, token, updateCompany]);

  const handleCancel = useCallback(() => {
    setIsEditing(false);
    if (company) {
      setFormData(company);
    }
  }, [company]);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <Loading height={'168px'} />
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Company Details</h2>
          <div className={styles.actions}>
            <Button
              label="Save changes"
              variant="flattened"
              icon={<Check />}
              onClick={handleSaveChanges}
            />
            <Button
              label="Cancel"
              icon={<Delete />}
              variant="flattened"
              onClick={handleCancel}
            />
          </div>
        </div>

        <div className={styles.form}>
          <div className={styles.formRow}>
            <div className={styles.field}>
              <label className={styles.label}>Agreement number:</label>
              <div className={styles.value}>
                <Input
                  value={formData.contract?.no}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      contract: { ...prev.contract!, no: e.target.value },
                    }))
                  }
                />
              </div>
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Date:</label>
              <div className={styles.value}>
                <Input
                  value={getDateString(formData.contract?.issue_date)}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      contract: {
                        ...prev.contract!,
                        issue_date: e.target.value,
                      },
                    }))
                  }
                />
              </div>
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Business entity:</label>
            <div className={styles.value}>
              <Select
                defaultText="Select business entity"
                defaultAll="All entities"
                optionsList={[
                  'Sole Proprietorship',
                  'Partnership',
                  'Limited Liability Company',
                ]}
                selectedOptions={[formData.businessEntity]}
                onOptionSelect={(selected) =>
                  setFormData((prev) => ({
                    ...prev,
                    businessEntity: selected[0],
                  }))
                }
              />
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Company type:</label>
            <div className={styles.value}>
              <Select
                defaultText="Select company type"
                defaultAll="All company type"
                multiselect
                optionsList={[
                  'funeral_home',
                  'logistics_services',
                  'burial_care_contractor',
                ]}
                selectedOptions={formData.type}
                onOptionSelect={(selected) =>
                  setFormData((prev) => ({
                    ...prev,
                    type: selected,
                  }))
                }
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Company Details</h2>
        <Button
          variant="flattened"
          icon={<Edit />}
          label="Edit"
          onClick={() => setIsEditing(true)}
        />
      </div>

      <div className={styles.details}>
        <div className={styles.row}>
          <label className={styles.label}>Agreement:</label>
          <span className={styles.value}>{formData.contract?.no}</span>
          <span className={styles.separator}>/</span>
          <span className={styles.value}>
            {getDateString(formData.contract?.issue_date)}
          </span>
        </div>
        <div className={styles.row}>
          <label className={styles.label}>Business entity:</label>
          <span className={styles.value}>{formData.businessEntity}</span>
        </div>
        <div className={styles.row}>
          <label className={styles.label}>Company type:</label>
          <span className={styles.value}>{formData.type?.join(', ')}</span>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;
