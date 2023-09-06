export function setHtmlToClipboard(imgURL: string) {
  navigator.permissions
    .query({ name: "clipboard-write" as any })
    .then(async (result) => {
      if (result.state === "granted") {
        // 复制一段文本
        // var blob = new Blob(['<p>... paragraph ...</p>'], { type: 'text/plain' });
        // var item = new ClipboardItem({ 'text/plain': blob });
        const data = await fetch(imgURL);
        const blob = await data.blob();
        const item = new ClipboardItem({
          [blob.type]: blob,
        });
        navigator.clipboard.write([item]).then(
          function () {
            console.log("Copied to clipboard successfully!");
          },
          function (error) {
            console.error("unable to write to clipboard. Error:");
            console.log(error);
          }
        );
      } else {
        console.log("clipboard-permissoin not granted: " + result);
      }
    });
}
