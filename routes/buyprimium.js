const express = require("express");
const middlewareAuth = require("../middleware/auth");
const buyPremiumController = require("../controllers/buyPremium");
const router = express.Router();

router.get(
  "/is-premium-user",
  middlewareAuth.authentication,
  buyPremiumController.getIsPremiumUser
);
router.get(
  "/buy-premium",
  middlewareAuth.authentication,
  buyPremiumController.getbuyPremium
);
router.post(
  "/premium-success",
  middlewareAuth.authentication,
  buyPremiumController.postPremiumSuccess
);
router.get(
  "/premium-user-leaderboard",
  middlewareAuth.authentication,
  buyPremiumController.getLeaderboard
);
router.get(
  "/download",
  middlewareAuth.authentication,
  buyPremiumController.getDowndload
);
router.get(
  "/downloadIncomes",
  middlewareAuth.authentication,
  buyPremiumController.getDowndloadIncomes
);
router.get(
  "/report-file",
  middlewareAuth.authentication,
  buyPremiumController.getReportFile
);
router.get("/report-file-Page", buyPremiumController.getReportFilePage);

module.exports = router;
