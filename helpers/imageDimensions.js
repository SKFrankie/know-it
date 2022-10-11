const imageDimensions = (picture, w=400, h=400) => {
  // console.log(picture)
  if (picture.includes("cloudinary")) {
    return picture.replace(/upload\//, `upload/w_${w},h_${h}/`);
  } else {
    return picture;
  }
}

export default imageDimensions