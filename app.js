const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const form = document.querySelector("form");
const imageInput = document.querySelector("#controls__image");
const titleInput = document.querySelector("#controls__title");

let img = new Image();
let fileName = "";
let title = "";

form.addEventListener("submit", (e) => {
  e.preventDefault();

  title = titleInput.value;

  const fileReader = new FileReader();

  if (imageInput.files[0]) {
    fileName = imageInput.files[0].name;
    fileReader.readAsDataURL(imageInput.files[0]);
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

  ctx.font = "bold 50px Impact";
  ctx.fillStyle = "rgb(255, 255, 255)";
  ctx.fillText(title, 0, 50);

  let a = document.createElement("a");
  a.href = canvas.toDataURL("image/jpeg");
  a.download = `${fileName.slice(0, -4)} meme`;
  a.innerHTML = "download";

  document.body.appendChild(a);
};
