import { useField } from 'formik';
import { Checkbox, FormControl, WarningOutlineIcon } from 'native-base';
import { FC } from 'react';
import { FormikInputProps } from '../FormikControl';

const FormikCheckbox: FC<FormikInputProps> = (props) => {
  const [field, meta, { setValue }] = useField(props);
  const { isRequired, isDisabled, label, helperText, ...rest } = props;
  const isInvalid = meta.touched && !!meta.error;

  return (
    <FormControl
      isInvalid={isInvalid}
      isRequired={isRequired}
      isDisabled={isDisabled}
      width="full"
    >
      {/* @ts-ignore */}
      <Checkbox
        {...field}
        {...rest}
        value={field.value as string}
        onChange={setValue}
      >
        {label}
      </Checkbox>

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

export default FormikCheckbox;
