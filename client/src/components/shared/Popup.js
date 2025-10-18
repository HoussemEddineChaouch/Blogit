import { motion, AnimatePresence } from "framer-motion";
import { MdDelete } from "react-icons/md";
import { MdTipsAndUpdates } from "react-icons/md";

function Popup({ isOpen, toDelete = true, handleCancel, handleConfirm }) {
  if (!isOpen) return null;

  const style = toDelete ? "bg-redColor" : "bg-greenBaseColor";
  const textStyle = toDelete ? "text-redColor" : "text-greenBaseColor";
  const borderStyle = toDelete ? "border-redColor" : "border-greenBaseColor";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="font-Cairo w-screen h-screen bg-fontBaseColor/30 fixed top-0 left-0 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={`relative bg-baseColor w-[450px] h-[280px] rounded-2xl shadow-2xl p-8 text-center flex flex-col justify-between ${textStyle}`}
            initial={{ scale: 0.7, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.7, opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <h1 className="font-bold text-3xl">
              {toDelete ? "Delete Blog" : "Update Blog"}
            </h1>

            <div className="mx-auto">
              {toDelete ? (
                <MdDelete fontSize={40} />
              ) : (
                <MdTipsAndUpdates fontSize={40} />
              )}
            </div>

            <p className="max-w-[280px] mx-auto">
              {toDelete
                ? "Are you sure you want to delete this blog? This action cannot be undone."
                : "Are you sure you want to update this blog? Your changes will overwrite the existing content."}
            </p>

            <div className="flex gap-4 justify-center">
              <button
                onClick={handleCancel}
                className={`border py-2 px-8 rounded-full ${borderStyle}`}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className={`border py-2 px-8 rounded-full text-baseColor ${style}`}
              >
                Confirm
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Popup;
