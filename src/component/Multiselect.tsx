import React, {useState, useRef, useEffect} from "react";

// type : Interface
interface IMultiselectProps {
  options: string[];
}

const Multiselect: React.FC<IMultiselectProps> = ({options}) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [toggleOptionsList, setToggleOptionsList] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const searchBoxRef = useRef<HTMLInputElement>(null);

  const multiselectContainerRef = useRef<HTMLDivElement>(null);

  // function : HandlingItemSelection
  const onSelectItem = (item: string) => {
    if (!selectedValues.includes(item)) {
      setSelectedValues([...selectedValues, item]);
    }
    setInputValue("");
  };

  const onRemoveSelectedItem = (item: string) => {
    const updatedValues = selectedValues.filter((value) => value !== item);
    setSelectedValues(updatedValues);
  };

  const toggleOptions = () => {
    setToggleOptionsList(!toggleOptionsList);
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  // function : RemovingOptionsOnPressingBackspace
  const onBackspacePress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && inputValue === "") {
      const lastSelectedValue = selectedValues[selectedValues.length - 1];
      if (lastSelectedValue) {
        onRemoveSelectedItem(lastSelectedValue);
      }
    }
  };

  // function : FilteringTheOptionsBasedOnTheAlreadyMadeSelection
  const filteredOptions = options
    .filter(
      (option) =>
        option.toLowerCase().includes(inputValue.toLowerCase()) &&
        !selectedValues.includes(option)
    )
    .sort();

  // function : ClosingTheOptionDisplayOnClickingOutsideTheSearchBox
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        multiselectContainerRef.current &&
        !multiselectContainerRef.current.contains(event.target as Node)
      ) {
        setToggleOptionsList(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [multiselectContainerRef]);

  return (
    <div
      className="multiselect-container w-1/2 relative"
      ref={multiselectContainerRef}
    >
      <div
        className="search-wrapper flex items-center p-4 cursor-pointer border border-solid border-gray-400 rounded"
        onClick={toggleOptions}
      >
        {selectedValues.map((value, index) => (
          <span
            key={index}
            className="selected-item bg-blue-500 text-white rounded px-2 py-1 mr-2 flex items-center"
          >
            {value}
            <span
              className="remove-icon cursor-pointer ml-3"
              onClick={() => onRemoveSelectedItem(value)}
            >
              &#x2715;
            </span>
          </span>
        ))}
        <input
          type="text"
          ref={searchBoxRef}
          className="search-box flex-1 border-none outline-none"
          value={inputValue}
          onChange={onInputChange}
          onKeyDown={onBackspacePress}
          placeholder={selectedValues.length ? "" : "Search for users ..."}
        />
      </div>
      {toggleOptionsList && (
        <div className="options-list absolute top-full left-0 w-full max-h-48 overflow-y-auto border border-solid border-gray-300 border-t-0 rounded-b-lg bg-white">
          {filteredOptions.map((option, index) => (
            <div
              key={index}
              className={`option p-2 cursor-pointer hover:bg-gray-200`}
              onClick={() => onSelectItem(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Default props for Multiselect component
Multiselect.defaultProps = {
  options: [],
};

export default Multiselect;
