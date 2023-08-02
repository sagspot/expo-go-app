import { useField } from 'formik';
import { FormControl, Radio, Stack, WarningOutlineIcon } from 'native-base';
import { FC } from 'react';
import { FormikOptionProps } from '../FormikControl';

const FormikRadio: FC<FormikOptionProps> = (props) => {
  const [field, meta, { setValue }] = useField(props);
  const {
    isRequired,
    isDisabled,
    direction,
    label,
    options,
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
      <Radio.Group
        // {...field}
        {...rest}
        onChange={(val) =>
          setValue(options.find(({ value }) => val === value)!)
        }
      >
        <Stack direction={direction ?? 'row'}>
          {options.map(({ label, value }) => (
            <Radio key={value} value={value}>
              {label}
            </Radio>
          ))}
        </Stack>
      </Radio.Group>

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

export default FormikRadio;
