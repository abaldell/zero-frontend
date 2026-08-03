interface UiNavHorizontalProps {
  children: React.ReactNode;
}
const UiNavHorizontal = (props: UiNavHorizontalProps) => {
  const { children } = props;
  //( h-[8.8%])
  return (
    <div className="sticky top-0 left-0 z-40 w-full dark:bg-slate-900 bg-slate-100 p-3 transition-transform duration-300 border-black/10 border-b">
      {children}
    </div>
  );
};

export default UiNavHorizontal;
