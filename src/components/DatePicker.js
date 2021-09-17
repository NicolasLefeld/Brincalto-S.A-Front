import React from 'react';
import styled, { css, createGlobalStyle } from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DatePickerWrapperStyles = createGlobalStyle`
    .date_picker.full-width {
        width: 100%;
        border-bottom: 1px solid rgb(26, 32, 44,0.1);
        input{
          width:100%
        }
    }

    .react-datepicker{
      display:flex;
    }
`;

const CustomDatePicker = ({ selected, onChange }) => (
  <>
    <DatePicker
      showTimeSelect
      timeFormat="HH:mm"
      selected={selected}
      onChange={onChange}
      wrapperClassName="date_picker full-width"
    />
    <DatePickerWrapperStyles />
  </>
);

export default CustomDatePicker;
