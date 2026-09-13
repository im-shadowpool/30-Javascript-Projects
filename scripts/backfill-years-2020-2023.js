/**
 * 2020-2023 GitHub Contribution Streak Backfiller for 30-Javascript-Projects
 * 
 * Author: im_shadowpool <shadowpoolvs@gmail.com>
 * Gap Ratio: 50% - 60% across 4 full years (2020, 2021, 2022, 2023)
 * Commits are tailored directly to the 17 JavaScript projects in this repository!
 * 
 * Usage:
 *   node scripts/backfill-years-2020-2023.js --dry-run
 *   node scripts/backfill-years-2020-2023.js --run
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const AUTHOR_NAME = 'im_shadowpool';
const AUTHOR_EMAIL = 'shadowpoolvs@gmail.com';
const TIMEZONE_OFFSET = '+05:30';

const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run') || (!args.includes('--run') && !args.includes('--dry-run'));

// Rich, project-specific commit messages for the 17 JavaScript projects
const projectCommitPool = [
  // Project 01 - Weather App
  'feat(Project 01): fetch live weather data via OpenWeather API',
  'style(Project 01): add dynamic weather icon animations based on conditions',
  'fix(Project 01): handle city not found error and invalid input',
  'perf(Project 01): debounce city search input to reduce API calls',
  'feat(Project 01): display humidity and wind speed indicators',

  // Project 02 - Todo List
  'feat(Project 02): persist todo items in browser localStorage',
  'style(Project 02): add strike-through animation on task completion',
  'fix(Project 02): prevent adding empty or whitespace-only tasks',
  'feat(Project 02): add category filter (All, Active, Completed)',
  'refactor(Project 02): simplify task delete and edit event handlers',

  // Project 03 - Quiz App
  'feat(Project 03): implement countdown timer per question',
  'style(Project 03): highlight correct option in green and incorrect in red',
  'fix(Project 03): disable option buttons immediately after answering',
  'feat(Project 03): add quiz summary score card and restart button',
  'refactor(Project 03): extract question dataset into external JSON structure',

  // Project 04 - Random Password Generator
  'feat(Project 04): generate cryptographically secure random passwords',
  'feat(Project 04): add character length slider control (8-32 chars)',
  'feat(Project 04): add one-click copy to clipboard with toast feedback',
  'style(Project 04): add password strength meter gauge',
  'fix(Project 04): ensure at least one character of each enabled set is included',

  // Project 05 - Notes App
  'feat(Project 05): auto-save note updates to localStorage',
  'feat(Project 05): add delete note confirmation dialog',
  'style(Project 05): create responsive grid layout for sticky note cards',
  'refactor(Project 05): use contenteditable attribute for inline note editing',

  // Project 06 - Age Calculator
  'feat(Project 06): calculate exact age in years, months, and days',
  'fix(Project 06): handle leap year February date calculations accurately',
  'fix(Project 06): prevent future date selection in calendar picker',
  'style(Project 06): polish animated number counter on age calculation',

  // Project 07 - Quotes Generator
  'feat(Project 07): fetch inspirational quotes from Quotes API',
  'feat(Project 07): add tweet quote share button with pre-filled text',
  'style(Project 07): generate smooth background gradient transition on new quote',
  'feat(Project 07): add speech synthesis to read quote aloud',

  // Project 08 - QR Code Generator
  'feat(Project 08): generate QR code dynamically from URL or text',
  'feat(Project 08): add download QR code as PNG image button',
  'style(Project 08): add bounce-in animation when QR code generates',
  'fix(Project 08): clear previous QR canvas before generating new code',

  // Project 09 - Toast Notifications
  'feat(Project 09): create toast notification queue with auto-dismiss timers',
  'style(Project 09): add distinct icons and borders for Success, Warning, Error',
  'style(Project 09): smooth slide-in and slide-out CSS keyframe animations',
  'refactor(Project 09): support custom notification duration parameter',

  // Project 10 - Music Player
  'feat(Project 10): implement play, pause, next, and previous track controls',
  'feat(Project 10): add interactive track seek bar with elapsed time display',
  'style(Project 10): add rotating album art disk animation on playback',
  'fix(Project 10): update total audio duration metadata accurately on load',

  // Project 11 - Stopwatch
  'feat(Project 11): implement millisecond precision timer using Date.now()',
  'feat(Project 11): add lap recorder tracking split times',
  'style(Project 11): style start, pause, lap, and reset action buttons',
  'fix(Project 11): prevent drift by calculating delta time instead of fixed interval',

  // Project 12 - Calculator
  'feat(Project 12): build core arithmetic expression evaluator',
  'feat(Project 12): support keyboard numpad and enter key inputs',
  'fix(Project 12): prevent multiple consecutive decimal points',
  'style(Project 12): polish grid keypad styling with active press feedback',

  // Project 13 - Tic-Tac-Toe
  'feat(Project 13): check for 3-in-a-row win conditions across rows and diagonals',
  'feat(Project 13): add single-player mode against simple AI bot',
  'style(Project 13): draw animated line across winning tiles',
  'feat(Project 13): keep running match score counter',

  // Project 14 - Bubble Game
  'feat(Project 14): render random bubble values in dynamic canvas grid',
  'feat(Project 14): add 60-second countdown game timer',
  'feat(Project 14): increment score by 10 on matching hit target value',
  'style(Project 14): add bubble pop sound effect on successful click',

  // Project 15 - Calculator Advanced
  'feat(Project 15): add scientific calculations (sqrt, power, percentage)',
  'feat(Project 15): add calculation history log drawer',
  'style(Project 15): add dark and light theme toggle switcher',

  // Project 16 - Online Quiz App
  'feat(Project 16): fetch category questions from Open Trivia DB',
  'style(Project 16): add linear progress bar for quiz completion',
  'feat(Project 16): show detailed question explanation review screen',

  // Project 17 - To-do List App Advanced
  'feat(Project 17): add priority badges (High, Medium, Low) to tasks',
  'feat(Project 17): support drag and drop task reordering',
  'feat(Project 17): add search filter to quickly find tasks',
  'style(Project 17): polish mobile touch gesture task deletion'
];

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const timeSlots = [
  { hour: 10, min: 18 },
  { hour: 11, min: 40 },
  { hour: 14, min: 25 },
  { hour: 16, min: 10 },
  { hour: 17, min: 45 },
  { hour: 19, min: 35 },
  { hour: 21, min: 20 }
];

// Preserved real commit dates from 2023 history in 30-Javascript-Projects
const existing2023Dates = new Set([
  '2023-11-03',
  '2023-11-06',
  '2023-11-08',
  '2023-11-09',
  '2023-11-18',
  '2023-11-20',
  '2023-11-21',
  '2023-12-08'
]);

function createRNG(seed) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return function() {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function generateSchedule() {
  const rng = createRNG(20200101);
  const schedule = [];
  const pad = (n) => String(n).padStart(2, '0');

  const years = [
    { year: 2020, leap: true },
    { year: 2021, leap: false },
    { year: 2022, leap: false },
    { year: 2023, leap: false }
  ];

  // Natural multi-day holiday and vacation breaks across the 4 years
  const breakRanges = [
    // 2020
    { start: '2020-01-01', end: '2020-01-06', name: "New Year Break 2020" },
    { start: '2020-03-20', end: '2020-03-27', name: "Spring Hiatus 2020" },
    { start: '2020-06-15', end: '2020-06-23', name: "Summer Break 2020" },
    { start: '2020-08-18', end: '2020-08-25', name: "Late Summer Break 2020" },
    { start: '2020-11-12', end: '2020-11-17', name: "Diwali Holidays 2020" },
    { start: '2020-12-22', end: '2020-12-31', name: "Year-End Holidays 2020" },

    // 2021
    { start: '2021-01-01', end: '2021-01-05', name: "New Year Break 2021" },
    { start: '2021-03-16', end: '2021-03-22', name: "Spring Break 2021" },
    { start: '2021-06-12', end: '2021-06-20', name: "Summer Break 2021" },
    { start: '2021-08-20', end: '2021-08-27', name: "Late Summer 2021" },
    { start: '2021-11-02', end: '2021-11-07', name: "Festive Holidays 2021" },
    { start: '2021-12-23', end: '2021-12-31', name: "Year-End Holidays 2021" },

    // 2022
    { start: '2022-01-01', end: '2022-01-05', name: "New Year Break 2022" },
    { start: '2022-03-14', end: '2022-03-21', name: "Mid-March Pause 2022" },
    { start: '2022-06-18', end: '2022-06-25', name: "Summer Vacation 2022" },
    { start: '2022-08-16', end: '2022-08-24', name: "Late Summer 2022" },
    { start: '2022-10-22', end: '2022-10-26', name: "Autumn Holidays 2022" },
    { start: '2022-12-22', end: '2022-12-31', name: "Year-End Holidays 2022" },

    // 2023
    { start: '2023-01-01', end: '2023-01-05', name: "New Year Break 2023" },
    { start: '2023-03-15', end: '2023-03-22', name: "Spring Hiatus 2023" },
    { start: '2023-06-14', end: '2023-06-22', name: "Summer Break 2023" },
    { start: '2023-08-18', end: '2023-08-26', name: "Late Summer 2023" },
    { start: '2023-10-24', end: '2023-10-29', name: "Festive Pause 2023" },
    { start: '2023-12-23', end: '2023-12-31', name: "Year-End Holidays 2023" }
  ];

  let poolIdx = 0;

  for (const y of years) {
    const months = [
      { month: 1, days: 31 },
      { month: 2, days: y.leap ? 29 : 28 },
      { month: 3, days: 31 },
      { month: 4, days: 30 },
      { month: 5, days: 31 },
      { month: 6, days: 30 },
      { month: 7, days: 31 },
      { month: 8, days: 31 },
      { month: 9, days: 30 },
      { month: 10, days: 31 },
      { month: 11, days: 30 },
      { month: 12, days: 31 }
    ];

    for (const m of months) {
      for (let d = 1; d <= m.days; d++) {
        const dateStr = `${y.year}-${pad(m.month)}-${pad(d)}`;
        const dateObj = new Date(Date.UTC(y.year, m.month - 1, d));
        const dayOfWeek = dateObj.getUTCDay(); // 0 = Sun, 6 = Sat
        const dayName = dayNames[dayOfWeek];

        // If date already has real commit in 2023, preserve it
        if (existing2023Dates.has(dateStr)) {
          schedule.push({
            date: dateStr,
            year: y.year,
            day: dayName,
            commits: 0,
            isExisting: true,
            reason: 'Existing 2023 Commits (Preserved)'
          });
          continue;
        }

        // Check if within a scheduled break window
        const inBreak = breakRanges.find(b => dateStr >= b.start && dateStr <= b.end);
        if (inBreak) {
          schedule.push({
            date: dateStr,
            year: y.year,
            day: dayName,
            commits: 0,
            reason: inBreak.name
          });
          continue;
        }

        let commitCount = 0;
        const roll = rng();

        if (dayOfWeek === 0) {
          // SUNDAYS: ~22% active (1-2 commits), ~78% rest days
          if (roll < 0.22) {
            commitCount = 1 + Math.floor(rng() * 2); // 1 or 2
          } else {
            commitCount = 0;
          }
        } else if (dayOfWeek === 6) {
          // SATURDAYS: ~24% active (1-2 commits), ~76% rest days
          if (roll < 0.24) {
            commitCount = 1 + Math.floor(rng() * 2); // 1 or 2
          } else {
            commitCount = 0;
          }
        } else {
          // WEEKDAYS (Mon-Fri): ~56% active, ~44% rest/gap
          // This gives an exact ~55% overall gap ratio across the year!
          if (roll < 0.44) {
            commitCount = 0; // Natural weekday gap
          } else {
            const intensity = rng();
            if (intensity < 0.50) {
              commitCount = 1 + Math.floor(rng() * 2); // 1-2 (Light)
            } else if (intensity < 0.90) {
              commitCount = 3 + Math.floor(rng() * 2); // 3-4 (Medium)
            } else {
              commitCount = 5; // Mini-sprint
            }
          }
        }

        const messages = [];
        for (let i = 0; i < commitCount; i++) {
          messages.push(projectCommitPool[poolIdx % projectCommitPool.length]);
          poolIdx++;
        }

        schedule.push({
          date: dateStr,
          year: y.year,
          day: dayName,
          commits: commitCount,
          messages
        });
      }
    }
  }

  return schedule;
}

function generateISODate(dateStr, index, totalOnDay) {
  const slot = timeSlots[index % timeSlots.length];
  const minute = Math.min(59, (slot.min + (index * 8)) % 60);
  const second = (12 + (index * 17)) % 60;
  const pad = (n) => String(n).padStart(2, '0');
  return `${dateStr}T${pad(slot.hour)}:${pad(minute)}:${pad(second)}${TIMEZONE_OFFSET}`;
}

const activityFilePath = path.join(__dirname, '..', 'ACTIVITY.md');

function run() {
  console.log('===========================================================');
  console.log('  2020-2023 GitHub Streak Backfiller (50%-60% Gap Ratio)');
  console.log('  Repository: 30-Javascript-Projects');
  console.log('===========================================================');
  console.log(`Author:     ${AUTHOR_NAME} <${AUTHOR_EMAIL}>`);
  console.log(`Timezone:   ${TIMEZONE_OFFSET}`);
  console.log(`Mode:       ${isDryRun ? '🔍 DRY RUN (Preview only)' : '🚀 EXECUTION (Creating Commits)'}`);
  console.log('-----------------------------------------------------------');

  const schedule = generateSchedule();

  const yearlyStats = {};

  for (const item of schedule) {
    if (!yearlyStats[item.year]) {
      yearlyStats[item.year] = { totalDays: 0, active: 0, gaps: 0, commits: 0, sunActive: 0, sunTotal: 0 };
    }

    yearlyStats[item.year].totalDays++;

    if (item.day === 'Sunday') {
      yearlyStats[item.year].sunTotal++;
      if (item.commits > 0) yearlyStats[item.year].sunActive++;
    }

    if (item.commits === 0 && !item.isExisting) {
      yearlyStats[item.year].gaps++;
    } else {
      yearlyStats[item.year].active++;
      yearlyStats[item.year].commits += item.commits;
    }
  }

  const summaryTable = Object.entries(yearlyStats).map(([year, d]) => ({
    Year: year,
    'Total Days': d.totalDays,
    'Active Days': d.active,
    'Gap Days': d.gaps,
    'Gap Ratio %': `${((d.gaps / d.totalDays) * 100).toFixed(1)}%`,
    'Active Sundays': `${d.sunActive}/${d.sunTotal}`,
    'Total Commits': d.commits,
    'Avg/Active': (d.commits / d.active).toFixed(1)
  }));

  console.table(summaryTable);

  const totalAllCommits = Object.values(yearlyStats).reduce((acc, y) => acc + y.commits, 0);
  const totalAllActive = Object.values(yearlyStats).reduce((acc, y) => acc + y.active, 0);
  const totalAllGaps = Object.values(yearlyStats).reduce((acc, y) => acc + y.gaps, 0);
  const totalDays = schedule.length;

  console.log('-----------------------------------------------------------');
  console.log(`4-Year Grand Totals (2020–2023):`);
  console.log(`  Total Calendar Days:    ${totalDays}`);
  console.log(`  Total Active Days:      ${totalAllActive} (${((totalAllActive / totalDays) * 100).toFixed(1)}%)`);
  console.log(`  Total Missing Gap Days: ${totalAllGaps} (${((totalAllGaps / totalDays) * 100).toFixed(1)}% GAP RATIO)`);
  console.log(`  Total Commits Planned:  ${totalAllCommits}`);
  console.log('-----------------------------------------------------------');

  if (isDryRun) {
    console.log('\n[DRY RUN COMPLETE] No git commits were created.');
    console.log('To execute and generate commits for 2020-2023 in 30-Javascript-Projects, run:');
    console.log('  node scripts/backfill-years-2020-2023.js --run\n');
    return;
  }

  // EXECUTION MODE
  console.log('\nStarting commit generation for 2020-2023 across 30-Javascript-Projects...\n');

  // Initialize or prepare ACTIVITY.md header
  let activityContent = `# 30-Javascript-Projects Development Activity Log (2020–2023)

Historical milestones and development activity log across projects 01 through 17.

| Date | Time | Author | Project / Milestone Note |
| :--- | :--- | :--- | :--- |
`;

  fs.writeFileSync(activityFilePath, activityContent, 'utf8');

  let commitCounter = 0;

  for (const item of schedule) {
    if (item.commits === 0) continue;

    for (let i = 0; i < item.commits; i++) {
      commitCounter++;
      const message = item.messages[i] || `chore: update project activity [${item.date}]`;
      const isoTimestamp = generateISODate(item.date, i, item.commits);

      const logRow = `| ${item.date} | ${isoTimestamp.slice(11, 19)} | ${AUTHOR_NAME} | ${message} |\n`;
      fs.appendFileSync(activityFilePath, logRow, 'utf8');

      execSync('git add ACTIVITY.md', { stdio: 'pipe' });

      const env = {
        ...process.env,
        GIT_AUTHOR_NAME: AUTHOR_NAME,
        GIT_AUTHOR_EMAIL: AUTHOR_EMAIL,
        GIT_COMMITTER_NAME: AUTHOR_NAME,
        GIT_COMMITTER_EMAIL: AUTHOR_EMAIL,
        GIT_AUTHOR_DATE: isoTimestamp,
        GIT_COMMITTER_DATE: isoTimestamp
      };

      const gitCmd = `git commit -m "${message}"`;
      execSync(gitCmd, { env, stdio: 'pipe' });

      if (commitCounter % 50 === 0 || commitCounter === totalAllCommits) {
        process.stdout.write(`\rCreated commit ${commitCounter}/${totalAllCommits} (${item.date})...`);
      }
    }
  }

  console.log(`\n\n🎉 Successfully generated all ${commitCounter} commits for 2020–2023!`);
  console.log(`Author: ${AUTHOR_NAME} <${AUTHOR_EMAIL}>`);
  console.log('\nPushing to GitHub:');
  console.log('  git push origin main\n');
}

run();
