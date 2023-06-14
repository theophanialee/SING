export default function ModalDelete({
  setShowModal,
  deleteId,
  airtableURL,
  airTable,
}) {
  function handleCancel() {
    setShowModal(false); // Close the modal when cancel is clicked
  }

  function handleConfirm() {
    console.log("delete airtable data ", deleteId);
    const deleteURL = `${airtableURL}/${deleteId}`;

    async function deleteList() {
      await fetch(deleteURL, {
        method: "DELETE",
        headers: airTable.header,
      });
    }
    deleteList();
    setShowModal(false); // Close the modal after delete action is completed
  }

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
