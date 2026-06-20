let selectedRoomId = 204;

function openOverlay(id) {
  document.getElementById(id)?.classList.add("is-open");
  document.body.style.overflow = "hidden";
}

function closeOverlay(id) {
  document.getElementById(id)?.classList.remove("is-open");
  const anyOpen = document.querySelector(".overlay.is-open");
  if (!anyOpen) document.body.style.overflow = "";
}

function closeAllOverlays() {
  document.querySelectorAll(".overlay.is-open").forEach((el) => el.classList.remove("is-open"));
  document.body.style.overflow = "";
}

function initScrollRail() {
  const grid = document.getElementById("roomGrid");
  const thumb = document.getElementById("scrollThumb");
  const track = document.querySelector(".scroll-rail__track");
  const rail = document.getElementById("scrollRail");
  const up = document.querySelector(".scroll-rail__arrow--up");
  const down = document.querySelector(".scroll-rail__arrow--down");
  if (!grid || !thumb || !track || !rail) return () => {};

  function updateThumb() {
    const { scrollTop, scrollHeight, clientHeight } = grid;
    if (scrollHeight <= clientHeight + 1) {
      rail.classList.add("is-hidden");
      return;
    }
    rail.classList.remove("is-hidden");

    const trackHeight = track.clientHeight;
    const thumbHeight = Math.max(40, Math.round((clientHeight / scrollHeight) * trackHeight));
    const maxOffset = trackHeight - thumbHeight;
    const offset = maxOffset <= 0 ? 0 : (scrollTop / (scrollHeight - clientHeight)) * maxOffset;

    thumb.style.height = `${thumbHeight}px`;
    thumb.style.transform = `translateY(${offset}px)`;
  }

  grid.addEventListener("scroll", updateThumb, { passive: true });
  window.addEventListener("resize", updateThumb);
  up?.addEventListener("click", () => grid.scrollBy({ top: -140, behavior: "smooth" }));
  down?.addEventListener("click", () => grid.scrollBy({ top: 140, behavior: "smooth" }));
  updateThumb();
  return updateThumb;
}

let refreshScrollRail = () => {};

function renderRooms() {
  const grid = document.getElementById("roomGrid");
  if (!grid) return;

  grid.innerHTML = ROOMS.map((room) => {
    const isSelected = room.id === selectedRoomId;
    const guestClass = room.guest && !room.guest.includes("Oczekuje") && !room.guest.includes("Wymaga")
      ? "room-card__guest room-card__guest--name"
      : "room-card__guest";
    const guestText = room.guest ? room.guest : "Brak zameldowania";

    return `
      <button class="room-card room-card--${room.status}${isSelected ? " is-selected" : ""}"
              data-room="${room.id}" type="button" aria-label="Pokój ${room.id}">
        <div class="room-card__top">
          <span class="room-card__number">${room.id}</span>
          <span class="status-badge status-badge--${room.status}">${room.statusLabel}</span>
        </div>
        <div class="room-card__type">${room.type}</div>
        <div class="room-card__divider"></div>
        <div class="${guestClass}">${guestText}</div>
        ${room.date ? `
          <div class="room-card__date">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="4" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            ${room.date}
          </div>` : ""}
      </button>`;
  }).join("");

  requestAnimationFrame(() => refreshScrollRail());
}

function updateSidebar(roomId) {
  const room = ROOMS.find((r) => r.id === roomId);
  if (!room) return;

  const floor = Math.floor(roomId / 100);
  document.getElementById("sidebarRoom").textContent = roomId;
  document.getElementById("sidebarFloor").textContent = floor;
  document.getElementById("sidebarStatus").textContent = room.statusLabel;

  const guestEl = document.getElementById("sidebarGuest");
  if (roomId === 204) {
    guestEl.textContent = SIDEBAR_204.guest;
    document.getElementById("sidebarCheckIn").textContent = SIDEBAR_204.checkIn;
    document.getElementById("sidebarCheckOut").textContent = SIDEBAR_204.checkOut;
    document.getElementById("sidebarNotes").textContent = SIDEBAR_204.notes;
  } else if (room.guest && !room.guest.includes("Oczekuje") && !room.guest.includes("Wymaga")) {
    guestEl.textContent = room.guest;
    document.getElementById("sidebarCheckIn").textContent = room.date ? `${room.date}.2026` : "—";
    document.getElementById("sidebarCheckOut").textContent = "—";
    document.getElementById("sidebarNotes").textContent = "Brak uwag.";
  } else {
    guestEl.textContent = "—";
    document.getElementById("sidebarCheckIn").textContent = "—";
    document.getElementById("sidebarCheckOut").textContent = "—";
    document.getElementById("sidebarNotes").textContent = room.guest || "Brak zameldowania.";
  }
}

function selectRoom(roomId) {
  selectedRoomId = roomId;
  renderRooms();
  updateSidebar(roomId);

  if (roomId === 204) {
    openOverlay("overlayRoomInfo");
  }
}

function initClock() {
  const el = document.getElementById("clock");
  if (!el) return;
  function tick() {
    const now = new Date();
    el.textContent = now.toLocaleTimeString("pl-PL", { hour12: false });
  }
  tick();
  setInterval(tick, 1000);
}

document.addEventListener("DOMContentLoaded", () => {
  renderRooms();
  updateSidebar(selectedRoomId);
  initClock();
  refreshScrollRail = initScrollRail() || (() => {});

  document.getElementById("roomGrid")?.addEventListener("click", (e) => {
    const card = e.target.closest("[data-room]");
    if (card) selectRoom(Number(card.dataset.room));
  });

  document.getElementById("btnContact")?.addEventListener("click", () => openOverlay("overlayGuest"));
  document.getElementById("btnCheckIn")?.addEventListener("click", () => openOverlay("overlayCheckIn"));
  document.getElementById("btnCheckOut")?.addEventListener("click", () => openOverlay("overlayCheckOut"));
  document.getElementById("btnRoomDetails")?.addEventListener("click", () => {
    if (selectedRoomId === 204) openOverlay("overlayRoomInfo");
  });

  document.querySelectorAll("[data-close]").forEach((btn) => {
    btn.addEventListener("click", () => closeOverlay(btn.dataset.close));
  });

  document.querySelectorAll(".overlay").forEach((overlay) => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeOverlay(overlay.id);
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAllOverlays();
  });
});
