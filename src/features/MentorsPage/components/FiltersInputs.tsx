import React, { useState } from "react";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Paper,
  Typography,
} from "@mui/material";

interface FiltersProps {
  skills: string[];
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedSkills: string[];
  onToggleSkill: (skill: string) => void;
}

export default function FiltersInputs({
  skills,
  searchQuery,
  onSearchChange,
  selectedSkills,
  onToggleSkill,
}: FiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside className="w-full md:w-1/4" dir="rtl">
      <Paper
        elevation={3}
        className="sticky top-6 p-4 space-y-4 rounded-xl border border-gray-200"
      >
        <Typography variant="h6" className="font-bold text-gray-800 text-right">
          المهارات
        </Typography>

        <TextField
          label="ابحث عن المهارات"
          variant="outlined"
          fullWidth
          size="small"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          inputProps={{ dir: "rtl", style: { textAlign: "right" } }}
          sx={{marginBottom : "30px" , marginTop : "30px"}}
        />

        <div className="relative">
          <Button
            variant="outlined"
            fullWidth
            onClick={() => setIsOpen(!isOpen)}
            className="!text-sm !py-2 !normal-case"
          >
            اختر المهارات
          </Button>

          {isOpen && (
            <div className="absolute z-10 mt-2 right-0 w-full bg-white border border-gray-300 rounded-md max-h-60 overflow-y-auto shadow-xl">
              <ul className="py-2 space-y-2 px-3">
                {skills.map((skill) => (
                  <li key={skill}>
                    <FormControlLabel
                      className="!justify-between w-full flex-row-reverse gap-2"
                      control={
                        <Checkbox
                          checked={selectedSkills.includes(skill)}
                          onChange={() => onToggleSkill(skill)}
                          color="primary"
                        />
                      }
                      label={<span className="text-sm truncate">{skill}</span>}
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Paper>
    </aside>
  );
}
