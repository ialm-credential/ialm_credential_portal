const credential = {
  name: "POLINA SAVKOVA",
  number: "IALM/PS21368",
  issued: "22.10.2023",
  issuedBy: "IALM Credentialing Office · Bern, CH",
  validity: "INDEFINITE",
  field: "Relationship & Emotional Wellbeing",
  status: "ACTIVE"
};

const checking = document.getElementById("checking");
const lookup = document.getElementById("lookup");
const notFound = document.getElementById("notFound");
const result = document.getElementById("result");
const form = document.getElementById("credentialForm");
const input = document.getElementById("credentialInput");
const submittedNumber = document.getElementById("submittedNumber");
const tryAgainBtn = document.getElementById("tryAgainBtn");
const homeLogo = document.getElementById("homeLogo");
const navCurrent = document.getElementById("navCurrent");
const navHome = document.getElementById("navHome");
const navRecent = document.getElementById("navRecent");
const btn = document.getElementById("profileBtn");
const details = document.getElementById("profileDetails");
const qrCode = document.getElementById("qrCode");
let recentScreen = null;
let verifyTimer = null;

document.querySelectorAll("[data-credential]").forEach((element) => {
  const key = element.dataset.credential;
  element.textContent = credential[key];
});

const screens = [lookup, checking, notFound, result];
const screenLabels = new Map([
  [lookup, "Home Page"],
  [checking, "Credential Check"],
  [notFound, "No Record Found"],
  [result, "Credential Record"]
]);

function showScreen(screen) {
  screens.forEach((item) => {
    item.hidden = item !== screen;
    item.classList.toggle("active", item === screen);
  });

  updateNavigation(screen);
}

function normalizeCredentialNumber(value) {
  return value.trim().toUpperCase();
}

function resetProfileDetails() {
  details.classList.remove("open");
  btn.setAttribute("aria-expanded", "false");
  btn.querySelector("span").textContent = "＋";
}

function getCredentialUrl() {
  const url = new URL(window.location.href);
  url.searchParams.set("credential", credential.number);
  url.hash = "";
  return url.toString();
}

