import { ListItem, ListItemIcon, TextField } from '@material-ui/core';
import React, { useCallback, useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import { useDispatch } from 'react-redux';
import { fetchDirectory, saveDirectory } from '../../reducks/users/operations';

const CreateDirectory = () => {
  const dispatch = useDispatch();
  const [directory, setDirectory] = useState('');
  const inputDirectory = useCallback(
    (event) => {
      setDirectory(event.target.value);
    },
    [setDirectory]
  );
  return (
    <div>
      <ListItem>
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          label="ディレクトリ作成"
          name="directory"
          value={directory}
          onChange={inputDirectory}
        />
        <ListItemIcon
          button
          key="create"
          onClick={() => {
            dispatch(saveDirectory(directory));
            dispatch(fetchDirectory());
            setDirectory('');
          }}
        >
          <AddIcon />
        </ListItemIcon>
      </ListItem>
    </div>
  );
};

export default CreateDirectory;
