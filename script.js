/* ── Idea #7: Boot sequence ── */
function runBootSequence(callback) {
    const output    = document.getElementById("output");
    const inputArea = document.getElementById("input");

    const lines = [
        { text: 'BIOS v2.4.1 — jawad@profile', delay: 0,    cls: 'boot-label' },
        { text: 'Initializing system...', delay: 180,  cls: '' },
        { text: 'Loading kernel modules... <span class="boot-ok">[  OK  ]</span>', delay: 380,  cls: '' },
        { text: 'Mounting filesystems... <span class="boot-ok">[  OK  ]</span>', delay: 560,  cls: '' },
        { text: 'Starting network services... <span class="boot-ok">[  OK  ]</span>', delay: 740,  cls: '' },
        { text: 'Loading portfolio data... <span class="boot-ok">[  OK  ]</span>', delay: 940,  cls: '' },
        { text: 'Fetching projects... <span class="boot-ok">[  OK  ]</span>', delay: 1100, cls: '' },
        { text: 'Checking credentials... <span class="boot-ok">[  OK  ]</span>', delay: 1260, cls: '' },
        { text: '─────────────────────────────────────────', delay: 1420, cls: 'boot-label' },
        { text: 'Welcome. Type <span class="commandName">help</span> to get started.', delay: 1600, cls: 'boot-ok' },
    ];

    lines.forEach(({ text, delay, cls }) => {
        setTimeout(() => {
            const div = document.createElement("div");
            div.className = "boot-line " + cls;
            div.innerHTML = text;
            output.appendChild(div);
            requestAnimationFrame(scrollTerminal);
        }, delay);
    });

    // After boot: inject help list into #output so it's part of the same stream,
    // then reveal the input line below it
    setTimeout(() => {
        const helpDiv = document.createElement("div");
        helpDiv.id = "helpCmdList";
        helpDiv.className = "output-block";
        helpDiv.innerHTML = helpCmd;
        output.appendChild(helpDiv);
        requestAnimationFrame(scrollTerminal);

        inputArea.style.display = "";
        document.getElementById("cmd").focus();
        if (callback) callback();
    }, 1900);
}

/* ── Scroll #terminal to bottom (that's the scrollable container) ── */
function scrollTerminal() {
    const terminal = document.getElementById("terminal");
    terminal.scrollTop = terminal.scrollHeight;
}

/* ── Idea #6: append output with fade-in animation ── */
function appendOutput(el, html, isError) {
    const div = document.createElement("div");
    div.className = isError ? "cmd-not-found" : "output-block";
    if (isError) {
        div.textContent = html;
    } else {
        div.innerHTML = html;
    }
    el.appendChild(div);
    // Small delay so the DOM has painted the new content before we measure height
    requestAnimationFrame(scrollTerminal);
}

/* ── Echo the typed command with syntax colour ── */
function echoCmd(el, cmd) {
    const div = document.createElement("div");
    div.className = "output-cmd";
    div.innerHTML =
        "<span class='ownerTerminal'><b>jawad@profile</b></span><b>:~$</b> " +
        "<span class='cmd-name'>" + cmd + "</span>";
    el.appendChild(div);
    requestAnimationFrame(scrollTerminal);
}

/* ── Position titlebar + terminal under the hero dynamically ── */
function positionTerminal() {
    const hero      = document.getElementById("hero");
    const titlebar  = document.querySelector(".buttons-bar");
    const terminal  = document.getElementById("terminal");
    const heroH     = hero.getBoundingClientRect().height;
    const barH      = titlebar.getBoundingClientRect().height;

    titlebar.style.top = heroH + "px";
    terminal.style.top = (heroH + barH) + "px";
    terminal.style.bottom = "16px";
}

