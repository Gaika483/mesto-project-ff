// Функция создания карточки
export function createCard(
  cardData,
  handleLikeClick,
  handleDeleteCard,
  handleImageClick,
  cardTemplate
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  // Добавляем обработчики
  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", handleLikeClick);

  deleteButton.addEventListener("click", (evt) =>
    handleDeleteCard(evt, cardElement)
  );

  cardImage.addEventListener("click", () => handleImageClick(cardData));

  return cardElement;
}

// Обработчик лайка
export function handleLikeClick(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

// Функция удаления карточки
export function handleDeleteCard(evt, cardElement = null) {
  const elementToRemove = cardElement || evt.target.closest(".card");
  if (elementToRemove) {
    elementToRemove.remove();
  }
}
