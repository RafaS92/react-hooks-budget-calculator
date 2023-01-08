import React from 'react';
import { MdSend } from 'react-icons/md';

export const ExpenseForm = () => {
  return (
    <form>
      <div className="form-center">
        <div className="form-group">
          <label htmlFor="expense">charge</label>
          <input
            type="text"
            className="form-control"
            id="charge"
            name="charge"
            placeholder="e.g. rent"
          />
        </div>
        <div className="form-group">
          <label htmlFor="expense">amount</label>
          <input
            type="tel"
            className="form-control"
            id="charge"
            name="amount"
            placeholder="e.g. $100"
          />
        </div>
      </div>
      <button type='submit' className='btn'>
      submit
      <MdSend className='btn-icon' />
      </button>
    </form>
  );
};