window.addEventListener("DOMContentLoaded", function () {
    positionTerminal();
    window.addEventListener("resize", positionTerminal);

    let n = document.getElementById("cmd");
    let e = document.getElementById("output");

    // Hide input during boot — help list is injected into #output after boot finishes
    document.getElementById("input").style.display = "none";

    runBootSequence();

    n.addEventListener("keypress", function (i) {
            if (13 === i.keyCode && "" !== (i = n.value.trim())) {
                echoCmd(e, i);
                n.value = "";
                document.getElementById("suggestions").innerHTML = "";

                if ("skills" === i || "s" === i)
                    appendOutput(e, skillsBar);
                else if ("github" === i || "gh" === i)
                    window.open("https://github.com/JawadFahim", "_blank");
                else if ("linkedin" === i || "lk" === i)
                    window.open("https://www.linkedin.com/in/jawadfahim136810/", "_blank");
                else if ("facebook" === i || "fb" === i)
                    window.open("https://www.facebook.com/jawadanzum", "_blank");
                else if ("email" === i || "em" === i)
                    appendOutput(e, '<span class="email-copy-hint">click to copy →</span> <span class="email-copy" onclick="(function(el){navigator.clipboard.writeText(\'jawadanzum@gmail.com\').then(function(){el.textContent=\'jawadanzum@gmail.com  ✓ copied!\';el.style.color=\'#56d364\';setTimeout(function(){el.textContent=\'jawadanzum@gmail.com\';el.style.color=\'\';},2000);})})(this)" title="Click to copy">jawadanzum@gmail.com</span>');
                else if ("phone" === i || "ph" === i)
                    appendOutput(e, '<span class="email-copy-hint">click to copy →</span> <span class="email-copy" onclick="(function(el){navigator.clipboard.writeText(\'+8801782116973\').then(function(){el.textContent=\'+8801782116973  ✓ copied!\';el.style.color=\'#56d364\';setTimeout(function(){el.textContent=\'+8801782116973\';el.style.color=\'\';},2000);})})(this)" title="Click to copy">+8801782116973</span>');
                else if ("projects" === i || "pj" === i) appendOutput(e, projectCmd);
                else if ("about" === i) {
                    let aboutContent = `
                        <!DOCTYPE html>
                        <html lang="en">
                        <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <title>About Jawad Anzum Fahim</title>
                            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
                            <style>
                         body {
  margin: 0;
  width: 100%;
  height: 100%;
  font-family: monospace;
  color: #fff;
  background: linear-gradient(90deg, #0f0c29, #302b63, #24243e, #1a1a2e);
  background-size: 400% 400%;
  -webkit-animation: gradientBG 7s ease infinite forwards;
  animation: gradientBG 7s ease infinite forwards;
}
  @-webkit-keyframes gradientBG {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
@keyframes gradientBG {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
                            .container {
    max-width: 800px;
    margin: 50px auto;
    padding: 20px;
    background-color: rgba(30, 30, 50, 0.85);
    border-radius: 10px;
    border: 1px solid #444;
}
                                h1, h2, h3, h4 { color: #a9dc76; }
                                ul { list-style-type: none; padding: 0; }
                                li { margin-bottom: 10px; }
                                a { color: #78dce8; text-decoration: none; }
                                a:hover { color: #fc9867; text-decoration: underline; }
                                code { background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px; color: #ffd866; }
                                .back-button {
                                    display: inline-block;
                                    margin-top: 20px;
                                    padding: 10px 20px;
                                    font-size: 16px;
                                    color: #1a1a2e;
                                    background-color: #a9dc76;
                                    border: none;
                                    border-radius: 5px;
                                    cursor: pointer;
                                    text-decoration: none;
                                    font-weight: bold;
                                    transition: background-color 0.3s ease;
                                }
                                .back-button:hover { background-color: #78dce8; color: #1a1a2e; }
                            </style>
                        </head>
                        <body>
                            <div class="container">
                                <h1>Hey, I'm Jawad Anzum Fahim 👨‍💻</h1>
                                <p>Information and Communication Engineering student at <strong>Bangladesh University of Professionals</strong>. I build full-stack web apps, automate things with Python, and occasionally write papers about machine learning.</p>

                                <h2>Education</h2>
                                <ul>
                                    <li>🎓 <strong>BSc in Information and Communication Engineering</strong> — Bangladesh University of Professionals <em>(Expected Jun 2027)</em> · CGPA 3.77/4.00</li>
                                </ul>

                                <h2>Tech Stack</h2>
                                <h3>🖥 Frontend</h3>
                                <ul>
                                    <li><strong>Languages</strong>: <code>JavaScript</code>, <code>TypeScript</code>, <code>HTML</code>, <code>CSS</code></li>
                                    <li><strong>Frameworks</strong>: <code>React</code>, <code>Next.js</code>, <code>Tailwind CSS</code></li>
                                </ul>
                                <h3>🗄️ Backend</h3>
                                <ul>
                                    <li><strong>Languages</strong>: <code>Python</code>, <code>PHP</code>, <code>SQL</code>, <code>Java</code></li>
                                    <li><strong>Frameworks</strong>: <code>Node.js</code>, <code>Express.js</code>, <code>Flask</code></li>
                                    <li><strong>Databases</strong>: <code>MongoDB</code>, <code>MySQL</code></li>
                                </ul>
                                <h3>☁️ Cloud & Tools</h3>
                                <ul>
                                    <li><code>AWS</code>, <code>Oracle Cloud</code>, <code>Vercel</code>, <code>Firebase</code>, <code>Docker</code></li>
                                    <li><code>Git</code>, <code>Jira</code>, <code>Postman</code>, <code>Figma</code>, <code>LaTeX</code>, <code>Selenium</code>, <code>JMeter</code></li>
                                </ul>
                                <h3>📜 CS Fundamentals</h3>
                                <ul>
                                    <li><code>C</code>, <code>C++</code>, <code>Java</code> · Data Structures, Algorithms, OOP</li>
                                </ul>

                                <h2>Experience</h2>
                                <ul>
                                    <li>💼 <strong>Sales Representative</strong> @ AT&T <em>(Sep 2025 – Feb 2026)</em></li>
                                    <li>⚡ <strong>Technical Lead & Webmaster</strong> @ IEEE BUP Computer Society <em>(Sep 2024 – Present)</em> — organized IEEE BranchFest 2025, co-authored a journal paper</li>
                                    <li>🚀 <strong>Freelance Full-Stack Developer</strong> @ Fiverr <em>(May 2024 – Present)</em> — Next.js apps, cloud deployments, CI/CD pipelines</li>
                                </ul>

                                <h2>Publication</h2>
                                <ul>
                                    <li>📄 <em>A Study of Machine Learning Models with Population and Swarm Based Optimization for Cardiovascular Disease Prediction</em> — BUP FST Journal, Vol. 3, Issue 1, 2025</li>
                                </ul>

                                <h2>Outside the Terminal</h2>
                                <p>Cricket fan. Occasional gamer. I like figuring out how things work — whether that's a codebase or an engine.</p>

                                <h2>Let's Connect</h2>
                                <ul>
                                    <li><a href="https://www.linkedin.com/in/jawadfahim136810/" target="_blank">LinkedIn</a></li>
                                    <li><a href="https://github.com/JawadFahim" target="_blank">GitHub</a></li>
                                    <li><a href="https://www.fiverr.com/jawadanzum" target="_blank">Fiverr</a></li>
                                    <li>📧 <a href="mailto:jawadanzum@gmail.com">jawadanzum@gmail.com</a></li>
                                </ul>
                                <a href="index.html" class="back-button">← back to terminal</a>
                            </div>
                        </body>
                        </html>
                    `;
                    document.write(aboutContent);
                    document.close();
                } else if ("help" === i) {
                    appendOutput(e, helpCmd);
                } else if ("clear" === i || "c" === i) {
                    e.innerHTML = "";
                    const helpDiv = document.createElement("div");
                    helpDiv.id = "helpCmdList";
                    helpDiv.className = "output-block";
                    helpDiv.innerHTML = helpCmd;
                    e.appendChild(helpDiv);
                } else {
                    appendOutput(e, i, true);
                }
                requestAnimationFrame(scrollTerminal);
            }
        });
});


