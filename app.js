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

  title = titleInput.value.toUpperCase();

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
  canvas.height = img.naturalHeight * 2;

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.drawImage(
    img,
    0,
    canvas.height * 0.25,
    img.naturalWidth,
    img.naturalHeight
  );

  ctx.font = `bold ${canvas.width / 9}px Impact`;
  titleWidth = ctx.measureText(title).width;
  ctx.strokeStyle = "black";
  ctx.lineWidth = 8;
  ctx.fillStyle = "white";

  ctx.strokeText(
    title,
    canvas.width / 2 - titleWidth / 2,
    canvas.height * 0.17
  );
  ctx.fillText(title, canvas.width / 2 - titleWidth / 2, canvas.height * 0.17);

  downloadInput.href = canvas.toDataURL("image/jpeg");
  downloadInput.download = `${fileName.slice(0, -4)} meme`;
};
