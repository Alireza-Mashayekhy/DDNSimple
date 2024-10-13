
import {ChangeEvent , useState} from 'react';

import {SFC} from '@/types';
import * as S from './Styles';

export interface InputProps {
  errors: { [field: string]: string };
  label: string;
  name: string;
  onChange?(e: ChangeEvent<HTMLInputElement>): void;
  touched: { [field: string]: boolean };
  type?: 'text' | 'number' | 'password';
  icon?: React.ReactNode;
}


const Input: SFC<InputProps> = ({className, errors, label, name, onChange, touched, type = 'text' , icon}) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <>
      <S.Label isFocused={isFocused}>{label}</S.Label>
      {icon && <S.Icon>{icon}</S.Icon>}
      <S.Field
         $error={errors[name] && touched[name]}
        className={className}
        name={name}
        onChange={onChange}
        onFocus={() => setIsFocused(true)} 
        type={type}
        placeholder=" "
      />
      <S.SecondaryContainer>
        {errors[name] && touched[name] ? <S.ErrorMessage>{errors[name]}</S.ErrorMessage> : null}
      </S.SecondaryContainer>
    </>
  );
};

export default Input;