function closeModal() {
    const modal = document.getElementById("imageModal");
    if (modal) modal.style.display = "none";
}

let currentSuggestionIndex = -1;
function showSuggestions() {
    let n = document.getElementById("cmd"),
        e = n.value.trim(),
        s = document.getElementById("suggestions");
    var i;
    (s.innerHTML = "") !== e &&
        ((i = suggestions.filter(function (n) {
            return n.startsWith(e);
        })).forEach(function (e, i) {
            var l = document.createElement("div");
            (l.textContent = e),
                l.addEventListener("click", function () {
                    (n.value = e), (s.innerHTML = "");
                }),
                s.appendChild(l);
        }),
            0 < i.length)
        ? n.classList.add("command-entered")
        : n.classList.remove("command-entered");
}
function handleKeyDown(n) {
    var e,
        s = document.getElementById("suggestions"),
        i = s.getElementsByTagName("div");
    "ArrowUp" === n.key
        ? (n.preventDefault(),
            0 < currentSuggestionIndex && currentSuggestionIndex--)
        : "ArrowDown" === n.key
            ? (n.preventDefault(),
                currentSuggestionIndex < i.length - 1 && currentSuggestionIndex++)
            : "Enter" === n.key &&
            ((n = document.getElementById("cmd")),
                (e = i[currentSuggestionIndex]) && (n.value = e.textContent),
                (s.innerHTML = ""),
                n.classList.remove("command-entered"));
    for (let n = 0; n < i.length; n++) {
        var l = i[n];
        n === currentSuggestionIndex
            ? l.classList.add("selected")
            : l.classList.remove("selected");
    }
}
function linkHref(n) {
    window.location.href = n;
}
let suggestions = [
    "help",
    "skills",
    "clear",
    "projects",
    "about",
    "github",
    "facebook",
    "linkedin",
    "email",
    "phone",
],
    helpCmd =
        '\n  <br>Type any of the following commands to explore: <br />\n  [<span class="commandName">skills</span>] or [<span class="commandName">s</span>] — see my tech stack \n  <br />\n  [<span class="commandName">projects</span>] or [<span class="commandName">pj</span>] — browse my projects \n  <br />\n  [<span class="commandName">about</span>] — who I am \n  <br />\n  [<span class="commandName">help</span>] — show this list \n  <br />\n  [<span class="commandName">clear</span>] or [<span class="commandName">c</span>] — clear terminal \n  <br /><br />\n  Contact me: <br />\n  [<span class="commandName">github</span>] or [<span class="commandName">gh</span>]\n  <br />\n  [<span class="commandName">linkedin</span>] or [<span class="commandName">lk</span>]\n  <br />\n  [<span class="commandName">facebook</span>] or [<span class="commandName">fb</span>]\n  <br />\n  [<span class="commandName">email</span>] or [<span class="commandName">em</span>]\n  <br />\n  [<span class="commandName">phone</span>] or [<span class="commandName">ph</span>]\n  <br />\n ',
    /*skillsBar =
        '\n<div class="container">\n  <div class="flex">\n    <h2>HTML:</h2>\n    <div class="skillBar">\n      <div class="skillBarItem1"></div>\n    </div>\n    <h3>80%</h3>\n  </div>\n\n  <div class="flex">\n    <h2>CSS:</h2>\n    <div class="skillBar">\n      <div class="skillBarItem2"></div>\n    </div>\n    <h3>80%</h3>\n  </div>\n\n  <div class="flex">\n    <h2>JS/ES6:</h2>\n    <div class="skillBar">\n      <div class="skillBarItem3"></div>\n    </div>\n    <h3>75%</h3>\n  </div>\n\n  <div class="flex">\n    <h2>REACT:</h2>\n    <div class="skillBar">\n      <div class="skillBarItem4"></div>\n    </div>\n    <h3>52%</h3>\n  </div>\n\n  <div class="flex">\n    <h2>JAVA:</h2>\n    <div class="skillBar">\n      <div class="skillBarItem5"></div>\n    </div>\n    <h3>85%</h3>\n  </div>\n\n  <div class="flex">\n    <h2>MySQL:</h2>\n    <div class="skillBar">\n      <div class="skillBarItem6"></div>\n    </div>\n    <h3>85%</h3>\n  </div>\n\n  <div class="flex">\n    <h2>C++:</h2>\n    <div class="skillBar">\n      <div class="skillBarItem7"></div>\n    </div>\n    <h3>80%</h3>\n  </div>\n\n  <div class="flex">\n  <h2>PHP</h2>\n  <div class="skillBar">\n    <div class="skillBarItem8"></div>\n  </div>\n  <h3>80%</h3>\n</div>\n</div>',*/
    projectCmd =
        '\n<div class="projectsDiv">\n<article\n  class="project-wrapper"\n  onclick="window.open(\'https://github.com/JawadFahim/treatwell-next\', \'_blank\')"\n>\n  <div class="project-info">\n    <div class="flex-pr">\n      <div class="project-title text-nowrap">TreatWell 2.0</div>\n    </div>\n    <div class="flex-pr">\n      <p class="project-description">\n        Modern healthcare platform — dual portals, real-time booking, video consultations, OTP auth. Selected at Learnathon 3.0.</br> <code>Next.js · TypeScript · MongoDB · NextAuth.js</code>\n    </p>\n    </div>\n  </div>\n</article>\n\n<article\n  class="project-wrapper"\n  onclick="window.open(\'https://www.facebook.com/ActualFactBot\', \'_blank\')"\n>\n  <div class="project-info">\n    <div class="flex-pr">\n      <div class="project-title text-nowrap">Actual Fact Bot</div>\n    </div>\n    <div class="flex-pr">\n      <p class="project-description">\n        Fully automated social media engine publishing to 9,000+ followers. Runs 24/7 on Oracle Cloud with zero manual intervention.</br> <code>Python · Oracle Cloud · Meta Graph API · MongoDB</code>\n    </p>\n    </div>\n  </div>\n</article>\n\n<article\n  class="project-wrapper"\n  onclick="window.open(\'https://github.com/JawadFahim/program-outcome\', \'_blank\')"\n>\n  <div class="project-info">\n    <div class="flex-pr">\n      <div class="project-title text-nowrap">Program Outcome<br />Tracker</div>\n    </div>\n    <div class="flex-pr">\n      <p class="project-description">\n        OBE-compliant academic performance system in beta with BUP faculty. Role-based dashboards, JWT auth, automated score aggregation.</br> <code>Next.js · TypeScript · MongoDB · JWT</code>\n    </p>\n    </div>\n  </div>\n</article>\n\n<article\n  class="project-wrapper"\n  onclick="window.open(\'https://github.com/JawadFahim\', \'_blank\')"\n>\n  <div class="project-info">\n    <div class="flex-pr">\n      <div class="project-title text-nowrap">Inventory<br />Nexus</div>\n    </div>\n    <div class="flex-pr">\n      <p class="project-description">\n        Inventory management system with real-time stock tracking, order management, and low-stock alerts.</br> <code>Java · MySQL</code>\n    </p>\n    </div>\n  </div>\n</article>\n\n</div>\n  ';

 skillsBar = `
</br>
</br>
</br> 
<div class="coordinate-system">
        <div class="x-axis">
         </div>
        <div class="y-axis"> 
        </div>
        <div class="x-label">Nerdy Skills</div>
        <div class="x-label-2">Life Skills</div>
        <div class="y-label">Pro Skills</div>
         <div class="y-label-2">Noob Zone</div>
             <img src="images/arrow.svg" alt="Arrow1" class="arrow-image">
              <img src="images/arrow.svg" alt="Arrow2" class="arrow-image_2">
                            <img src="images/arrow.svg" alt="Arrow3" class="arrow-image_3">
                   
<div class="quadrant-box tl" >
    <div class="tech-section">
        <div class="tech-category">Frontend</div>
        <div class="tech-icons">
            <i class="devicon-javascript-plain tech-icon" title="JavaScript"></i>
            <i class="devicon-html5-plain tech-icon" title="HTML5"></i>
            <i class="devicon-css3-plain tech-icon" title="CSS3"></i>
            <i class="devicon-typescript-plain tech-icon" title="TypeScript"></i>
            <i class="devicon-react-original tech-icon" title="React"></i>
            <i class="devicon-redux-original tech-icon" title="Redux"></i>
            <i class="devicon-tailwindcss-plain tech-icon" title="Tailwind CSS"></i>
            <i class="devicon-nextjs-original tech-icon" title="Next.js"></i>
        </div>
    </div>
    <div class="tech-section">
        <div class="tech-category">Backend</div>
        <div class="tech-icons">
            <i class="devicon-nodejs-plain tech-icon" title="Node.js"></i>
            <i class="devicon-python-plain tech-icon" title="Python"></i>
            <i class="devicon-php-plain tech-icon" title="PHP"></i>
            <i class="devicon-express-original tech-icon" title="Express"></i>
            <i class="devicon-flask-original tech-icon" title="Flask"></i>
        </div>
    </div>
    <div class="tech-section">
        <div class="tech-category">Database</div>
        <div class="tech-icons">
            <i class="devicon-mysql-plain tech-icon" title="MySQL"></i>
            <i class="devicon-mongodb-plain tech-icon" title="MongoDB"></i>
        </div>
    </div>
    <div class="tech-section">
        <div class="tech-category">CS Fundamentals</div>
        <div class="tech-icons">
            <i class="devicon-c-plain tech-icon" title="C"></i>
            <i class="devicon-cplusplus-plain tech-icon" title="C++"></i>
            <i class="devicon-java-plain tech-icon" title="Java"></i>
        </div>
    </div>
    <div class="tech-section">
        <div class="tech-category">Cloud & Deploy</div>
        <div class="tech-icons">
            <i class="devicon-amazonwebservices-plain-wordmark tech-icon" title="AWS"></i>
            <i class="devicon-docker-plain tech-icon" title="Docker"></i>
            <i class="devicon-firebase-plain tech-icon" title="Firebase"></i>
            <i class="devicon-vercel-original tech-icon" title="Vercel"></i>
        </div>
    </div>
    <div class="tech-section">
        <div class="tech-category">Tools & Testing</div>
        <div class="tech-icons">
            <i class="devicon-git-plain tech-icon" title="Git"></i>
            <i class="devicon-github-original tech-icon" title="GitHub"></i>
            <i class="devicon-jira-plain tech-icon" title="Jira"></i>
            <i class="devicon-trello-plain tech-icon" title="Trello"></i>
            <i class="devicon-postman-plain tech-icon" title="Postman"></i>
            <i class="devicon-npm-original-wordmark tech-icon" title="npm"></i>
            <i class="devicon-junit-plain tech-icon" title="JUnit"></i>
            <i class="devicon-selenium-original tech-icon" title="Selenium"></i>
        </div>
    </div>
    <div class="tech-section">
        <div class="tech-category">Design & Writing</div>
        <div class="tech-icons">
            <i class="devicon-figma-plain tech-icon" title="Figma"></i>
            <i class="devicon-photoshop-plain tech-icon" title="Adobe Photoshop"></i>
            <i class="devicon-illustrator-plain tech-icon" title="Adobe Illustrator"></i>
            <i class="devicon-latex-original tech-icon" title="LaTeX"></i>
        </div>
    </div>
</div>
    
        <div class="quadrant tr">
            <div class="skills-container">
                <div class="skills-row">
                    <div class="skill-box-2">Cricket</div>
                    <div class="skill-box-2">Debugging at 2am</div>
                </div>
                <div class="skills-row">
                    <div class="skill-box-2">Reading Docs</div>
                    <div class="skill-box-2">Googling Errors</div>
                </div>
            </div>
        </div>

        <div class="text-tr">Human Skills<br>(things I do<br>outside the IDE)</div>

        <div class="quadrant bl">
            <div class="skills-container">
                <div class="skills-row">
                    <div class="skill-box-3">Unknown</div>
                </div>
            </div>
        </div>
        <div class="text-bl">Unconsciously<br>unaware of<br>what I don't know yet.</div>

        <div class="quadrant br">
            <div class="skills-container">
                <div class="skills-row">
                    <div class="skill-box-4">Saying No</div>
                    <div class="skill-box-4">Work-Life Balance</div>
                </div>
            </div>
            <div class="text-br">Still working<br>on these.</div>
        </div>
    </div>
`;


// skillsBar is injected via the 'skills' command into #output
