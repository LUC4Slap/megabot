const puppeteer = require("puppeteer");

// Conta unica
let conta = "cursoemvideo";
module.exports = async function botInsta() {
  // Conta para Logar
  let acont = {
    user: "instabot155@gmail.com",
    pass: "lucasalmeida12",
  };

  // Lista de contas para dar like na ultima foto
  let arr = [
    "marriemaison",
    "larigonncalves",
    "deadmau5265",
    "lovialongtime",
    "euphoricfitnessofficial",
    "reibobidetola1978cf",
    "dark_grey_tattoo",
    "selectfmg",
    "bfgamersunited",
    "infanttaofc",
    "mens.file",
    "tastemadebr",
    "brittbrousseau",
  ];

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
};
