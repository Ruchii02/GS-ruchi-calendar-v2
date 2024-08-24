import { useState } from "react";

interface FormModalProps {
  isOpen: boolean;
  onSubmit: (formData: any) => void;
  onClose: () => void;
}

const FormModal: React.FC<FormModalProps> = ({ isOpen, onSubmit, onClose }) => {
  const [exerciseName, setExerciseName] = useState("");
  const [trainerName, setTrainerName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [period, setPeriod] = useState("AM");
  const [customerName, setCustomerName] = useState("");
  const [userPicture, setUserPicture] = useState("");

  const handleSubmit = () => {
    const eventData = {
      exerciseName,
      trainerName,
      startTime,
      endTime,
      period,
      customerName,
      userPicture,
    };
    onSubmit(eventData);
  };
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50">
      <div className="bg-white dark:bg-stone-700 p-8 rounded-lg shadow-lg w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100">
            Add Note
          </h2>
          <button
            onClick={onClose}
            className="text-stone-500 hover:text-red-500 dark:text-stone-300"
          >
            ✕
          </button>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-stone-700 dark:text-stone-300">
              Exercise Name
            </label>
            <input
              type="text"
              placeholder="Enter exercise name"
              value={exerciseName}
              onChange={(e) => setExerciseName(e.target.value)}
              className="w-full p-2 border border-stone-300 dark:border-stone-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 dark:text-stone-300">
              Trainer Name
            </label>
            <input
              type="text"
              placeholder="Enter trainer name"
              value={trainerName}
              onChange={(e) => setTrainerName(e.target.value)}
              className="w-full p-2 border border-stone-300 dark:border-stone-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-sm">Start Time:</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full p-2 border border-stone-300 rounded-md dark:bg-stone-600 dark:text-white"
                required
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm">End Time:</label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full p-2 border border-stone-300 rounded-md dark:bg-stone-600 dark:text-white"
                required
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm">AM/PM:</label>
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="w-full p-2 border border-stone-300 rounded-md dark:bg-stone-600 dark:text-white"
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 dark:text-stone-300">
              Customer Name
            </label>
            <input
              type="text"
              placeholder="Enter customer name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full p-2 border border-stone-300 dark:border-stone-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 dark:text-stone-300">
              User Picture
            </label>
            <input
              type="file"
              onChange={(e) =>
                setUserPicture(e.target.files ? e.target.files[0].name : "")
              }
              className="w-full p-2 border border-stone-300 dark:border-stone-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md"
            >
              Add
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-stone-500 hover:bg-stone-600 text-white font-semibold px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormModal;
