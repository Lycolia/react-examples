export type SelectBoxProps = {
  options: string[];
};

export const SelectBox = (props: SelectBoxProps) => {
  return (
    <select>
      {props.options.map((option) => {
        return <option key={option}>{option}</option>;
      })}
    </select>
  );
};
