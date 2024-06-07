import React, { useState } from 'react';

function DeleteConfirmation({ show, onConfirm, onCancel }: any) {
  if (!show) return null;

  return (
    <div className="confirmation-dialog">
      <p>Are you sure you want to delete this item?</p>
      <button onClick={onConfirm}>Yes</button>
      <button onClick={onCancel}>No</button>
    </div>
  );
}

export default DeleteConfirmation;