const express = require("express");
const bodyParser = require("body-parser");
const puppeteer = require("puppeteer");
const app = express();

app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index", { message: "" });
});

app.post("/bot", async (req, res) => {
  try {
    // Conta para Logar
    let acont = {
      user: "",
      pass: "",
    };

    // Lista de contas para dar like na ultima foto
    let arr = req.body.contas.split(",");
    console.log(arr);

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto("https://www.instagram.com/", {
      // essa opção faz com que o puppeteer espere a pagina ser carregada
      waitUntil: "networkidle0",
    });
    await page.waitFor('input[name="username"]');
    await page.type('input[name="username"]', acont.user, { delay: 100 });
    await page.type('input[name="password"]', acont.pass, { delay: 100 });
    await page.keyboard.press("Enter");
    await page.waitFor('span[class="TqC_a"]');
    for (let i = 0; i <= arr.length; i++) {
      await page.waitFor(2000);
      await page.goto(`https://www.instagram.com/${arr[i]}/`, {
        // essa opção faz com que o puppeteer espere a pagina ser carregada
        waitUntil: "networkidle0",
      });
      await page.waitFor('img[class="FFVAD"]');
      await page.click('img[class="FFVAD"]');
      await page.waitFor(2000);
      await page.evaluate(() => {
        let interval = setTimeout(async () => {
          let btns = document.querySelectorAll(".wpO6b");
          if (btns) {
            console.log(btns);
            let btn = btns[2];
            console.log(btn);
            btn.click();
            await page.waitFor(2000);
            clearTimeout(interval);
          }
        }, 2000);
      });
    }
    let interaval = setInterval(async () => {
      await browser.close();
      clearInterval(interaval);
    }, 3000);
    res.render("index", { message: "Bot Finalizado" });
  } catch (error) {
    console.error(error);
    res.render("index", { message: "Opss algo deu errado" });
  }
});

app.listen(3000, () => console.log("BOT Rodando"));
