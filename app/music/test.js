const { Button } = require("@mantine/core");

function ButtonSongs({ genre, songs, answers }) {
  const [options, setOptions] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  function handleSelectionChange(option) {
    // console.log(option);
    setSelectedOption(() => {
      return option;
    });
  }

  return (
    <div>
      <MultipleChoice
        options={options}
        answer={songAnswer}
        selectedOption={selectedOption}
        onChange={handleSelectionChange}
      ></MultipleChoice>
    </div>
  );
}

const MultipleChoice = ({ options, selectedOption, onChange, answer }) => {
  const isCorrect = answer === selectedOption;
  return (
    <>
      <h1> Which song is this?????</h1>
      <Button.Group orientation="vertical">
        {options?.map((option) => (
          <Button
            key={`${option.index}, ${option.song}`}
            variant={selectedOption === option ? "filled" : "outline"}
            onClick={() => onChange(option)}
            disabled={selectedOption !== null}
          >
            {`${option?.song}`}
          </Button>
        ))}
      </Button.Group>
      <>
        {selectedOption && (
          <p>
            {selectedOption === answer
              ? `Correct! The answer is ${answer.song}`
              : `Incorrect. The answer is ${answer.song}`}
          </p>
        )}
      </>
    </>
  );
};
