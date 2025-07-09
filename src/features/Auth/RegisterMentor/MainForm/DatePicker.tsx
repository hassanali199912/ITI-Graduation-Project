type DatePickerProps = {
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
  onBlur?: () => void;
};

export default function DatePicker({ selectedDate, onChange, onBlur }: DatePickerProps) {
  return (
    <input
      type="date"
      value={selectedDate ? selectedDate.toISOString().split('T')[0] : ''}
      onChange={(e) => onChange(e.target.value ? new Date(e.target.value) : null)}
      onBlur={onBlur}
      className="bg-blue-50 p-2 w-full rounded"
    />
  );
}
