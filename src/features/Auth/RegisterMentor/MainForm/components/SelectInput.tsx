type SelectInputProps = {
  id: string;
  label: string;
  options: string[] | number[];
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
};

export default function SelectInput({
  id,
  label,
  options,
  value,
  onChange,
  placeholder,
}: SelectInputProps) {
  return (
    <div className="form-control mb-8">
      <label htmlFor={id} className="block text-right mb-2 font-bold">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        className="appearance-none border w-full border-gray-300 rounded px-4 py-2 text-sm text-gray-600 bg-white custom-select"
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
