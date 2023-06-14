export default function ModalDelete({ setShowModal }) {
  const handleCancel = () => {
    setShowModal(false); // Close the modal when cancel is clicked
  };

  const handleConfirm = () => {
    console.log("delete airtable data");
    setShowModal(false); // Close the modal after delete action is completed
  };

  return (
    <>
      <dialog id="modal" open>
        <h2>ARE YOU SURE...?</h2>
        <p>Delete this memory?</p>
        <div className="modal-actions">
          <button onClick={handleCancel} className="cancel">
            Cancel
          </button>
          <button onClick={handleConfirm} className="confirm">
            Confirm
          </button>
        </div>
      </dialog>
    </>
  );
}
