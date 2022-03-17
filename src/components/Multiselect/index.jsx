import React, { useState } from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  MenuGroup,
  MenuOptionGroup,
  MenuItemOption,
  Box,
} from "@chakra-ui/react";

const MultiSelectMenu = (props) => {
  const { label, options, buttonProps, disabled } = props;
  const [selectedOptions, setSelectedOptions] = useState([]);
  return (
    <Menu closeOnSelect={false}>
      {({ onClose }) => (
        <>
          <MenuButton
            type="button"
            backgroundColor={selectedOptions.length ? "purple.200" : "white"}
            color={selectedOptions.length ? "purple.500" : "gray.600"}
            borderColor={selectedOptions.length ? "purple.200" : "gray.300"}
            borderWidth={1}
            p={2}
            px={4}
            borderRadius="25px"
            _focus={{
              outline: "none",
            }}
            disabled={disabled}
            {...buttonProps}
          >
            {`${label}${
              selectedOptions.length > 0 ? ` (${selectedOptions.length})` : ""
            }`}
          </MenuButton>
          <MenuList>
            <MenuGroup title={undefined}>
              <MenuItem
                onClick={() => {
                  setSelectedOptions([]);
                  // Have to close, otherwise the defaultValue won't be reset correctly
                  // and so the UI won't immediately show the menu item options unselected.
                  onClose();
                }}
              >
                Limpiar
              </MenuItem>
            </MenuGroup>
            <MenuDivider />
            <Box overflowX="auto" maxHeight="400px">
              <MenuOptionGroup
                title={undefined}
                defaultValue={selectedOptions}
                type="checkbox"
                onChange={(values) => {
                  // Filter out empty strings, because, well, this component seems to add
                  // an empty string out of nowhere.
                  setSelectedOptions(values.filter((_) => _.length));
                  props.onChange?.(values);
                }}
              >
                {Array.isArray(options) &&
                  options.map((option) => {
                    return (
                      // Use 'type'='button' to make sure it doesn't default to 'type'='submit'.
                      <MenuItemOption
                        pt={1}
                        pb={1}
                        key={`multiselect-menu-${option.id}`}
                        type="button"
                        value={option.id}
                      >
                        {option.concept} {" - "}
                        {new Date(option.date).toLocaleDateString()}
                        {" - "}
                        {option.total} $
                      </MenuItemOption>
                    );
                  })}
              </MenuOptionGroup>
            </Box>
          </MenuList>
        </>
      )}
    </Menu>
  );
};

export default MultiSelectMenu;
