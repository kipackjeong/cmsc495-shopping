import { BodyDefault } from "@/theme/fonts";
import { Button, Stack, TextField, Typography } from "@mui/material";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";

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

//TODO[epic=todos] Implement searching.
const SearchForm = ({}) => {
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  //MARK[epic=search] search trigger
  function onSubmit(event: any) {
    event.preventDefault();
    router.push({
      pathname: "products/",
      query: { q: searchText },
    });
  }

  const SearchBar = (
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
      value={searchText}
    />
  );

  const SearchButton = (
    <Button
      type="submit"
      color="primary"
      variant="contained"
      sx={{
        padding: "10px",
        width: "100px",
        height: "40px",
      }}
    >
      <BodyDefault>Search</BodyDefault>
    </Button>
  );

  return (
    <Stack direction="row">
      <form onSubmit={onSubmit}>
        {SearchBar}
        <CategorySelection />
        {SearchButton}
      </form>
    </Stack>
  );
};

export default SearchForm;
