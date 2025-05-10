import $ from "jquery";

import Swiper from "swiper";
import { Navigation, Autoplay } from "swiper/modules";

import AOS from "aos";
import "aos/dist/aos.css";

$(() => {
  // console.log($("#play-icon").length, $("#pause-icon").length);

  /**
   * Menu toggle
   */
  const openMenu = () => {
    $("header").addClass("menu-open");
    $("body").css("overflow", "hidden");
  };

  const closeMenu = () => {
    $("header").removeClass("menu-open");
    $("body").css("overflow", "auto");
  };

  $("#hamburger").on("click", () => {
    if ($("header").hasClass("menu-open")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  $("nav a").on("click", () => {
    closeMenu();
  });

  $(window).on("resize", () => {
    if ($(window).width() > 768) {
      closeMenu();
    }
  });

  const path = window.location.pathname.split("/").filter(Boolean);
  const nameSlug = path[path.length - 1];

  // Ubah slug jadi nama biasa (capitalize tiap kata)
  // const name = nameSlug
  //   .split("-")
  //   .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  //   .join(" ");

  // Tampilkan ke elemen yang sesuai
  // document.getElementById("recipient-name").textContent = name;

  /**
   * Menu active state
   */
  $("nav a").on("click", function () {
    $(".header-line").removeClass("scale-x-100");
    $(this).find(".header-line").addClass("scale-x-100");
  });

  // scroll to section on load if have hash in url
  if (window.location.hash) {
    const hash = window.location.hash;
    const target = $(hash);

    if (target.length) {
      $(".header-line").removeClass("scale-x-100");
      $(`nav a[href="${hash}"]`).find(".header-line").addClass("scale-x-100");

      $("html, body").animate(
        {
          scrollTop: target.offset().top,
        },
        200
      );
    }
  } else {
    $("nav a").find(".header-line").first().addClass("scale-x-100");
  }

  /**
   * Swiper
   */
  const swiper = new Swiper(".swiper-container", {
    loop: true,
    autoplay: {
      delay: 3000,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    modules: [Navigation, Autoplay],
  });

  /**
   * Modal
   */
  $(".modal-open").on("click", (e) => {
    e.preventDefault();
    const modalId = $(e.currentTarget).data("modal");
    $(modalId).fadeIn();
    $("#modal-bg").fadeIn();
  });

  $(".modal-close").on("click", () => {
    if (!$("#brideOrGroom").is(":visible")) {
      $(".modal").fadeOut();
      $("#modal-bg").fadeOut();
    }
  });

  const changeGuestType = (type) => {
    localStorage.setItem("guestType", type);

    switch (type) {
      case "bride":
        $("#groom-timeline").addClass("hidden");
        $("#bride-timeline").removeClass("hidden").addClass("flex");

        $("#groomBtn").addClass("hidden");
        $("#brideBtn").removeClass("hidden");

        $("#groomForm").addClass("hidden");
        $("#brideForm").removeClass("hidden");
        break;
      case "groom":
        $("#bride-timeline").addClass("hidden");
        $("#groom-timeline").removeClass("hidden").addClass("flex");

        $("#brideBtn").addClass("hidden");
        $("#groomBtn").removeClass("hidden");

        $("#brideForm").addClass("hidden");
        $("#groomForm").removeClass("hidden");
        break;
    }
  };

  // find guest type from local storage
  const guestType = localStorage.getItem("guestType");
  if (!guestType) {
    $("#brideOrGroom").fadeIn();
    $("#modal-bg").fadeIn();
  } else {
    changeGuestType(guestType);
  }

  // set guest type to local storage
  $(".guest-type").on("click", function () {
    const type = $(this).data("type");
    changeGuestType(type);
    $(".modal").fadeOut();
    $("#modal-bg").fadeOut();
  });

  // change guest type
  $("#changeGuestType").on("click", () => {
    const guestType = localStorage.getItem("guestType");
    changeGuestType(guestType === "bride" ? "groom" : "bride");
  });

    document.querySelectorAll(".copy").forEach((btn) => {
      btn.addEventListener("click", () => {
        const number = btn.getAttribute("data-number");

        // Create temporary input
        const tempInput = document.createElement("input");
        tempInput.value = number;
        document.body.appendChild(tempInput);
        tempInput.select();
        tempInput.setSelectionRange(0, 99999); // For mobile devices

        try {
          document.execCommand("copy");
          btn.textContent = "Copied!";
          setTimeout(() => (btn.textContent = "Copy"), 1500);
        } catch (err) {
          console.error("Copy failed", err);
        }

        document.body.removeChild(tempInput);
      });
    });


  /**
   * Countdown
   */
  const weddingDate = new Date("2025-05-22T14:00:00").getTime();

  const daysEl = $("#days");
  const hoursEl = $("#hours");
  const minutesEl = $("#minutes");
  const secondsEl = $("#seconds");

  const updateCountdown = () => {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) {
      clearInterval(countdownInterval);
      daysEl.text("00");
      hoursEl.text("00");
      minutesEl.text("00");
      secondsEl.text("00");
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.text(days);
    hoursEl.text(hours);
    minutesEl.text(minutes);
    secondsEl.text(seconds);
  };

  const countdownInterval = setInterval(updateCountdown, 1000);

  // countdown for girl
  const weddingDateGirl = new Date("2025-05-23T14:00:00").getTime();

  const daysElGirl = $("#daysGirl");
  const hoursElGirl = $("#hoursGirl");
  const minutesElGirl = $("#minutesGirl");
  const secondsElGirl = $("#secondsGirl");

  const updateCountdownGirl = () => {
    const nowGirl = new Date().getTime();
    const distanceGirl = weddingDateGirl - nowGirl;

    if (distanceGirl < 0) {
      clearInterval(countdownIntervalGirl);
      daysElGirl.text("00");
      hoursElGirl.text("00");
      minutesElGirl.text("00");
      secondsElGirl.text("00");
      return;
    }

    const daysGirl = Math.floor(distanceGirl / (1000 * 60 * 60 * 24));
    const hoursGirl = Math.floor(
      (distanceGirl % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutesGirl = Math.floor(
      (distanceGirl % (1000 * 60 * 60)) / (1000 * 60)
    );
    const secondsGirl = Math.floor((distanceGirl % (1000 * 60)) / 1000);

    daysElGirl.text(daysGirl);
    hoursElGirl.text(hoursGirl);
    minutesElGirl.text(minutesGirl);
    secondsElGirl.text(secondsGirl);
  };

  const countdownIntervalGirl = setInterval(updateCountdownGirl, 1000);

  const image = document.getElementById("cover"),
    title = document.getElementById("music-title"),
    artist = document.getElementById("music-artist"),
    currentTimeEl = document.getElementById("current-time"),
    durationEl = document.getElementById("duration"),
    progress = document.getElementById("progress"),
    playerProgress = document.getElementById("player-progress"),
    prevBtn = document.getElementById("prev"),
    nextBtn = document.getElementById("next"),
    playBtn = document.getElementById("play-icon"),
    boyButton = document.getElementById("boy-button"),
    girlButton = document.getElementById("girl-button");

  const music = new Audio();

  const songs = [
    {
      path: "assets/1.mp3",
      displayName: "You're Still The One",
      cover: "images/IMG_2997.JPG",
      artist: "Shania Twain",
    },
  ];

  let musicIndex = 0;
  let isPlaying = false;

  function togglePlay() {
    if (music.paused) {
      playMusic();
    } else {
      pauseMusic();
    }
  }

  function playMusic() {
    music.play().then(() => {
      isPlaying = true;
      $("#play-icon").removeClass("player");
      $("#play-icon").addClass("pause");
    });
  }

  function pauseMusic() {
    music.pause();
    isPlaying = false;
    $("#play-icon").removeClass("pause");
    $("#play-icon").addClass("player");
  }

  function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
  }

  function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
  }

  function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, "0");
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(
      duration % 60
    )}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(
      currentTime % 60
    )}`;
  }

  function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
  }
  console.log("playBtn:", playBtn); // Harusnya bukan null

  playBtn.addEventListener("click", () => {
    console.log("Play button clicked");
    togglePlay();
  });
  boyButton.addEventListener("click", () => {
    console.log("Play button clicked");
    togglePlay();
  });
  girlButton.addEventListener("click", () => {
    console.log("Play button clicked");
    togglePlay();
  });
  prevBtn.addEventListener("click", () => changeMusic(-1));
  nextBtn.addEventListener("click", () => changeMusic(1));
  music.addEventListener("ended", () => changeMusic(1));
  music.addEventListener("timeupdate", updateProgressBar);
  playerProgress.addEventListener("click", setProgressBar);

  loadMusic(songs[musicIndex]);

    // GOOGLE CALENDER

    const eventTitle = "Resepsi Pernikahan Bintang & Widya";
    const eventDetails = "Acara resepsi pernikahan di kediaman mempelai pria. Kami menantikan kehadiranmu!";
    const eventLocation = "Dusun Merapi Mulyo, Sapuran, Wonosobo";
    const startDate = "20250522T080000"; // Format: YYYYMMDDTHHMMSS
    const endDate = "20250523T190000";

    const calendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      eventTitle
    )}&details=${encodeURIComponent(eventDetails)}&location=${encodeURIComponent(
      eventLocation
    )}&dates=${startDate}/${endDate}`;

    $("#addToGoogleCalendar").attr("href", calendarUrl);

    // GOOGLE CALENDER GIRL

    const eventTitleGirl = "Resepsi Pernikahan Bintang & Widya";
    const eventDetailsGirl =
      "Acara resepsi pernikahan di kediaman mempelai wanita. Kami menantikan kehadiranmu!";
    const eventLocationGirl = "Banjaran 02/05 Kaliputih, Selomerto, Wonosobo";
    const startDateGirl = "20250523T080000"; // Format: YYYYMMDDTHHMMSS
    const endDateGirl = "20250523T190000";

    const calendarUrlGirl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      eventTitleGirl
    )}&details=${encodeURIComponent(eventDetailsGirl)}&location=${encodeURIComponent(
      eventLocationGirl
    )}&dates=${startDateGirl}/${endDateGirl}`;

    $("#addToGoogleCalendarGirl").attr("href", calendarUrlGirl);

  /**
   * AOS
   */
  AOS.init();

  /**
   * Hide preloader
   */
  $("#preloader").fadeOut();
});