function createQrSvg(text) {
  const version = 10;
  const size = version * 4 + 17;
  const eccLength = 18;
  const blockDataLengths = [68, 68, 69, 69];
  const totalDataCodewords = blockDataLengths.reduce((sum, length) => sum + length, 0);
  const modules = Array.from({ length: size }, () => Array(size).fill(false));
  const reserved = Array.from({ length: size }, () => Array(size).fill(false));
  const bytes = Array.from(new TextEncoder().encode(text));

  if (bytes.length > totalDataCodewords - 3) {
    throw new Error("QR payload is too long for the selected version.");
  }

  function setModule(row, col, value, isReserved = true) {
    if (row < 0 || col < 0 || row >= size || col >= size) return;
    modules[row][col] = value;
    if (isReserved) reserved[row][col] = true;
  }

  function drawFinder(row, col) {
    for (let y = -1; y <= 7; y += 1) {
      for (let x = -1; x <= 7; x += 1) {
        const r = row + y;
        const c = col + x;
        const inPattern = x >= 0 && x <= 6 && y >= 0 && y <= 6;
        const isDark = inPattern && (x === 0 || x === 6 || y === 0 || y === 6 || (x >= 2 && x <= 4 && y >= 2 && y <= 4));
        setModule(r, c, isDark);
      }
    }
  }

  function drawAlignment(centerRow, centerCol) {
    for (let y = -2; y <= 2; y += 1) {
      for (let x = -2; x <= 2; x += 1) {
        const ring = Math.max(Math.abs(x), Math.abs(y));
        setModule(centerRow + y, centerCol + x, ring !== 1);
      }
    }
  }

  function drawFunctionPatterns() {
    drawFinder(0, 0);
    drawFinder(0, size - 7);
    drawFinder(size - 7, 0);

    [6, 28, 50].forEach((row) => {
      [6, 28, 50].forEach((col) => {
        const nearFinder = (row === 6 && col === 6) || (row === 6 && col === 50) || (row === 50 && col === 6);
        if (!nearFinder) drawAlignment(row, col);
      });
    });

    for (let i = 0; i < size; i += 1) {
      if (!reserved[6][i]) setModule(6, i, i % 2 === 0);
      if (!reserved[i][6]) setModule(i, 6, i % 2 === 0);
    }

    setModule(size - 8, 8, true);

    for (let i = 0; i < 9; i += 1) {
      setModule(8, i, false);
      setModule(i, 8, false);
      setModule(8, size - 1 - i, false);
      setModule(size - 1 - i, 8, false);
    }

    const versionBits = getBchBits(version, 0x1f25, 12);
    for (let i = 0; i < 18; i += 1) {
      const bit = ((versionBits >> i) & 1) === 1;
      const a = Math.floor(i / 3);
      const b = i % 3;
      setModule(size - 11 + b, a, bit);
      setModule(a, size - 11 + b, bit);
    }
  }

  function getBchBits(value, polynomial, bitLength) {
    let remainder = value;
    for (let i = 0; i < bitLength; i += 1) {
      remainder = (remainder << 1) ^ (((remainder >> bitLength) & 1) ? polynomial : 0);
    }
    return (value << bitLength) | (remainder & ((1 << bitLength) - 1));
  }

  function pushBits(buffer, value, length) {
    for (let i = length - 1; i >= 0; i -= 1) {
      buffer.push((value >>> i) & 1);
    }
  }

  function makeDataCodewords() {
    const bits = [];
    pushBits(bits, 0x4, 4);
    pushBits(bits, bytes.length, 16);
    bytes.forEach((byte) => pushBits(bits, byte, 8));

    const capacityBits = totalDataCodewords * 8;
    pushBits(bits, 0, Math.min(4, capacityBits - bits.length));
    while (bits.length % 8 !== 0) bits.push(0);

    const data = [];
    for (let i = 0; i < bits.length; i += 8) {
      data.push(bits.slice(i, i + 8).reduce((value, bit) => (value << 1) | bit, 0));
    }

    for (let pad = 0xec; data.length < totalDataCodewords; pad = pad === 0xec ? 0x11 : 0xec) {
      data.push(pad);
    }

    return data;
  }

  function makeGaloisTables() {
    const exp = Array(512).fill(0);
    const log = Array(256).fill(0);
    let value = 1;
    for (let i = 0; i < 255; i += 1) {
      exp[i] = value;
      log[value] = i;
      value <<= 1;
      if (value & 0x100) value ^= 0x11d;
    }
    for (let i = 255; i < 512; i += 1) exp[i] = exp[i - 255];
    return { exp, log };
  }

  const gf = makeGaloisTables();
  const multiply = (a, b) => (a === 0 || b === 0 ? 0 : gf.exp[gf.log[a] + gf.log[b]]);

  function makeDivisor(degree) {
    const result = Array(degree).fill(0);
    result[degree - 1] = 1;
    let root = 1;
    for (let i = 0; i < degree; i += 1) {
      for (let j = 0; j < degree; j += 1) {
        result[j] = multiply(result[j], root);
        if (j + 1 < degree) result[j] ^= result[j + 1];
      }
      root = multiply(root, 0x02);
    }
    return result;
  }

  function makeRemainder(data, divisor) {
    const result = Array(divisor.length).fill(0);
    data.forEach((byte) => {
      const factor = byte ^ result.shift();
      result.push(0);
      divisor.forEach((coefficient, index) => {
        result[index] ^= multiply(coefficient, factor);
      });
    });
    return result;
  }

  function addErrorCorrection(data) {
    const divisor = makeDivisor(eccLength);
    const blocks = [];
    let offset = 0;
    blockDataLengths.forEach((length) => {
      const block = data.slice(offset, offset + length);
      offset += length;
      blocks.push({ data: block, ecc: makeRemainder(block, divisor) });
    });

    const result = [];
    for (let i = 0; i < 69; i += 1) {
      blocks.forEach((block) => {
        if (i < block.data.length) result.push(block.data[i]);
      });
    }
    for (let i = 0; i < eccLength; i += 1) {
      blocks.forEach((block) => result.push(block.ecc[i]));
    }
    return result;
  }

  function drawCodewords(codewords) {
    const bits = [];
    codewords.forEach((codeword) => pushBits(bits, codeword, 8));
    let index = 0;
    let upward = true;

    for (let col = size - 1; col > 0; col -= 2) {
      if (col === 6) col -= 1;
      for (let rowOffset = 0; rowOffset < size; rowOffset += 1) {
        const row = upward ? size - 1 - rowOffset : rowOffset;
        for (let c = col; c >= col - 1; c -= 1) {
          if (!reserved[row][c]) {
            modules[row][c] = bits[index] === 1;
            index += 1;
          }
        }
      }
      upward = !upward;
    }
  }

  function maskBit(mask, row, col) {
    return [
      (row + col) % 2 === 0,
      row % 2 === 0,
      col % 3 === 0,
      (row + col) % 3 === 0,
      (Math.floor(row / 2) + Math.floor(col / 3)) % 2 === 0,
      ((row * col) % 2) + ((row * col) % 3) === 0,
      (((row * col) % 2) + ((row * col) % 3)) % 2 === 0,
      (((row + col) % 2) + ((row * col) % 3)) % 2 === 0
    ][mask];
  }

  function drawFormat(mask) {
    const formatBits = getBchBits((1 << 3) | mask, 0x537, 10) ^ 0x5412;
    for (let i = 0; i <= 5; i += 1) setModule(8, i, ((formatBits >> i) & 1) === 1);
    setModule(8, 7, ((formatBits >> 6) & 1) === 1);
    setModule(8, 8, ((formatBits >> 7) & 1) === 1);
    setModule(7, 8, ((formatBits >> 8) & 1) === 1);
    for (let i = 9; i < 15; i += 1) setModule(14 - i, 8, ((formatBits >> i) & 1) === 1);
    for (let i = 0; i < 8; i += 1) setModule(size - 1 - i, 8, ((formatBits >> i) & 1) === 1);
    for (let i = 8; i < 15; i += 1) setModule(8, size - 15 + i, ((formatBits >> i) & 1) === 1);
    setModule(size - 8, 8, true);
  }

  function penalty(matrix) {
    let score = 0;
    for (let y = 0; y < size; y += 1) {
      let runColor = matrix[y][0];
      let run = 1;
      for (let x = 1; x < size; x += 1) {
        if (matrix[y][x] === runColor) run += 1;
        else {
          if (run >= 5) score += run - 2;
          runColor = matrix[y][x];
          run = 1;
        }
      }
      if (run >= 5) score += run - 2;
    }
    for (let x = 0; x < size; x += 1) {
      let runColor = matrix[0][x];
      let run = 1;
      for (let y = 1; y < size; y += 1) {
        if (matrix[y][x] === runColor) run += 1;
        else {
          if (run >= 5) score += run - 2;
          runColor = matrix[y][x];
          run = 1;
        }
      }
      if (run >= 5) score += run - 2;
    }
    for (let y = 0; y < size - 1; y += 1) {
      for (let x = 0; x < size - 1; x += 1) {
        const color = matrix[y][x];
        if (color === matrix[y][x + 1] && color === matrix[y + 1][x] && color === matrix[y + 1][x + 1]) score += 3;
      }
    }
    return score;
  }

  function applyMask(base, mask) {
    return base.map((row, y) => row.map((value, x) => (reserved[y][x] ? value : value !== maskBit(mask, y, x))));
  }

  drawFunctionPatterns();
  drawCodewords(addErrorCorrection(makeDataCodewords()));

  let bestMatrix = modules;
  let bestMask = 0;
  let bestPenalty = Infinity;
  for (let mask = 0; mask < 8; mask += 1) {
    const candidate = applyMask(modules, mask);
    const candidatePenalty = penalty(candidate);
    if (candidatePenalty < bestPenalty) {
      bestMatrix = candidate;
      bestMask = mask;
      bestPenalty = candidatePenalty;
    }
  }

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) modules[y][x] = bestMatrix[y][x];
  }
  drawFormat(bestMask);

  const quiet = 4;
  const viewSize = size + quiet * 2;
  const darkModules = [];
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      if (modules[y][x]) darkModules.push(`<rect x="${x + quiet}" y="${y + quiet}" width="1" height="1"/>`);
    }
  }

  return `<svg viewBox="0 0 ${viewSize} ${viewSize}" role="img" aria-label="QR code for ${credential.number}" xmlns="http://www.w3.org/2000/svg"><rect width="${viewSize}" height="${viewSize}" fill="#fff"/><g fill="#241B20">${darkModules.join("")}</g></svg>`;
}

