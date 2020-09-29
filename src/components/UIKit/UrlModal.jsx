import { makeStyles } from '@material-ui/styles';
import React, { useCallback, useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUrlInfo, saveUrl } from '../../reducks/users/operations';
import Modal from 'react-modal';
import { Button, Divider, TextField, Typography } from '@material-ui/core';
import { ApiContext } from '../../context/ApiContext';

const useStyles = makeStyles((theme) => ({
  save: {
    marginTop: '5%',
  },
  space: {
    marginTop: '5%',
  },
}));

const UrlModal = (props) => {
  const classes = useStyles();
  const customStyles = {
    content: {
      top: '30%',
      left: '43%',
      right: 'auto',
      bottom: 'auto',
      width: '20%',
    },
  };

  //親からの値(isOpen, onRequestClose, directoryType)
  const { isOpen, onRequestClose, directoryType } = props;

  const dispatch = useDispatch();

  const [modalTitle, setModalTitle] = useState(''),
    [modalUrlName, setModalUrlName] = useState('');

  const { setModalIsOpen } = useContext(ApiContext);

  Modal.setAppElement('#root');

  const inputModalTitle = useCallback(
    (event) => {
      setModalTitle(event.target.value);
    },
    [setModalTitle]
  );

  const inputModalUrlName = useCallback(
    (event) => {
      setModalUrlName(event.target.value);
    },
    [setModalUrlName]
  );
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
      <div>
        <Typography>URL登録</Typography>
        <Divider />
        <Typography className={classes.space}>title</Typography>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="title"
          name="title"
          value={modalTitle}
          onChange={inputModalTitle}
        />
        <Typography>URL</Typography>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="URL"
          name="URL"
          value={modalUrlName}
          onChange={inputModalUrlName}
        />
        <Divider />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.save}
          onClick={() => {
            dispatch(saveUrl(directoryType, modalTitle, modalUrlName));
            dispatch(fetchUrlInfo(directoryType));
            setModalTitle('');
            setModalUrlName('');
            setModalIsOpen(false);
          }}
        >
          保存
        </Button>
      </div>
    </Modal>
  );
};

export default UrlModal;
