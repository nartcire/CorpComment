// -- COUNTER COMPONENTS -- //
const textareaEl = document.querySelector(".form__textarea");
const counterEl = document.querySelector(".counter");

const inputHandler = () => {
  // determine the maximum number of characters
  const maxNumChars = 150;

  // determine the number of characters currently typed
  const numCharsTyped = textareaEl.value.length;

  // calculate the number of characters left (max - currently typed)
  const charsLeft = maxNumChars - numCharsTyped;

  // Show number of characters left
  counterEl.textContent = charsLeft;
};

textareaEl.addEventListener("input", inputHandler);
