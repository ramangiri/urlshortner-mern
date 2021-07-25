const express = require("express");
const shortId = require("shortid");
const validUrl = require("valid-url");
const Url = require("../models/url");
const router = express.Router();

//Generate short url
router.post("/shorten", async (req, res) => {
  const { longUrl } = req.body;
  const baseUrl = process.env.BASEURL;

  //Check base url is valid or not
  if (!validUrl.isUri(baseUrl)) {
    return res.json({ error: "Invalid base URL" });
  }

  //Create url code
  const urlCode = shortId.generate();

  //Check long url is valid or not
  if (validUrl.isUri(longUrl)) {
    let currDate = new Date().toString().slice(4, 15);
    try {
      let url = await Url.findOne({ longUrl });
      if (url) {
        res.json(url);
      } else {
        shortUrl = `${baseUrl}/${urlCode}`;
        url = new Url({
          urlCode,
          longUrl,
          shortUrl,
          date: currDate,
        });
        await url.save();
        res.json(url);
      }
    } catch (err) {
      console.log(err);
      res.json({ error: "Sever error" });
    }
  } else {
    res.json({ error: "Invalid long URL" });
  }
});

//Get all urls
router.get("/all-urls", async (req, res) => {
  const urls = await Url.find({});
  if (urls) {
    res.json(urls);
  } else {
    res.json({ message: "No URL found" });
  }
});

//Get count
router.get("/counts", async (req, res) => {
  let todaysCount = 0;
  let monthsCount = 0;
  let currDate = new Date();
  let tDate = currDate.toString().slice(4, 15);
  currDate.setMonth(currDate.getMonth() - 1);
  let oDate = currDate.toString().slice(4, 15);

  const urls = await Url.find({});
  if (urls) {
    urls.map((url) => {
      if (Date.parse(url.date) === Date.parse(tDate)) {
        todaysCount++;
        monthsCount++;
      } else if (Date.parse(url.date) >= Date.parse(oDate)) {
        monthsCount++;
      }
    });
    res.json({ todaysCount, monthsCount });
  } else {
    res.json({ error: "Server Error" });
  }
});

//Redirect to original url
router.get("/:code", async (req, res) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.code });
    if (url) {
      url.clicks++;
      url.save();
      return res.redirect(url.longUrl);
    } else {
      res.json({ error: "No URL found." });
    }
  } catch (err) {
    console.log(err);
    res.json({ error: "Server error" });
  }
});

module.exports = router;
