import { BodyDefault } from "@/theme/fonts";
import { Button, Stack, TextField, Typography } from "@mui/material";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React, { ChangeEventHandler, useState } from "react";

const SearchForm = ({}) => {
  const [searchText, setSearchText] = useState("");

  const CategorySelection = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>();

    function handleChange(event: SelectChangeEvent<"category">) {
      // setAge(event.target.value as string);
      setSelectedCategory(event.target.value);
    }
    return (
      <FormControl>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={"category"}
          label="Category"
          onChange={handleChange}
          sx={{ width: "145px", height: "40px" }}
        >
          <MenuItem value={10}>electronics</MenuItem>
          <MenuItem value={20}>furnitures</MenuItem>
        </Select>
      </FormControl>
    );
  };

  const SearchBar = () => {
    return (
      <TextField
        color="primary"
        sx={{ width: "421px", height: "40px" }}
        inputProps={{
          style: {
            height: "40px",
            width: "421px",
            padding: "0px 10px",
            textAlign: "left",
          },
        }}
        onChange={(event) => {
          setSearchText(event.target.value);
        }}
      ></TextField>
    );
  };
  const SearchButton = () => {
    return (
      <Button
        color="primary"
        variant="contained"
        sx={{
          textTransform: "none",
          padding: "10px",
          width: "100px",
          height: "40px",
        }}
      >
        <BodyDefault>Search</BodyDefault>
      </Button>
    );
  };

  function onFormSubmit() {
    // call backend
  }

  return (
    <Stack direction="row">
      <form onSubmit={onFormSubmit}>
        <SearchBar />
        <CategorySelection />
        <SearchButton />
      </form>
    </Stack>
  );
};

export default SearchForm;
