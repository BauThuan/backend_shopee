const express = require("express");
const router = express.Router();
const appController = require("../controllers/appController");
const userController = require("../controllers/userController");
const systemController = require("../controllers/systemController");
const verifyToken = require("../middleware/auth");
const checkAdmin = require("../middleware/checkAdmin");
const db = require("../models/index");

router.get("/auth", verifyToken, userController.getInforAccount);
router.post("/auth/register", userController.registerAccount);
router.post("/auth/register-extra-infor", userController.registerExraInfor);
router.post(
  "/auth/send-email-forgot-password",
  userController.sendEmailForgotPassword
);
router.put("/auth/forgot-password", userController.handleForgotPassword);
router.post("/auth/login", userController.loginAccount);
router.put("/auth/change-pass", verifyToken, userController.changePassword);
router.put(
  "/auth/edit-extra-infor",
  verifyToken,
  userController.editExtraInfor
);
router.get("/auth/get-all-cart", verifyToken, userController.getAllCart);
router.get(
  "/auth/get-all-cart-by-statusId",
  verifyToken,
  userController.getAllCartByStatusId
);
router.post("/auth/add-one-cart", verifyToken, userController.addOneCart);
router.delete(
  "/auth/delete-one-cart",
  verifyToken,
  userController.deleteOneCart
);
router.post(
  "/auth/handle-borrow-now",
  verifyToken,
  userController.borrowNowCart
);

router.get(
  "/auth/get-all-notifycation",
  verifyToken,
  userController.getAllNotifycation
);
router.post(
  "/auth/add-one-notifycation",
  verifyToken,
  userController.addOneNotifycation
);
router.post(
  "/auth/add-one-notifycation-socket",
  userController.addOneNotifycationSocket
);
router.delete(
  "/auth/delete-one-notifycation-socket",
  userController.deleteOneNotifycationSocket
);
router.delete(
  "/auth/delete-one-notifycation",
  verifyToken,
  userController.deleteOneNotifycation
);

router.get("/get-allcode-by-type", appController.getAllCodeByType);
router.get("/get-all-book-by-category", appController.getAllBookByCategory);
router.get("/get-outstanding-book", appController.getOutStandingBook);
router.get("/get-infor-book-by-id", appController.getInforBookById);
router.get("/get-all-message-by-roomId", appController.getAllMessageByRoomId);
router.post(
  "/post-one-message-by-room",
  verifyToken,
  appController.postOneMessageByRoom
);
router.delete(
  "/delete-one-message-by-id",
  verifyToken,
  appController.deleteOneMessageByRoom
);
router.put(
  "/update-one-message-by-id",
  verifyToken,
  appController.updateOneMessageByRoom
);
router.get("/get-length-list-book", appController.getLengthListBook);
router.get("/get-infor-author-by-id", appController.getInforAuthorById);
router.get(
  "/get-book-of-author-by-authorId",
  appController.getBookOfAuthorByAuthorId
);
router.get("/search-book-or-author", appController.searchBookOrAuthor);

router.get("/system/get-all-user", checkAdmin, systemController.getAllUser);
router.post("/system/add-new-user", checkAdmin, systemController.addNewUser);
router.get(
  "/system/get-user-by-role",
  checkAdmin,
  systemController.getUserByRole
);
router.put(
  "/system/update-user-by-id",
  checkAdmin,
  systemController.updateUserById
);
router.delete(
  "/system/delete-user-by-id",
  checkAdmin,
  systemController.deleteUserById
);

router.post("/system/add-new-book", checkAdmin, systemController.addNewBook);
router.get("/system/get-all-book", checkAdmin, systemController.getAllBook);
router.get(
  "/system/get-book-by-category",
  checkAdmin,
  systemController.getBookByCategory
);
router.put(
  "/system/update-book-by-id",
  checkAdmin,
  systemController.updateBookById
);
router.delete(
  "/system/delete-book-by-id",
  checkAdmin,
  systemController.deleteBookById
);

router.post(
  "/system/add-new-author",
  checkAdmin,
  systemController.addNewAuthor
);
router.get("/system/get-all-author", checkAdmin, systemController.getAllAuthor);
router.put(
  "/system/update-author-by-id",
  checkAdmin,
  systemController.updateAuthorById
);
router.delete(
  "/system/delete-author-by-id",
  checkAdmin,
  systemController.deleteAuthorById
);

router.post("/system/add-new-shelf", checkAdmin, systemController.addNewShelf);
router.get("/system/get-all-shelf", checkAdmin, systemController.getAllShelf);
router.put(
  "/system/update-shelf-by-id",
  checkAdmin,
  systemController.updateShelfById
);
router.delete(
  "/system/delete-shelf-by-id",
  checkAdmin,
  systemController.deleteShelfById
);

router.get(
  "/system/get-all-history",
  checkAdmin,
  systemController.getAllHistory
);
router.get(
  "/system/get-history-by-time",
  checkAdmin,
  systemController.getHistoryByTime
);
router.get(
  "/auth/get-list-cart-to-manage",
  checkAdmin,
  systemController.getListCartToManage
);

router.post(
  "/system/create-new-transaction",
  checkAdmin,
  systemController.createNewTransaction
);
router.put(
  "/system/update-one-transaction",
  checkAdmin,
  systemController.updateOneTransaction
);
router.put(
  "/system/confirm-one-transaction-success",
  checkAdmin,
  systemController.confirmOneTransactionSuccess
);
router.put(
  "/system/update-one-cart-borrow-success",
  checkAdmin,
  systemController.updateCartBorrowSuccess
);

router.post("/system/add-new-clother", systemController.addNewClother);

router.put("/update-infor-user", async (req, res) => {
  let { userId, firstName, address, phoneNumber, genderId } = req.body;
  if (!userId || !firstName || !address || !phoneNumber || !genderId) {
    return res.json({
      success: false,
      message: "Thiếu thông tin chuyền lên",
    });
  }

  let user = await db.User.findOne({ where: { id: userId } });
  if (!user) {
    return res.json({
      success: false,
      message: "Người dùng không tồn tại",
    });
  }

  user.firstName = firstName;
  user.address = address;
  user.phoneNumber = phoneNumber;
  user.genderId = genderId;

  await user.save();

  return res.json({
    success: true,
    message: "Cập nhật thông tin thành công",
    data: user,
  });
});

module.exports = router;
