import "./index.css";

import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupDeleteCard } from "../components/PopupDeleteCard";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";

import {
  popupFormAvatar,
  avatarPopupSelector,
  avatarEditButton,
  deletePopupSelector,
  profileButton,
  buttonAddImage,
  profilePopupSelector,
  addPopupSelector,
  popupFormAdd,
  picturePopupSelector,
  cardListSelector,
  popupFormProfile,
  validationConfig,
  jobInput,
  nameInput,
  config,
} from "../utils/constants.js";

const validationFormAdd = new FormValidator(validationConfig, popupFormAdd);
const validationProfile = new FormValidator(validationConfig, popupFormProfile);
const validationAvatar = new FormValidator(validationConfig, popupFormAvatar);
const picturePopup = new PopupWithImage(picturePopupSelector);
const popupDeleteCard = new PopupDeleteCard(deletePopupSelector);

const userInfo = new UserInfo(
  ".profile__name",
  ".profile__text",
  ".profile__avatar"
);
const api = new Api(config);

const addNewCardPopup = new PopupWithForm(addPopupSelector, (data) => {
  addNewCardPopup.renderLoading(true);
  api
    .addCard(data.name, data.link)
    .then((res) => cardList.prependItem(createCard(res)))
    .catch((err) => console.log(err))
    .finally(() => {
      addNewCardPopup.renderLoading(false);
      addNewCardPopup.close();
    });
});

const editAvatarPopup = new PopupWithForm(avatarPopupSelector, (data) => {
  editAvatarPopup.renderLoading(true);
  api
    .editAvatar(data)
    .then((res) => {
      userInfo.editAvatar(res);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      editAvatarPopup.renderLoading(false);
      editAvatarPopup.close();
    });
});

const createCard = ({ name, link, owner, likes, _id }) => {
  const card = new Card(
    { name, link, owner, likes, _id, userId: userInfo.getMyId() },
    openImageCard,
    () => {
      popupDeleteCard.setSubmitHandler(removeCard(card))
      popupDeleteCard.open();
    },
    () =>
      api
        .addLike({_id})
        .then((res) => {
          card.setLikeCounter(res.likes.length);
        })
        .catch((err) => console.log(err)),

    () =>
      api
        .removeLike({_id})
        .then((res) => {
          card.setLikeCounter(res.likes.length);
        })
        .catch((err) => console.log(err)),

    ".image-template"
  );
  const cardElement = card.render();
  return cardElement;
};

const cardList = new Section(
  {
    renderer: (data) => {
      const cardElement = createCard(data);
      cardList.addItem(cardElement);
    },
  },
  cardListSelector
);

const editProfilePopup = new PopupWithForm(profilePopupSelector, (data) => {
  editProfilePopup.renderLoading(true);
  api
    .setUserInfo(data)
    .then((res) => {
      console.log(res);
      userInfo.setUserInfo(res);
      userInfo.updateUserInfo();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      editProfilePopup.renderLoading(false);
      editProfilePopup.close();
    });
});

const openImageCard = (name, link) => {
  picturePopup.open(name, link);
};

const removeCard = (card) => {
  return () => {
    api.deleteCard(card.getCardId()).then(() => {
      card.deleteCard();
      popupDeleteCard.close();
    });
  };
};

api
  .getAllInfo()
  .then(([userData, cardsData]) => {
    userInfo.setUserInfo(userData);
    userInfo.updateUserInfo();
    cardList.renderItems(cardsData);
  })
  .catch((err) => console.log(err));

avatarEditButton.addEventListener("click", () => {
  validationAvatar.hideErrorDefault();
  validationAvatar.setButtonDisabled();
  editAvatarPopup.open();
});

popupDeleteCard.setEventListeners();

addNewCardPopup.setEventListeners();

editAvatarPopup.setEventListeners();

picturePopup.setEventListeners();

editProfilePopup.setEventListeners();

profileButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.about;
  validationProfile.setButtonActive();
  validationProfile.hideErrorDefault();
  editProfilePopup.open();
});

buttonAddImage.addEventListener("click", () => {
  validationFormAdd.hideErrorDefault();
  validationFormAdd.setButtonDisabled();
  addNewCardPopup.open();
});

validationFormAdd.enableValidation();

validationProfile.enableValidation();

validationAvatar.enableValidation();
