// -- GLOBAL -- //
const MAX_CHARS = 150;

const textareaEl = document.querySelector(".form__textarea");
const counterEl = document.querySelector(".counter");
const formEl = document.querySelector(".form");
const feedbackListEl = document.querySelector(".feedbacks");
const submitBtnEl = document.querySelector(".submit-btn");

// -- COUNTER COMPONENTS -- //
const inputHandler = () => {
  // determine the number of characters currently typed
  const numCharsTyped = textareaEl.value.length;

  // calculate the number of characters left (max - currently typed)
  const charsLeft = MAX_CHARS - numCharsTyped;

  // Show number of characters left
  counterEl.textContent = charsLeft;
};

textareaEl.addEventListener("input", inputHandler);

// -- FORM COMPONENT -- //
const showVisualIndicator = (textCheck) => {
  // show indicator
  formEl.classList.add(`form--${textCheck}`);

  // remove indicator
  setTimeout(() => formEl.classList.remove(`form--${textCheck}`), 2000);
};

const submitHandler = (event) => {
  // prevent the default browser action (submitting form data to 'action'-address and refreshing page)
  event.preventDefault();

  // get text from text area
  const text = textareaEl.value;

  // validate text (check if hashtag is present and text is long enough)
  if (text.includes("#") && text.length > 4) {
    showVisualIndicator("valid");
  } else {
    showVisualIndicator("invalid");

    // focus textarea again
    textareaEl.focus();

    // stop this function execution
    return;
  }

  // we have text, now extract other information from the text
  const hashtag = text.split(" ").find((element) => element.includes("#"));
  const company = hashtag.substring(1);
  const badgeLetter = company.substring(0, 1).toUpperCase();
  const upVoteCount = 0;
  const daysAgo = 0;

  // new feedback item HTML
  const feedbackItemHTML = `
    <li class="feedback">
      <button class="upvote">
          <i class="fa-solid fa-caret-up upvote__icon"></i>
          <span class="upvote__count">${upVoteCount}</span>
      </button>
      <section class="feedback__badge">
          <p class="feedback__letter">${badgeLetter}</p>
      </section>
      <div class="feedback__content">
          <p class="feedback__company">${company}</p>
          <p class="feedback__text">${text}</p>
      </div>
      <p class="feedback__date">${daysAgo === 0 ? "NEW" : `${daysAgo}d`}</p>
    </li>
  `;

  // insert feedback item in list
  feedbackListEl.insertAdjacentHTML("beforeend", feedbackItemHTML);

  // clear textarea
  textareaEl.value = "";

  // blur submit button
  submitBtnEl.blur();

  // reset counter
  counterEl.textContent = MAX_CHARS;
};

formEl.addEventListener("submit", submitHandler);
