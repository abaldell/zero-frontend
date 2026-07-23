import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

interface PopupProps {
  children: React.ReactNode;
  openImage: boolean;
  onCloseImage: (close: boolean) => void;
}
export default function Popup(props: PopupProps) {
  const { children, openImage, onCloseImage } = props;

  return (
    <div>
      <Dialog
        open={openImage}
        onClose={() => onCloseImage(false)}
        className="relative z-10"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-900/50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center text-center sm:items-center">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-gray-800 text-left shadow-xl outline -outline-offset-1 outline-white/10 transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-5xl data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <div className="bg-gray-800 p-3">
                <div className="flex justify-center">
                  <div className="text-center sm:text-left w-full">
                    {children}
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
