import React from 'react';
import { useState } from 'react';
import { Link, redirect } from 'react-router-dom';

const Input = (props) => {
  let random = (Math.random() + 1).toString(36).substring(7)
  const {
    type,
    switchtype,
    forgotten,
    placeholder,
    iconleft: IconLeft,
    iconright: IconRight,
    iconrightswitch: IconRightSwitch,
    customclassname,
    rounded,
    label,
    value,
    name,
    onChange,
    onBlur,
    inputRef,
    size = 'medium',
    labelSm,
    required,
    ...extra
  } = props

  const [currentType, setCurrentType] = useState(type);
  
  return (
    <div className={`
     w-full first-letter flex flex-col gap-[0.25rem]
     ${rounded ? 'rounded-full': 'rounded-lg'}
      `}>
      <div className='w-full flex justify-between'>
        {label && <label className="text-base font-normal text-black" htmlFor={`${type}-${random}`}>
          {label} {labelSm && <small>{labelSm}</small>} {required ? <span className='text-red300'>*</span> : ''}
        </label>}
        {type === 'password' && forgotten ? <Link to="/forgot-password" className='text-base font-normal text-primary300'>Forgot password?</Link> : ''}
      </div>
      <div className='w-full flex items-center gap-1 border py-3 px-3 rounded-lg border-secondary200'>
        {IconLeft && <span>{<IconLeft className='text-secondary400'/>}</span>}
        <input
          required={required}
          ref={inputRef}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          id={`${type}-${random}`}
          type={currentType} 
          placeholder={placeholder}
          className={`w-full
            ${IconLeft ? 'pl-2' : ''}
            ${IconRight ? 'pr-2' : ''}
            bg-transparent border-none outline-none ${customclassname} ${ 
                size === 'large' ? 'text-lg' : 
                size === 'small' ? 'text-sm' : 'text-base'
          } `} 
          {...extra}
        /> 
        {IconRight && 
          <span onClick={() => setCurrentType(currentType == type ? switchtype : type)}>
            {currentType == type ? <IconRight className='text-secondary400 cursor-pointer text-lg'/> : <IconRightSwitch className='text-secondary400 cursor-pointer text-lg'/>}
          </span>
        }
      </div>
    </div>
  );
}

export default Input;
