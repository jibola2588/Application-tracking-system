import React from "react";
import Icon from "./icons";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import PropTypes from 'prop-types';

const Button = (props) => {
  const {
    width,
    type,
    disabled,
    loading,
    label,
    isRounded,
    color,
    icon,
    iconleft: IconLeft,
    iconright: IconRight,
    size = "medium",
    bold,
    customclassname,
    handleclick,
    hasonclick,
  } = props;

  return (
    <button
      type={type}
      onClick={hasonclick ? handleclick : null}
      disabled={disabled || loading}
      className={`${width || "w-full"} ${
        IconRight || IconLeft || icon
          ? " flex items-center justify-center gap-x-2"
          : ""
      } 
      ${isRounded ? "rounded-full" : "rounded-lg"} 
      ${
        disabled
          ? "bg-secondary200 text-white cursor-not-allowed"
          : "cursor-pointer"
      }
      ${
        size === "small"
          ? "text-[14px] px-4 py-2"
          : size === "none"
            ? ""
            : size === "large"
              ? "text-base px-6 py-4"
              : "text-sm lg:text-base font-normal px-3 lg:px-5 py-3 lg:py-[17px]"
      }
      ${
        color === "primary"
          ? "bg-primary400 text-white"
          : color === "black"
            ? "bg-black text-white"
            : color === "white"
              ? "bg-white border border-[#DEE3E9] text-black"
              : color === "blue"
                ? "bg-white border border-[#18425D] text-primary400"
                : color === "reverse"
                  ? "border border-primary300 bg-transparent text-primary300"
                  : color === "red"
                    ? "border border-[#D7263D] bg-white text-[#D7263D]"
                    : color === "danger"
                      ? "bg-[#D7263D] text-white"
                      : "bg-primary300 text-white"
      }
      ${customclassname || ""}
     `}
      {...props}
    >
      {IconLeft && (
        <span
          className={`text-2xl ${
            color === "primary"
              ? "text-white"
              : color === "black"
                ? "text-white"
                : color === "white"
                  ? "text-black"
                  : color === "blue"
                    ? "text-primary400"
                    : color === "reverse"
                      ? "text-primary300"
                      : color === "red"
                        ? "text-[#D7263D]"
                        : ""
          }`}
        >
          {IconLeft}
        </span>
      )}
      {!icon ? (
        <>
          {!loading ? (
            <span
              className={`${bold && "font-semibold"} 
                ${
                  color === "primary"
                    ? "text-white"
                    : color === "black"
                      ? "text-white"
                      : color === "white"
                        ? "text-black"
                        : color === "blue"
                          ? "text-primary400"
                          : ""
                }
                text-center block break-normal`}
            >
              {label}
            </span>
          ) : (
            <Icon
              icon={AiOutlineLoading3Quarters}
              classname="loading-animation another-css text-2xl new-css"
            />
          )}
        </>
      ) : (
        <div className="w-min self-center block">{icon}</div>
      )}
      {IconRight && <span>{IconRight}</span>}
    </button>
  );
};

export default Button;

Button.propTypes = {
  loading: PropTypes.bool,
  hasonclick: PropTypes.bool,
  handleclick: PropTypes.func,
}

// The use cases of the button component are below

// 1) Button use outside of a form element will have hasOnClick to be true

// <Button
//   loading={false}
//   label="Click Me"
//   isRounded={true}
//   color="primary"
//   size="medium"
//   bold={true}
//   customclassname="custom-button"
//    hasonclick={true}
//   handleClick={yourClickHandlerFunction}
// />

// 2) Button use inside of a form element will have to be true
// <Button
//   loading={false}
//   label="Click Me"
//   isRounded={true}
//   color="primary"
//   size="medium"
//   bold={true}
//   customclassname="custom-button"
//    hasonclick={false}
// />

// 3) Button with just few props
{
  /* <Button label="Proceed" color="primary" /> */
}
