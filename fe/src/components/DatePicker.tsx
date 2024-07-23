import ReactDatePicker from "react-datepicker";


import "react-datepicker/dist/react-datepicker.css";

interface Props {
    startDate: Date
    onChange: (date: Date) => void
}

const DatePickerComponent = ({ startDate, onChange }: Props) => {
    return (
        <ReactDatePicker selected={startDate} onChange={(date: any) => onChange(date)} />
    );
};

export default DatePickerComponent