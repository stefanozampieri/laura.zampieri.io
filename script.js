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
    cdSeconds: document.getElementById('cd-seconds'),
    cdTotalSeconds: document.getElementById('cd-total-seconds'),
    westernSign: document.getElementById('western-sign'),
    chineseSign: document.getElementById('chinese-sign'),
    chineseElement: document.getElementById('chinese-element'),
    birthstone: document.getElementById('birthstone')
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
    const totalSecondsRemaining = Math.floor(diff / 1000);

    el.cdDays.textContent = days;
    el.cdHours.textContent = pad2(hours);
    el.cdMinutes.textContent = pad2(minutes);
    el.cdSeconds.textContent = pad2(seconds);
    el.cdTotalSeconds.textContent = totalSecondsRemaining.toLocaleString();
  }

  function tick() {
    updateAge();
    updateCountdown();
    updateZodiac();
  }

  // Initial paint
  tick();
  // Update twice a second for snappier seconds roll-over
  setInterval(tick, 500);
})();

function updateZodiac() {
  const western = getWesternZodiac(new Date(2003, 7, 14));
  const { animal, element } = getChineseZodiac(2003);
  const stone = 'Peridot';
  const el = {
    westernSign: document.getElementById('western-sign'),
    chineseSign: document.getElementById('chinese-sign'),
    chineseElement: document.getElementById('chinese-element'),
    birthstone: document.getElementById('birthstone'),
    factWestern: document.getElementById('fact-western'),
    factChinese: document.getElementById('fact-chinese'),
    factStone: document.getElementById('fact-birthstone')
  };
  if (el.westernSign) el.westernSign.textContent = western;
  if (el.chineseSign) el.chineseSign.textContent = animal;
  if (el.chineseElement) el.chineseElement.textContent = element;
  if (el.birthstone) el.birthstone.textContent = stone;
  if (el.factWestern) el.factWestern.textContent = `Western: ${western}`;
  if (el.factChinese) el.factChinese.textContent = `Chinese: ${animal} (${element})`;
  if (el.factStone) el.factStone.textContent = `Birthstone: ${stone}`;
}

function getWesternZodiac(date) {
  const m = date.getMonth() + 1;
  const d = date.getDate();
  // Date ranges inclusive of start date
  if ((m === 3 && d >= 21) || (m === 4 && d <= 19)) return 'Aries';
  if ((m === 4 && d >= 20) || (m === 5 && d <= 20)) return 'Taurus';
  if ((m === 5 && d >= 21) || (m === 6 && d <= 20)) return 'Gemini';
  if ((m === 6 && d >= 21) || (m === 7 && d <= 22)) return 'Cancer';
  if ((m === 7 && d >= 23) || (m === 8 && d <= 22)) return 'Leo';
  if ((m === 8 && d >= 23) || (m === 9 && d <= 22)) return 'Virgo';
  if ((m === 9 && d >= 23) || (m === 10 && d <= 22)) return 'Libra';
  if ((m === 10 && d >= 23) || (m === 11 && d <= 21)) return 'Scorpio';
  if ((m === 11 && d >= 22) || (m === 12 && d <= 21)) return 'Sagittarius';
  if ((m === 12 && d >= 22) || (m === 1 && d <= 19)) return 'Capricorn';
  if ((m === 1 && d >= 20) || (m === 2 && d <= 18)) return 'Aquarius';
  return 'Pisces';
}

function getChineseZodiac(year) {
  const animals = ['Rat','Ox','Tiger','Rabbit','Dragon','Snake','Horse','Goat','Monkey','Rooster','Dog','Pig'];
  const elements = ['Wood','Fire','Earth','Metal','Water'];
  // 2000 was Dragon, element Metal. We'll derive cyclical element; cycle is 10 years (heavenly stems) but simplify mapping by known base.
  // Use 1984 as Wood Rat start for 60-year cycle
  const base = 1984;
  const diff = year - base;
  const animal = animals[(diff % 12 + 12) % 12];
  const element = elements[(Math.floor(((diff % 10) + 10) % 10 / 2)) % 5];
  return { animal, element };
}


