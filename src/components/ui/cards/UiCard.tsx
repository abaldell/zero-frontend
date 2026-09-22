import React from "react";

interface UiCardProps {
  children: React.ReactNode;
}
const UiCard = (props: UiCardProps) => {
  const { children } = props;
  return (
    <div className="min-w-0 flex-1">
      <div className="flex items-center gap-x-3 justify-between p-3">
        {children}
      </div>
    </div>
  );
};

export default UiCard;
