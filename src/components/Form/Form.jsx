import { FiSearch } from 'react-icons/fi';
import style from './Form.module.css';
import { forwardRef } from 'react';

const Form = forwardRef(({ onSubmit }, ref) => {
  return (
    <form ref={ref} onSubmit={onSubmit} className={style.form}>
      <button className={style.button} type="submit">
        <FiSearch size="16px" />
      </button>

      <input
        className={style.input}
        placeholder="What do you want to write?"
        name="search"
        autoFocus
      />
    </form>
  );
});

export default Form;
