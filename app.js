const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
const form = document.querySelector("form");
const imageInput = document.querySelector("#controls__image");
const titleInput = document.querySelector("#controls__title");

const img = new Image();
let title = "";

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const fileReader = new FileReader();

  if (imageInput.files[0]) {
    fileReader.readAsDataURL(imageInput.files[0]);
  }

  fileReader.addEventListener("load", () => {
    img.onload = function () {
      createMeme();
    };
    img.src = fileReader.result;
  });

  title = titleInput.value;
});

const createMeme = () => {
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);

  ctx.font = "bold 50px Impact";
  ctx.fillStyle = "rgb(255, 255, 255)";
  ctx.fillText(title, 0, 50);

  document.body.appendChild(canvas);
};