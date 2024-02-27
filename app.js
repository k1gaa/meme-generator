const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const form = document.querySelector("form");
const imageInput = document.querySelector("#controls__image");
const titleInput = document.querySelector("#controls__title");
let downloadInput = document.querySelector("#controls__download");

let img = new Image();
let fileName = "";
let title = "";

form.addEventListener("submit", (e) => {
  e.preventDefault();

  title = titleInput.value;

  const fileReader = new FileReader();
  const file = imageInput.files[0];

  if (file) {
    fileName = file.name;
    fileReader.readAsDataURL(file);
  }

  fileReader.addEventListener("load", () => {
    img.onload = function () {
      createMeme();
    };
    img.src = fileReader.result;
  });
});

const createMeme = () => {
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);

  ctx.font = "bold 200px Impact";
  ctx.fillStyle = "rgb(255, 255, 255)";
  ctx.fillText(title, 0, 200);

  downloadInput.href = canvas.toDataURL("image/jpeg");
  downloadInput.download = `${fileName.slice(0, -4)} meme`;
};
