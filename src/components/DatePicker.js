import React from "react";
import { createGlobalStyle } from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerWrapperStyles = createGlobalStyle`
    .date_picker.full-width {
        width: 100%;
        input{
          min-width: 0px;
          outline: 2px solid transparent;
          outline-offset: 2px;
          position: relative;
          -webkit-appearance: none;
          -moz-appearance: none;
          -ms-appearance: none;
          appearance: none;
          transition-property: var(--chakra-transition-property-common);
          transition-duration: var(--chakra-transition-duration-normal);
          padding-bottom: 1px;
          line-height: var(--chakra-lineHeights-normal);
          font-size: var(--chakra-fontSizes-md);
          -webkit-padding-start: 0px;
          padding-inline-start: 0px;
          -webkit-padding-end: 2rem;
          padding-inline-end: 2rem;
          height: var(--chakra-sizes-10);
          border-radius: 0px;
          border-bottom: 1px solid;
          border-color: inherit;
          background: var(--chakra-colors-transparent);
        }
    }

    .react-datepicker{
      display:flex;
    }
`;

const FORMAT = "dd/MM/yyyy";

const CustomDatePicker = ({ selected, onChange, defaultDate, placeholder }) => (
  <>
    <DatePicker
      dateFormat={FORMAT}
      selected={selected}
      placeholderText={placeholder}
      onChange={onChange}
      wrapperClassName="date_picker full-width"
    />
    <DatePickerWrapperStyles />
  </>
);

export default CustomDatePicker;
