const notificationBtn = document.querySelector(".notifications-bnt-wrapper");
const notificationsModal = document.querySelector(".notifications-modal");

const countNotifications = document.querySelector(
  ".unread-notifications-count"
);
let notifications;

notificationBtn.addEventListener("click", () => {
  notificationBtn.classList.toggle("active");
  notificationsModal.classList.toggle("active");
});

function addNotificationListener() {
  const notifications = document.querySelectorAll(".notification");

  notifications.forEach((notification) => {
    notification.addEventListener("mouseover", () => {
      if (!notification.classList.contains("read")) {
        notification.classList.add("read");
        verifyToken()
          .then((id) => markNotificationsAsRead(id, notification.id))
          .then(renderCountOfNotifications());
      }
    });
  });
}

function renderCountOfNotifications() {
  notifications = document.querySelectorAll(".notification");
  let countUnreadNotifications = Array.from(notifications).filter(
    (notification) => !notification.classList.contains("read")
  ).length;
  countNotifications.innerHTML =
    countUnreadNotifications > 9 ? "+9" : countUnreadNotifications;
  if (countUnreadNotifications > 0) {
    countNotifications.classList.add("active");
  } else {
    countNotifications.classList.remove("active");
  }
}

function renderNotifications(notifications) {
  const modalNotifications = document.querySelector(".notifications-modal");

  notifications.forEach((notification) => {
    modalNotifications.innerHTML += `
    <a href="${notification.link === null ? "" : notification.link}">
      <div  class="notification ${notification.isRead ? "read" : ""}" id="${
      notification.id
    }">
        <div class="notification-title">${notification.title}</div>
        <div class="notification-description">
        ${notification.message}
        </div>
      </div>
    </a>`;
  });

  addNotificationListener();
  renderCountOfNotifications();
}

function markNotificationsAsRead(userId, notificationId) {
  return fetch("https://localhost:7164/notifications/mark-as-read", {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ userId, notificationId }),
  });
}