function renderQrCode() {
  qrCode.innerHTML = createQrSvg(getCredentialUrl());
}

function updateNavigation(screen) {
  navCurrent.textContent = screenLabels.get(screen);
  navHome.hidden = screen === lookup;
  navRecent.hidden = screen !== lookup;
  navRecent.disabled = !recentScreen;
  navRecent.textContent = recentScreen ? `Recently Visited: ${screenLabels.get(recentScreen)}` : "Recently Visited";
}

function goHome() {
  clearTimeout(verifyTimer);
  resetProfileDetails();
  submittedNumber.textContent = "";
  if (window.location.search) {
    const url = new URL(window.location.href);
    url.searchParams.delete("credential");
    window.history.replaceState(null, "", url.toString());
  }
  showScreen(lookup);
  input.focus();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const value = normalizeCredentialNumber(input.value);
  input.value = value;

  showScreen(checking);

  clearTimeout(verifyTimer);
  verifyTimer = setTimeout(() => {
    if (value === credential.number) {
      recentScreen = result;
      window.history.replaceState(null, "", getCredentialUrl());
      showScreen(result);
      return;
    }

    submittedNumber.textContent = value ? `SUBMITTED: ${value}` : "NO NUMBER SUBMITTED";
    recentScreen = notFound;
    showScreen(notFound);
  }, 2600);
});

tryAgainBtn.addEventListener("click", () => {
  goHome();
});

btn.setAttribute("aria-expanded", "false");
btn.setAttribute("aria-controls", "profileDetails");

homeLogo.addEventListener("click", () => {
  goHome();
});

navHome.addEventListener("click", () => {
  goHome();
});

navRecent.addEventListener("click", () => {
  if (recentScreen) {
    showScreen(recentScreen);
  }
});

btn.addEventListener("click", () => {
  const open = details.classList.toggle("open");
  btn.setAttribute("aria-expanded", String(open));
  btn.querySelector("span").textContent = open ? "−" : "＋";
});

renderQrCode();

const requestedCredential = new URLSearchParams(window.location.search).get("credential");
if (requestedCredential) {
  const value = normalizeCredentialNumber(requestedCredential);
  input.value = value;

  if (value === credential.number) {
    recentScreen = result;
    showScreen(result);
  } else {
    submittedNumber.textContent = `SUBMITTED: ${value}`;
    recentScreen = notFound;
    showScreen(notFound);
  }
}
