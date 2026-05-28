import { PrismicRichText } from "@prismicio/react";

type Props = {
  field: any;
  className?: string;
};

export default function PrismicText({ field, className = "" }: Props) {
  return (
    <div className={className}>
      <PrismicRichText
        field={field}
        components={{
          paragraph: ({ children }) => <p>{children}</p>,
          heading1: ({ children }) => <h1>{children}</h1>,
          heading2: ({ children }) => <h2>{children}</h2>,
          list: ({ children }) => (
            <ul className="list-disc space-y-[10px] pl-[18px]">{children}</ul>
          ),
          oList: ({ children }) => (
            <ol className="list-decimal space-y-[10px] pl-[18px]">{children}</ol>
          ),
          listItem: ({ children }) => <li>{children}</li>,
        }}
      />
    </div>
  );
}