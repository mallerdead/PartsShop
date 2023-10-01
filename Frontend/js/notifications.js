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

function addNotificationListener(notification) {
  notification.addEventListener("mouseover", () => {});
}

function renderCountOfNotifications() {
  notifications = document.querySelectorAll(".notification");
  notifications.forEach((notification) =>
    notification.addEventListener("mouseover", () =>
      notification.classList.add("read")
    )
  );
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
    <a href="orderMoreInfo.html">
      <div class="notification ${notification.isRead ? "read" : ""}">
        <div class="notification-title">${notification.title}</div>
        <div class="notification-description">
        ${notification.message}
        </div>
      </div>
    </a>`;
  });
  renderCountOfNotifications();
}
