import TodoListItem from '../TodoListItem/TodoListItem';
import Grid from '../Grid/Grid';
import GridItem from '../GridItem/GridItem.jsx';

const TodoList = ({ tasks, handleRemoveItem, handleEditTodo }) => {
  return (
    <Grid>
      {tasks.map((task, index) => (
        <GridItem key={task.id}>
          <TodoListItem
            task={task}
            index={index + 1}
            handleEditTodo={handleEditTodo}
            handleRemoveItem={handleRemoveItem}
          />
        </GridItem>
      ))}
    </Grid>
  );
};

export default TodoList;
