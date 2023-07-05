import { useState } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';
import styles from "./new.module.scss"
import Dropzone from "react-dropzone";

const NewTicket = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [image,setImage] = useState("")
  const { doRequest, errors } = useRequest({
    url: '/api/tickets',
    method: 'post',
    body: {
      title,
      price,
      location,
      image
    },
    onSuccess: () => Router.push('/'),
  });

  const onSubmit = (event) => {
    event.preventDefault();

    doRequest();
  };

  const onBlur = () => {
    const value = parseFloat(price);

    if (isNaN(value)) {
      return;
    }

    setPrice(value.toFixed(2));
  };

  return (
    <div className={`${styles.ticket_container}`}>
      <h1>Create a Ticket</h1>
      <form onSubmit={onSubmit}>
      <Dropzone
        accept={{
          "image/*": [],
        }}
        onDrop={(acceptFiles) => {
          // console.log(acceptFiles)
          const reader = new FileReader();
          reader.readAsDataURL(acceptFiles[0])
          reader.onload = async()=>{
            setImage(reader.result)

          }
        }}
      >
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} className={`${styles.dropzone}`}>
            <img src="https://img.icons8.com/nolan/256/upload-to-cloud.png" />
            <input {...getInputProps()} />
            <p>
              Drag and Drop or <span>browse</span> file
            </p>
          </div>
        )}
      </Dropzone>
      {image && 
      <div className={`${styles.picked_images}`}>
        <img src={image} />
        </div>}
        <div className={`${styles.input_container}`}>
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
          />
        </div>
        <div className={`${styles.input_container}`}>
          <label>Price</label>
          <input
            value={price}
            onBlur={onBlur}
            onChange={(e) => setPrice(e.target.value)}
            className="form-control"
          />
        </div>
        <div className={`${styles.input_container}`}>
          <label>Location</label>
          <input
            value={location}
            onBlur={onBlur}
            onChange={(e) => setLocation(e.target.value)}
            className="form-control"
          />
        </div>
        {errors}
        <button className={`${styles.button}`}>Submit</button>
      </form>
    </div>
  );
};

export default NewTicket;
