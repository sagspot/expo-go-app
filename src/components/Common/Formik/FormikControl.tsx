import { FieldAttributes } from 'formik';
import { IInputProps, ITextAreaProps } from 'native-base';
import FormikCheckbox from './FormElement/FormikCheckbox';
import FormikInput from './FormElement/FormikInput';
import FormikRadio from './FormElement/FormikRadio';
import FormikSelect from './FormElement/FormikSelect';
import FormikTextArea from './FormElement/FormikTextArea';

interface BaseProps {
  name: string;
  label?: string;
  placeholder?: string;
  helperText?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
}

type BaseInputProps = BaseProps &
  Record<string, number | number[] | string | Record<string, string> | any> &
  FieldAttributes<{}>;

export type FormikInputProps = IInputProps & BaseInputProps;
export type FormikTextAreaProps = ITextAreaProps & BaseInputProps;

export type FormikOptionProps = {
  options: { value: string; label: string }[];
} & Record<string, number | string | Record<string, string> | any> &
  FieldAttributes<{ value?: string; label?: string | boolean }>;

export type FormikCheckboxProps = { label: string } & FormikInputProps;

type InputProps = { control: 'input' } & FormikInputProps;
type OptionProps = { control: 'select' | 'radio' } & FormikOptionProps;
type CheckboxProps = { control: 'checkbox' } & FormikCheckboxProps;
type TextAreaProps = { control: 'textArea' } & FormikTextAreaProps;

type Props = InputProps | OptionProps | CheckboxProps | TextAreaProps;

const FormikControl = (props: Props) => {
  const { control, ...rest } = props;

  switch (control) {
    case 'input':
      return <FormikInput {...(rest as FormikInputProps)} />;

    case 'textArea':
      return <FormikTextArea {...(rest as FormikTextAreaProps)} />;

    case 'select':
      return <FormikSelect {...(rest as FormikOptionProps)} />;

    case 'radio':
      return <FormikRadio {...(rest as FormikOptionProps)} />;

    case 'checkbox':
      return <FormikCheckbox {...(rest as FormikCheckboxProps)} />;

    default:
      return null;
  }
};

export default FormikControl;
