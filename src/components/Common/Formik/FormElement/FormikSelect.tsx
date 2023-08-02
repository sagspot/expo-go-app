import { useField } from 'formik';
import { FormControl, Select, WarningOutlineIcon } from 'native-base';
import { FC } from 'react';
import { FormikOptionProps } from '../FormikControl';

const FormikSelect: FC<FormikOptionProps> = (props) => {
  const [field, meta, helpers] = useField(props);
  const {
    isRequired,
    isDisabled,
    label,
    variant,
    options,
    placeholder,
    helperText,
    ...rest
  } = props;
  const isInvalid = meta.touched && !!meta.error;

  return (
    <FormControl
      isInvalid={isInvalid}
      isRequired={isRequired}
      isDisabled={isDisabled}
    >
      {label && <FormControl.Label>{label}</FormControl.Label>}

      {/* @ts-ignore */}
      <Select
        variant={variant ?? 'filled'}
        placeholder={placeholder ?? 'Select'}
        // {...field}
        onValueChange={(val) =>
          helpers.setValue(options.find(({ value }) => value === val)!)
        }
        {...rest}
      >
        {options.map(({ label, value }) => (
          <Select.Item key={value} value={value} label={label} />
        ))}
      </Select>

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

export default FormikSelect;
