type Props = {
  icon: React.ReactNode;
  title: string;
};

const ColumnTitle = (props: Props) => {
  return (
    <th className="px-3 py-3 text-left text-base font-medium text-white/40 border-b border-white/10">
      <div className="flex gap-2 items-center">
        {props.icon}
        {props.title}
      </div>
    </th>
  );
};

export default ColumnTitle;
