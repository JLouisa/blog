const textFormatter = (inputText) => {
  // Calculate the target length for each part
  const targetLength = Math.ceil(inputText.length / 4);

  // Initialize variables
  let remainingText = inputText;
  const paragraphs = [];

  // Loop to create three paragraphs
  for (let i = 0; i < 3; i++) {
    // Find the index of the last period within the target length
    const lastIndex = remainingText.lastIndexOf(".", targetLength);

    // If no period is found within the target length, use the last period in the remaining text
    const index = lastIndex !== -1 ? lastIndex : remainingText.lastIndexOf(".");

    // Extract the part and remove it from the remaining text
    const part = remainingText.substring(0, index + 1).trim();
    remainingText = remainingText.substring(index + 1).trim();

    // Create a React element for the paragraph and add it to the array
    paragraphs.push(<p key={i}>{part}</p>);
  }

  // The last part includes the remaining text and ends with a period
  paragraphs.push(<p key={3}>{remainingText}</p>);

  // Return the array of React elements representing paragraphs
  return paragraphs;
};

export default textFormatter;
