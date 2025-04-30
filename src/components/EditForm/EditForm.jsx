import { RiSaveLine } from 'react-icons/ri';
import { MdOutlineCancel } from 'react-icons/md';
import { toast, Toaster } from 'react-hot-toast';

import style from './EditForm.module.css';

const EditForm = ({ updateTodo, cancelUpdate, defaultValue }) => {
  const handleSubmit = e => {
    e.preventDefault();
    const newText = e.target.elements.text.value.trim();
    if (newText === '') {
      toast.error('Please enter a task description!');
      return;
    }
    updateTodo(newText);
  };

  return (
    <>
      <form className={style.form} onSubmit={handleSubmit}>
        <button className={style.submitButton} type="submit">
          <RiSaveLine color="green" size="16px" />
        </button>

        <button
          className={style.editButton}
          type="button"
          onClick={cancelUpdate}
        >
          <MdOutlineCancel color="red" size="16px" />
        </button>

        <input
          className={style.input}
          placeholder="What do you want to write?"
          name="text"
          defaultValue={defaultValue}
          autoFocus
        />
      </form>
      <Toaster reverseOrder={false} />
    </>
  );
};

export default EditForm;
