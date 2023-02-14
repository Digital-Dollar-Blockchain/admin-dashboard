import { useState, useEffect } from "react";
import Button from "../Button";
import Input from "../Input";

const NewItem = ({ todo, id, onSave }) => {

  const [desc, setDesc] = useState("");

  useEffect(() => {
    setDesc(todo);
  }, [todo]);

  const handleClick = () => {
    onSave(desc, id);
  };

  return (
    <div className="toolbar">
      <Input
        className="w-100 mr-10px"
        type="text"
        name="keyword"
        maxLength="25"
        placeholder="At most 25 characters"
        icon={<img alt="Search icon" src="https://www.pngfind.com/pngs/m/502-5020179_to-do-list-png-todo-list-svg-transparent.png" />}
        value={desc}
        onChange={e => setDesc(e.target.value)}
      />
      <Button className="btn-new" onClick={handleClick} label="Save" disabled={!desc} />
    </div>
  );
};

export default NewItem;
