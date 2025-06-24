interface FilterInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const FilterInput = ({ value, onChange, placeholder }: FilterInputProps) => {
  return (
    <div className="mb-3 text-center">
      <input
        type="text"
        className="form-control w-50 mx-auto"
        placeholder={placeholder || "Buscar..."}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default FilterInput;
