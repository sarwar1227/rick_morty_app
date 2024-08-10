import DescriptionItem from "./DescriptionItem";

const DescriptionList = ({ items }) => (
  <>
    {items.map(({ title, value }) => (
      <DescriptionItem key={`${title}-${value}`} title={title} value={value} />
    ))}
  </>
);

export default DescriptionList;
