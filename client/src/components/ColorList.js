import React, { useState } from "react";
import axiosWithAuth from '../utils/axiosWithAuth'

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
 const [color, setColor] = useState({
    color: '',
    code: {hex: '', }
 })

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?

      axiosWithAuth()
      .put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        // console.log("COLORedit", res)
        updateColors(colors.map(newColor => res.data.id === newColor.id ? res.data : newColor))
        setEditing(false)
      })
      .catch(err => console.log(err.response))
  };

  const deleteColor = color => {
    axiosWithAuth()
    .delete(`/colors/${color.id}`)
    .then( res => {
      updateColors(colors.filter( deleteColor => {
        return deleteColor.id !== res.data
      }));
      setEditing(false)
    })
    .catch(err => console.log(err.response))
  };

  const added =e => {
    e.preventDefault();

    axiosWithAuth()
    .post(`/colors`, color)
    .then(res => {
      updateColors(res.data)
    })
    .catch(err => console.log(err))
  }

  const change= e=> {
   setColor({
     ...color,
     color:e.target.value
   })
  }

   const newHex = e=> {
     setColor({
       ...color,
       code:{hex: e.target.value} 
     })
   }

  

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}


      <form onSubmit={added}>
        <h3> Add a New Color! :D </h3>
            <label>
            Color name:
            <input
            onChange={change}
            value={color.color}
            />
        </label>
        <label>
            Hex code:
            <input
            onChange={newHex}
            value={color.code.hex}
            />
        </label>
        <div className="button-row">
            <button type="submit">Add Color</button>
        </div>
    </form>
    </div>
  );
};

export default ColorList;
