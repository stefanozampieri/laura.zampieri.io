(function () {
  'use strict';

  const BIRTH_YEAR = 2003;
  const BIRTH_MONTH_IDX = 7; // 0-indexed: 7 = August
  const BIRTH_DAY = 14;
  const birthDate = new Date(BIRTH_YEAR, BIRTH_MONTH_IDX, BIRTH_DAY, 0, 0, 0, 0);

  const el = {
    years: document.getElementById('age-years'),
    months: document.getElementById('age-months'),
    days: document.getElementById('age-days'),
    hours: document.getElementById('age-hours'),
    minutes: document.getElementById('age-minutes'),
    seconds: document.getElementById('age-seconds'),
    totalDays: document.getElementById('total-days'),
    totalSeconds: document.getElementById('total-seconds'),
    cdDays: document.getElementById('cd-days'),
    cdHours: document.getElementById('cd-hours'),
    cdMinutes: document.getElementById('cd-minutes'),
    cdSeconds: document.getElementById('cd-seconds')
  };

  function pad2(value) {
    return String(value).padStart(2, '0');
  }

  function diffYMD(startDate, endDate) {
    // startDate and endDate expected at midnight
    let years = endDate.getFullYear() - startDate.getFullYear();
    let months = endDate.getMonth() - startDate.getMonth();
    let days = endDate.getDate() - startDate.getDate();

    if (days < 0) {
      const endPrevMonth = new Date(endDate.getFullYear(), endDate.getMonth(), 0);
      days += endPrevMonth.getDate();
      months -= 1;
    }

    if (months < 0) {
      months += 12;
      years -= 1;
    }

    return { years, months, days };
  }

  function updateAge() {
    const now = new Date();
    const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);

    // Calendar component (Y/M/D) using midnight baseline
    const ymd = diffYMD(birthDate, todayMidnight);

    // Time-of-day component
    const msSinceMidnight = now.getTime() - todayMidnight.getTime();
    const hours = Math.floor(msSinceMidnight / (1000 * 60 * 60));
    const minutes = Math.floor((msSinceMidnight % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((msSinceMidnight % (1000 * 60)) / 1000);

    // Totals
    const totalMs = now.getTime() - birthDate.getTime();
    const totalDays = Math.floor(totalMs / (1000 * 60 * 60 * 24));
    const totalSeconds = Math.floor(totalMs / 1000);

    el.years.textContent = ymd.years;
    el.months.textContent = ymd.months;
    el.days.textContent = ymd.days;
    el.hours.textContent = pad2(hours);
    el.minutes.textContent = pad2(minutes);
    el.seconds.textContent = pad2(seconds);
    el.totalDays.textContent = totalDays.toLocaleString();
    el.totalSeconds.textContent = totalSeconds.toLocaleString();
  }

  function updateCountdown() {
    const now = new Date();
    const currentYear = now.getFullYear();
    let next = new Date(currentYear, BIRTH_MONTH_IDX, BIRTH_DAY, 0, 0, 0, 0);
    if (next.getTime() <= now.getTime()) {
      next = new Date(currentYear + 1, BIRTH_MONTH_IDX, BIRTH_DAY, 0, 0, 0, 0);
    }

    const diff = next.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    el.cdDays.textContent = days;
    el.cdHours.textContent = pad2(hours);
    el.cdMinutes.textContent = pad2(minutes);
    el.cdSeconds.textContent = pad2(seconds);
  }

  function tick() {
    updateAge();
    updateCountdown();
  }

  // Initial paint
  tick();
  // Update twice a second for snappier seconds roll-over
  setInterval(tick, 500);
})();


