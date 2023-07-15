[![Netlify Status](https://api.netlify.com/api/v1/badges/36fd7c40-b676-4143-a35a-0a199f81728c/deploy-status)](https://app.netlify.com/sites/image-x-ray/deploys)
[![License](https://img.shields.io/badge/license-MIT-green)](https://github.com/YourGithubUsername/YourRepositoryName/blob/main/LICENSE)
[![Linkedin](https://img.shields.io/badge/-LinkedIn-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/yourusername)](https://www.linkedin.com/in/msmolcic/)
[![Twitter Follow](https://img.shields.io/twitter/follow/MarioSmolcic?style=social)](https://twitter.com/MarioSmolcic)

# 🔒🎨 Image X-Ray
Steganography is the practice of concealing a file, message, image, or video within another file, message, image, or video. The term comes from the Greek words steganos, meaning "covered, concealed, or protected", and graphein meaning "writing".

Unlike cryptography, which aims to protect data by transforming it into an unreadable form, steganography's goal is to hide the fact that communication is happening in the first place. In digital steganography, electronic communications may include steganographic coding inside of a transport layer, such as a document file, image file, program, or protocol.

This JavaScript implementation of a steganographer allows you to hide text messages within images. This could be used for fun, secret communications, digital watermarking, or even as a starting point for a more complex steganography project.

# 🌟 Features
Encodes a text message into an image, subtly altering the image's pixel data to store the message.
Decodes a hidden message from an image, extracting the concealed information if it exists.
Image preview feature for both original and encoded images.
Dynamically calculates the maximum message length that can be encoded into an image, based on the size of the image.

# 🔧 How to use
## ✍️ Encoding a message into an image
<ol>
  <li>Under Encode tab, select an image file by clicking on the "Choose file" button and picking an image from your machine.</li>
  <li>Enter the message you wish to encode into the "Message" text field.</li>
  <li>Click "Encode". If the encoding is successful, download button will appear together with an input box where you can enter the desired image name.</li>
</ol>

## 🔍 Decoding a message from an image
<ol>
  <li>Under Decode tab, select an image file by clicking on the "Choose file" button and picking an image from your machine.</li>
  <li>If a message is found within the image, it will be displayed in the text area.</li>
</ol>

## 💻 Setup
To use this tool, clone the repository and open the index.html file in your browser.

```bash
git clone git@github.com:msmolcic/image-x-ray.git
cd repository
open index.html
```

## 🤝 Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## 📝 Notes
* The actual number of characters that can be hidden in an image depends on its size. This tool calculates and displays the maximum possible message length based on the image dimensions.
* This steganography method is not secure for sensitive information as it doesn't involve any form of encryption. It's a fun way to hide messages but should not be used for securing data.