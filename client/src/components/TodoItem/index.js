import Button from "../Button";

import "./style.css";

const TodoItem = ({ id, description, onDelete, onEdit }) => {
  return (
    <div className="todo-item">
      <p className="desc">{description}</p>
      <div className="btn-group">
        <Button className="transparent" onClick={() => onEdit(id)}
          label={
            <img src="https://www.svgrepo.com/show/42233/pencil-edit-button.svg" alt="edit" />
          }
        />
        <Button className="transparent" onClick={() => onDelete(id)}
          label={
            <img src="https://cdn-icons-png.flaticon.com/512/3405/3405244.png" alt="delete" />
          }
        />
      </div>
    </div>
  );
};

export default TodoItem;
