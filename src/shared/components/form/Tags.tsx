import { Autocomplete, Chip, TextField } from "@mui/material";

type Skill = {
  id: string;
  name: string;
};

interface TagsProps {
  options: Skill[];
  value: Skill[]; // القيمة عبارة عن array من العناصر
  onChange: (value: Skill[]) => void;
  label?: string;
  placeholder?: string;
}

export default function Tags({
  options,
  value,
  onChange,
  label,
  placeholder,
}: TagsProps) {
  const selected = options.filter((o) =>
    value.some((v) => v.id === o.id)
  );

  return (
    <Autocomplete
      multiple
      options={options}
      getOptionLabel={(o) => o.name}
      isOptionEqualToValue={(a, b) => a.id === b.id}
      value={selected}
      onChange={(_, newVal) => onChange(newVal)}
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, idx) => (
        <Chip label={option.name} {...getTagProps({ index: idx })} />
        ))
      }
      renderInput={(params) => (
        <TextField {...params} label={label} placeholder={placeholder} />
      )}
    />
  );
}
