interface Message {
  author: string,
  content: string,
}

function printMessage(message: Message) {
  console.log(`${message.author}: ${message.content}`);
}

const messages: Message[] = [
  { author: "divad", content: "asdads world!" },
  { author: "divad", content: "hello!" },
];
for (const message of messages) {
  printMessage(message);
}