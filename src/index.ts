import axios from 'axios';

const container = document.getElementById("container");
let availImages: string[] = [];
let currentImageIndex: number = 0;
// @ts-ignore
let movementIntervalHandle: number = 0;
let horizontalMove: number = 1;
let verticalMove: number = 1;

// @ts-ignore
function moveTheImage() {
  const theImage = document.getElementById("theImage") as HTMLImageElement;
  if (!theImage) return;

  let doChange = false;
  const curLeft = parseInt(theImage.style?.left ?? 0, 10) ?? 0;
  const impliedRight = curLeft + theImage.naturalWidth;

  const hChange = (Math.floor(Math.random() * 4)) + 1;
  if (impliedRight >= window.innerWidth) {
    // console.log("triggered right >= window.innerWidth");
    //right edge is now over the right, switch direction
    doChange = true;
    horizontalMove = -1 * hChange;
  }

  if (curLeft < 0) {
    // console.log("triggered left <= 0");
    //right edge is now over the right, switch direction
    doChange = true;
    horizontalMove = hChange;
  }

  const curTop = parseInt(theImage.style?.top ?? 0, 10) ?? 0;
  const impliedBottom = curTop + theImage.naturalHeight;

  if (impliedBottom >= window.innerHeight) {
    // console.log("triggered bottom >= window.innerHeight");
    //botom edge is now over the bottom, start moving up
    doChange = true;
    verticalMove = -1;
  }

  if (curTop < 0) {
    // console.log("triggered top <= 0");
    //top edge is above top, start moving down
    doChange = true;
    verticalMove = 1;
  }

  if (doChange) {
    // console.log("inside moveTheImage(), and doChange was true");
    // we hit an edge
    // cancel the movement
    clearInterval(movementIntervalHandle);
    // incremenet index (with wrap)
    // console.log(`old current=${currentImageIndex}`);
    currentImageIndex = (currentImageIndex + 1) % availImages.length;
    // console.log(`new current=${currentImageIndex}`);
    // assign new src
    theImage.src = `./images/${availImages[currentImageIndex]}`;

    // HOPEFULLY, this triggers the .onload to fire, and starts the movement back up
    // console.log({ horizontalMove, verticalMove });
  }

  theImage.style.left = `${curLeft + horizontalMove}px`;
  theImage.style.top = `${curTop + verticalMove}px`;

}

async function fetchImages() {
  try {
    const response = await axios.get<string[]>('./images/manifest.json');
    availImages = response.data;
    console.log(availImages);

    currentImageIndex = Math.floor(Math.random() * availImages.length);
    const firstImageFile = availImages[currentImageIndex];
    console.log(`first index = ${currentImageIndex}`);

    // console.log(`Image file[${currentImageIndex}]: ${firstImageFile}`);

    const newImg = document.createElement("img");
    newImg.id = "theImage";
    // newImg.width = 384;
    // newImg.height = 216;
    newImg.style.position = "absolute";
    newImg.style.left = "1px";
    newImg.style.top = "1px";
    newImg.src = `./images/${firstImageFile}`;
    container?.append(newImg);

    newImg.onload = function () {
      // console.log("-----------------img onload fired-----------------------");
      // console.log("this", this);
      // console.log("ev", ev);
      // console.log("ev.currentTarget", ev.currentTarget);
      // const ct = ev.currentTarget as HTMLImageElement;
      // newImg.width = ct.width;
      // newImg.height = ct.height;

      movementIntervalHandle = window.setInterval(moveTheImage, 5);
      moveTheImage();
    }

  } catch (error) {
    console.error("Error fetching images:", error);
  }
}

fetchImages();
