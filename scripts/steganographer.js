const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
let maxMessageLength = 0;

function encodeImage(img, message) {
  if (message.length > maxMessageLength)
    throw new Error('Message is too big to encode in the image');

  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0, img.width, img.height);

  let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let data = imageData.data;

  for (let i = 0; i < message.length; i++) {
    let code = message.charCodeAt(i);

    for (let j = 7; j >= 0; j--) {
      let dataIndex = i * 8 + j;

      data[dataIndex] = (data[dataIndex] & 0xfe) | ((code >> j) & 1);
    }
  }

  for (let i = message.length; i < maxMessageLength; i++) {
    for (let j = 7; j >= 0; j--) {
      let dataIndex = i * 8 + j;

      data[dataIndex] = data[dataIndex] & 0xfe;
    }
  }

  ctx.putImageData(imageData, 0, 0);
}

function decodeImage(img) {
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0, img.width, img.height);

  let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let data = imageData.data;

  let message = '';
  for (let i = 0; i < maxMessageLength; i++) {
    let code = 0;

    for (let j = 7; j >= 0; j--) {
      let dataIndex = i * 8 + j;
      code |= (data[dataIndex] & 1) << j;
    }

    if (code === 0) {
      break;
    }

    message += String.fromCharCode(code);
  }

  return message;
}

function previewImage(files, canvasId) {
  const file = files[0];
  const img = new Image();
  const reader = new FileReader();

  reader.onload = function (event) {
    img.onload = function () {
      const previewCanvas = document.getElementById(canvasId);
      const previewCtx = previewCanvas.getContext('2d');

      previewCtx.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
      previewCtx.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        0,
        0,
        previewCanvas.width,
        previewCanvas.height
      );

      if (canvasId === 'previewEncode') {
        maxMessageLength = Math.floor((img.width * img.height) / 8);
        updateMessageLength();
      }
    };

    img.src = event.target.result;
  };

  reader.readAsDataURL(file);
}

function updateMessageLength() {
  const messageInput = document.getElementById('message');
  const messageLengthElement = document.getElementById('messageLength');

  messageLengthElement.textContent = `Message length: ${messageInput.value.length} / ${maxMessageLength}`;
  messageInput.maxLength = maxMessageLength;
}

function encode() {
  const fileInput = document.getElementById('uploadImage');
  const messageInput = document.getElementById('message');
  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.onload = function (event) {
    const img = new Image();
    img.onload = function () {
      try {
        encodeImage(img, messageInput.value);

        const previewCanvas = document.getElementById('previewEncode');
        const previewCtx = previewCanvas.getContext('2d');
        previewCtx.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
        previewCtx.drawImage(
          canvas,
          0,
          0,
          img.width,
          img.height,
          0,
          0,
          previewCanvas.width,
          previewCanvas.height
        );

        const dataUrl = canvas.toDataURL('image/png');
        const downloadLink = document.getElementById('downloadLink');
        downloadLink.href = dataUrl;
        const imageName = document.getElementById('imageName');
        downloadLink.download =
          imageName.value.length > 0 ? imageName.value : 'encoded-image';

        const fileName = document.getElementById('fileName');
        fileName.style.display = 'block';
        downloadLink.style.display = 'block';
      } catch (error) {
        alert('Error encoding image: ' + error);
      }
    };

    img.src = event.target.result;
  };

  reader.readAsDataURL(file);
}

function autoDecode(files) {
  previewImage(files, 'previewDecode');
  decode();
}

function decode() {
  const fileInput = document.getElementById('uploadStegoImage');
  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.onload = function (event) {
    const img = new Image();
    img.onload = function () {
      try {
        const message = decodeImage(img);
        const decodedMessageElement = document.getElementById('decodedMessage');
        decodedMessageElement.textContent = message;

        const previewCanvas = document.getElementById('previewDecode');
        const previewCtx = previewCanvas.getContext('2d');
        previewCtx.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
        previewCtx.drawImage(
          img,
          0,
          0,
          img.width,
          img.height,
          0,
          0,
          previewCanvas.width,
          previewCanvas.height
        );
      } catch (error) {
        alert('Error decoding image: ' + error);
      }
    };

    img.src = event.target.result;
  };

  reader.readAsDataURL(file);
}
