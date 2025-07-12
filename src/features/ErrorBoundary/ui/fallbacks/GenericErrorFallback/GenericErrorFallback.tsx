import React from 'react';
import { ErrorFallbackProps, ErrorRecoveryOptions } from '../../../model/types';
import { formatErrorForUser } from '../../../lib';
import { Button } from '@/shared/ui/Button/Button';
import { ButtonVariant } from '@/shared/ui/Button/Button.types';
import { Text } from '@/shared/ui/Text/Text';
import { TextVariant } from '@/shared/ui/Text/Text.types';
import styles from './GenericErrorFallback.module.scss';

export const GenericErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  const message = formatErrorForUser(error);

  const handleRecovery = () => {
    if (error.isRecoverable === ErrorRecoveryOptions.RELOAD) {
      window.location.reload();
    } else {
      resetErrorBoundary();
    }
  };

  const recoveryText =
    error.isRecoverable === ErrorRecoveryOptions.RELOAD ? 'Reload Page' : 'Try Again';

  return (
    <div role="alert" className={styles.container}>
      <Text as="h2" variant={TextVariant.ERROR} className={styles.title}>
        Something Went Wrong
      </Text>
      <Text as="p" variant={TextVariant.SECONDARY} className={styles.message}>
        {message}
      </Text>
      {error.isRecoverable && (
        <Button variant={ButtonVariant.PRIMARY} onClick={handleRecovery} className={styles.button}>
          {recoveryText}
        </Button>
      )}
    </div>
  );
};
