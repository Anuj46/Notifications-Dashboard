// mockService.js
// ----- Utility to simulate network delay -----
const simulateDelay = (ms = 500) =>
  new Promise((resolve) => setTimeout(resolve, ms));
// ----- LocalStorage Keys -----
const LS_NOTIFICATIONS_KEY = "mock_notifications";
// ----- Seed Data for First-Time Load -----
const initialNotifications = [
  {
    id: 1,
    message: "New user signed up",
    time: "2 min ago",
    read: false,
  },
  {
    id: 2,
    message: "Server CPU usage high",
    time: "10 min ago",
    read: false,
  },
  {
    id: 3,
    message: "Payment received",
    time: "20 min ago",
    read: true,
  },
];
// Save initial data if not exists
if (!localStorage.getItem(LS_NOTIFICATIONS_KEY)) {
  localStorage.setItem(
    LS_NOTIFICATIONS_KEY,
    JSON.stringify(initialNotifications)
  );
}
// Helper to get and set localStorage notifications
const getStoredNotifications = () =>
  JSON.parse(localStorage.getItem(LS_NOTIFICATIONS_KEY)) || [];
const saveStoredNotifications = (list) =>
  localStorage.setItem(LS_NOTIFICATIONS_KEY, JSON.stringify(list));
export const mockService = {
  // ---------------------------------------------------------------------
  // 🔔 NOTIFICATIONS API
  // ---------------------------------------------------------------------
  async getNotifications() {
    await simulateDelay(600); // mimic API delay
    return getStoredNotifications();
  },
  async addNotification(message) {
    await simulateDelay(400);
    const list = getStoredNotifications();
    const newNotification = {
      id: Date.now(),
      message,
      time: "Just now",
      read: false,
    };
    list.unshift(newNotification);
    saveStoredNotifications(list);
    return newNotification;
  },
  async markAsRead(id) {
    await simulateDelay(300);
    const list = getStoredNotifications().map((item) =>
      item.id === id ? { ...item, read: true } : item
    );
    saveStoredNotifications(list);
    return list;
  },
  async markAllAsRead() {
    await simulateDelay(300);
    const list = getStoredNotifications().map((n) => ({
      ...n,
      read: true,
    }));
    saveStoredNotifications(list);
    return list;
  },
  async deleteNotification(id) {
    await simulateDelay(300);
    const list = getStoredNotifications().filter((n) => n.id !== id);
    saveStoredNotifications(list);
    return list;
  },
  async unreadCount() {
    await simulateDelay(200);
    const list = getStoredNotifications();
    return list.filter((n) => !n.read).length;
  },
  // ---------------------------------------------------------------------
  // 📊 ANALYTICS API
  // ---------------------------------------------------------------------
  async getMonthlySales() {
    await simulateDelay(800);
    return [
      { month: "Jan", value: 120 },
      { month: "Feb", value: 180 },
      { month: "Mar", value: 240 },
      { month: "Apr", value: 300 },
      { month: "May", value: 280 },
    ];
  },
  async getUserGrowth() {
    await simulateDelay(900);
    return [
      { label: "Active Users", value: 1500 },
      { label: "New Users", value: 400 },
      { label: "Returning Users", value: 700 },
    ];
  },
};



