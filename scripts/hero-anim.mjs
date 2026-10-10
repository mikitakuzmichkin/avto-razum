const version = await (await fetch("http://127.0.0.1:9232/json/version")).json();
const ws = new WebSocket(version.webSocketDebuggerUrl);
let id = 0;
const pending = new Map();
function send(method, params = {}, sessionId) {
  const msgId = ++id;
  return new Promise((resolve, reject) => {
    pending.set(msgId, { resolve, reject });
    const payload = { id: msgId, method, params };
    if (sessionId) payload.sessionId = sessionId;
    ws.send(JSON.stringify(payload));
  });
}
ws.addEventListener("message", (ev) => {
  const msg = JSON.parse(ev.data);
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id);
    pending.delete(msg.id);
    if (msg.error) reject(new Error(JSON.stringify(msg.error)));
    else resolve(msg.result);
  }
});
await new Promise((resolve) => ws.addEventListener("open", resolve));
const { targetId } = await send("Target.createTarget", { url: "about:blank" });
const { sessionId } = await send("Target.attachToTarget", { targetId, flatten: true });
await send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 860, deviceScaleFactor: 1, mobile: false }, sessionId);
await send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "no-preference" }] }, sessionId);
await send("Network.enable", {}, sessionId);
await send("Network.setCacheDisabled", { cacheDisabled: true }, sessionId);
await send("Page.enable", {}, sessionId);
await send("Page.navigate", { url: "http://localhost:3000/" }, sessionId);
await new Promise((r) => setTimeout(r, 1800));
await send("Runtime.evaluate", {
  expression: `(() => { for (const a of document.getAnimations()) a.currentTime = 8500; })()`,
  returnByValue: true,
}, sessionId);
await new Promise((r) => setTimeout(r, 250));
const info = await send("Runtime.evaluate", {
  expression: `(() => {
    const car = document.querySelector(".audi-car").getBoundingClientRect();
    const h1 = document.querySelector("h1").getBoundingClientRect();
    const btn = [...document.querySelectorAll("a")].find((el) => el.textContent.trim() === "Записаться").getBoundingClientRect();
    return JSON.stringify({
      car: [Math.round(car.left), Math.round(car.top), Math.round(car.width), Math.round(car.height)],
      h1Right: Math.round(h1.right),
      btn: Math.round(btn.bottom),
    });
  })()`,
  returnByValue: true,
}, sessionId);
console.log(info.result.value);
const { data } = await send("Page.captureScreenshot", {
  format: "png",
  clip: { x: 0, y: 0, width: 1440, height: 780, scale: 1 },
}, sessionId);
const fs = await import("node:fs");
fs.writeFileSync("d:/Projects/avto-razum/.audi-lit.png", Buffer.from(data, "base64"));
ws.close();
