import React from 'react';
import styled, { css, createGlobalStyle } from 'styled-components';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

const DatePickerWrapperStyles = createGlobalStyle`
.Selectable .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
  background-color: #f0f8ff !important;
  color: #000;
}
.Selectable .DayPicker-Day {
  border-radius: 0 !important;
}
.Selectable .DayPicker-Day--start {
  border-top-left-radius: 50% !important;
  border-bottom-left-radius: 50% !important;
  background-color: #2DCE89 !important;
  color: #f0f8ff;
}
.Selectable .DayPicker-Day--end {
  border-top-right-radius: 50% !important;
  border-bottom-right-radius: 50% !important;
  background-color: #2DCE89 !important;
  color: #f0f8ff;
}
`;

const MONTHS = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];
const WEEKDAYS_LONG = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miercóles',
  'Jueves',
  'Viernes',
  'Sabado',
];
const WEEKDAYS_SHORT = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'];

export default function FilterByCalendar({ from, to, handleDayClick }) {
  const modifiers = { start: from, end: to };
  return (
    <>
      <DayPicker
        className="Selectable"
        months={MONTHS}
        WEEKDAYS_LONG={WEEKDAYS_LONG}
        WEEKDAYS_SHORT={WEEKDAYS_SHORT}
        numberOfMonths={2}
        selectedDays={[from, { from, to }]}
        modifiers={modifiers}
        onDayClick={handleDayClick}
      />
      <DatePickerWrapperStyles />
    </>
  );
}
