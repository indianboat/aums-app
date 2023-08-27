import React from 'react';

const Input = ({ type = "text", label, id, name, icon, placeholder, required = false, className, value, onChange, ...rest }) => {
  return (
    <>
      <div className="flex flex-col gap-y-1">
        {
          <label className={`${label ? "text-gray-700 ms-2 dark:text-gray-300" :"hidden"}`} htmlFor={id}>{label}<span className='text-rose-700'>{required && label != "" ? "*" : null}</span></label>
        }
        <div className="flex items-center justify-end relative">
          <input type={type} id={id} placeholder={placeholder} required={required} value={value} name={name} onChange={onChange} className={`input bg-[#eaeef0] dark:bg-[#141417] ${icon ? "pe-14": ""} ${className}`} {...rest} />
          <span className={`${icon ? 'icon_span absolute right-0 p-3 -z-0 bg-[#F9FCFD] dark:bg-neutral-950 text-[#2C3E50] rounded-xl dark:text-slate-300' : "hidden"}`}>{icon}</span>
        </div>
      </div>
    </>
  )
}

export default Input