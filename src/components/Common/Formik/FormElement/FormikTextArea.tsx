import { useField } from 'formik';
import { FormControl, TextArea, WarningOutlineIcon } from 'native-base';
import { FC } from 'react';
import { FormikInputProps } from '../FormikControl';

const FormikTextArea: FC<FormikInputProps> = (props) => {
  const [field, meta, helpers] = useField(props);
  const { isRequired, isDisabled, label, variant, helperText, ...rest } = props;
  const isInvalid = meta.touched && !!meta.error;

  return (
    <FormControl
      isInvalid={isInvalid}
      width="full"
      isRequired={isRequired}
      isDisabled={isDisabled}
    >
      {label && <FormControl.Label>{label}</FormControl.Label>}

      <TextArea
        variant={variant ?? 'outline'}
        width="full"
        onChangeText={(value) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        autoCompleteType
        {...rest}
      />

      {isInvalid ? (
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          {meta.error}
        </FormControl.ErrorMessage>
      ) : helperText ? (
        <FormControl.HelperText>{helperText}</FormControl.HelperText>
      ) : null}
    </FormControl>
  );
};

export default FormikTextArea;
